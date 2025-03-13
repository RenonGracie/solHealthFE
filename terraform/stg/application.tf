module "application" {
  source  = "cn-terraform/s3-static-website/aws"
  version = "1.0.9"
  acm_certificate_arn_to_use = "arn:aws:acm:us-east-1:762233746762:certificate/6f9b4dbf-a4d2-4238-92e0-1ce4a2e8f301"
  create_acm_certificate     = false
  route53_hosted_zone_id     = "Z01819123MDXYH7Y413OP"
  create_route53_hosted_zone = false
  www_website_redirect_enabled = false
  name_prefix         = "solhealth"
  website_domain_name = "stg.solhealth.co"
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
    "Environment" = "stg"
  }
  providers = {
    aws.main         = aws,
    aws.acm_provider = aws
  }
}
