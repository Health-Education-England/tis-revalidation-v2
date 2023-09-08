# Deploy Workflow

## Required Permissions

### AWS

#### CloudFront

These permissions are required to manage the associated CloudFront distribution.

- `cloudfront:CreateInvalidation`

#### Simple Storage Solution (S3)

##### Static Content

These permissions are required to deploy static website content to the relevant S3 buckets.

- `s3:ListBucket`
- `s3:GetObject`
- `s3:PutObject`
- `s3:DeleteObject`
