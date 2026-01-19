provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.app_name
      ManagedBy   = "Terraform"
    }
  }
}

# VPC Module
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr      = var.vpc_cidr
  environment   = var.environment
  app_name      = var.app_name
}

# ECS Module
module "ecs" {
  source = "./modules/ecs"

  vpc_id                 = module.vpc.vpc_id
  public_subnets         = module.vpc.public_subnets
  private_subnets        = module.vpc.private_subnets
  app_name               = var.app_name
  environment            = var.environment
  container_cpu          = var.container_cpu
  container_memory       = var.container_memory
  desired_count          = var.desired_count
  min_capacity           = var.min_capacity
  max_capacity           = var.max_capacity
  db_host                = module.rds.db_endpoint
  db_name                = module.rds.db_name
  db_username            = var.db_username
  db_password            = var.db_password
  alb_security_group_ids = [module.vpc.alb_security_group_id]
  ecs_security_group_ids = [module.vpc.ecs_security_group_id]
  s3_audio_bucket_name   = aws_s3_bucket.audio_storage.id
  s3_audio_bucket_arn    = aws_s3_bucket.audio_storage.arn
  certificate_arn        = var.certificate_arn

  depends_on = [module.rds]
}

# RDS Module
module "rds" {
  source = "./modules/rds"

  vpc_id              = module.vpc.vpc_id
  subnet_ids          = module.vpc.database_subnets
  db_subnet_group_id  = module.vpc.database_subnet_group_id
  db_name             = "${var.app_name}_db"
  db_username         = var.db_username
  db_password         = var.db_password
  db_instance_class   = var.db_instance_class
  allocated_storage   = var.db_allocated_storage
  environment         = var.environment
  app_name            = var.app_name
  security_group_ids  = [module.vpc.database_security_group_id]
}

# S3 Bucket for FLAC Audio Files
resource "aws_s3_bucket" "audio_storage" {
  bucket = "${var.app_name}-audio-${var.environment}-${random_id.bucket_suffix.hex}"

  tags = {
    Name        = "${var.app_name}-audio-storage"
    Environment = var.environment
  }
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket_versioning" "audio_storage" {
  bucket = aws_s3_bucket.audio_storage.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "audio_storage" {
  bucket = aws_s3_bucket.audio_storage.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "audio_storage" {
  bucket = aws_s3_bucket.audio_storage.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "spot_cdn" {
  count = var.enable_cloudfront ? 1 : 0

  origin {
    domain_name = module.ecs.alb_dns_name
    origin_id   = "spot-alb"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for ${var.app_name}"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "spot-alb"

    forwarded_values {
      query_string = true
      headers      = ["Host", "Authorization", "CloudFront-Forwarded-Proto"]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  # Cache behavior for audio files
  ordered_cache_behavior {
    path_pattern     = "/audio/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "spot-alb"

    forwarded_values {
      query_string = false
      headers      = ["Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"]

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = var.certificate_arn == "" ? true : false
    acm_certificate_arn            = var.certificate_arn != "" ? var.certificate_arn : null
    ssl_support_method             = var.certificate_arn != "" ? "sni-only" : null
    minimum_protocol_version       = var.certificate_arn != "" ? "TLSv1.2_2021" : null
  }

  tags = {
    Name        = "${var.app_name}-cdn"
    Environment = var.environment
  }
}
