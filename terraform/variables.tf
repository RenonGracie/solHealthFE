variable "route53_hosted_zone_id" {
  description = "ID hosted zone Route53"
  type        = string
}

variable "environment" {
  description = "Enviroment (dev/prod)"
  type        = string
}

variable "domain_name" {
  description = "Domain name"
  type        = string
}

variable "acm_certificate_arn" {
  description = "ARN certificate ACM"
  type        = string
} 