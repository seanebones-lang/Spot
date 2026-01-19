# Terraform configuration for Spot - Development Environment
terraform {
  required_version = ">= 1.5.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "spot-terraform-state"
    key    = "dev/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = "dev"
      Project     = "spot"
      ManagedBy   = "terraform"
    }
  }
}

# VPC for Spot infrastructure
resource "aws_vpc" "spot_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "spot-vpc-dev"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "spot_igw" {
  vpc_id = aws_vpc.spot_vpc.id

  tags = {
    Name = "spot-igw-dev"
  }
}

# Public Subnets
resource "aws_subnet" "spot_public" {
  count             = 2
  vpc_id            = aws_vpc.spot_vpc.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  map_public_ip_on_launch = true

  tags = {
    Name = "spot-public-subnet-${count.index + 1}-dev"
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "spot_cluster" {
  name = "spot-cluster-dev"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "spot-cluster-dev"
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "spot_app" {
  family                   = "spot-app-dev"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"

  container_definitions = jsonencode([{
    name  = "spot-app"
    image = "${var.ecr_repository}:latest"
    
    portMappings = [{
      containerPort = 3001
      protocol      = "tcp"
    }]

    environment = [
      {
        name  = "NODE_ENV"
        value = "production"
      }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.spot_app.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}

# ECS Service
resource "aws_ecs_service" "spot_app" {
  name            = "spot-app-dev"
  cluster         = aws_ecs_cluster.spot_cluster.id
  task_definition = aws_ecs_task_definition.spot_app.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.spot_public[*].id
    assign_public_ip = true
    security_groups  = [aws_security_group.spot_app.id]
  }
}

# Security Group
resource "aws_security_group" "spot_app" {
  name        = "spot-app-sg-dev"
  description = "Security group for Spot app"
  vpc_id      = aws_vpc.spot_vpc.id

  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "spot-app-sg-dev"
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "spot_app" {
  name              = "/ecs/spot-app-dev"
  retention_in_days = 7
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "ecr_repository" {
  description = "ECR repository URL"
  type        = string
  default     = "123456789012.dkr.ecr.us-east-1.amazonaws.com/spot"
}

# Outputs
output "vpc_id" {
  value = aws_vpc.spot_vpc.id
}

output "cluster_name" {
  value = aws_ecs_cluster.spot_cluster.name
}

output "service_name" {
  value = aws_ecs_service.spot_app.name
}
