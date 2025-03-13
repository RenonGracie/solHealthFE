module "application" {
  source  = "cn-terraform/s3-static-website/aws"
  version = "1.0.9"
  acm_certificate_arn_to_use = var.acm_certificate_arn
  create_acm_certificate     = false
  route53_hosted_zone_id     = var.route53_hosted_zone_id
  create_route53_hosted_zone = false
  www_website_redirect_enabled = false
  name_prefix         = "solhealth"
  website_domain_name = var.domain_name
  cloudfront_custom_error_responses = [{
    error_caching_min_ttl = 10,
    error_code            = 404,
    response_code         = 200,
    response_page_path    = "/"
    }, {
    error_caching_min_ttl = 10,
    error_code            = 403,
    response_code         = 200,
    response_page_path    = "/"
  }]
  tags = {
    "Owner"       = "Terraform"
    "Application" = "solhealth"
    "Environment" = var.environment
  }
  providers = {
    aws.main         = aws,
    aws.acm_provider = aws
  }
}
