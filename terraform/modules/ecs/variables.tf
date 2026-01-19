variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnets" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "private_subnets" {
  description = "List of private subnet IDs"
  type        = list(string)
}

variable "app_name" {
  description = "Application name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "container_cpu" {
  description = "Fargate CPU units"
  type        = number
}

variable "container_memory" {
  description = "Fargate memory in MB"
  type        = number
}

variable "desired_count" {
  description = "Desired number of tasks"
  type        = number
}

variable "min_capacity" {
  description = "Minimum number of tasks"
  type        = number
}

variable "max_capacity" {
  description = "Maximum number of tasks"
  type        = number
}

variable "db_host" {
  description = "Database host"
  type        = string
}

variable "db_name" {
  description = "Database name"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "container_image" {
  description = "Container image URI"
  type        = string
  default     = "your-ecr-repo/spot:latest" # Update with your ECR image
}

variable "alb_security_group_ids" {
  description = "Security group IDs for ALB"
  type        = list(string)
  default     = []
}

variable "ecs_security_group_ids" {
  description = "Security group IDs for ECS tasks"
  type        = list(string)
  default     = []
}

variable "s3_audio_bucket_name" {
  description = "S3 bucket name for audio files"
  type        = string
  default     = ""
}

variable "s3_audio_bucket_arn" {
  description = "S3 bucket ARN for audio files"
  type        = string
  default     = ""
}

variable "certificate_arn" {
  description = "ACM certificate ARN for HTTPS"
  type        = string
  default     = ""
}
