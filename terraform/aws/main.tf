provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "saas_docs" {
  bucket = "saas-multitenancy-docs"
  acl    = "private"
}
