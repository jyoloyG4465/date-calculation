import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 環境変数からカスタムドメイン設定を取得
    const domainName = process.env.DOMAIN_NAME;
    const certificateArn = process.env.CERTIFICATE_ARN;

    // ACM証明書を参照（カスタムドメイン設定がある場合）
    const certificate =
      certificateArn
        ? acm.Certificate.fromCertificateArn(this, "Certificate", certificateArn)
        : undefined;

    // S3バケット（CloudFront経由のみアクセス可能）
    const bucket = new s3.Bucket(this, "WebsiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      // カスタムドメイン設定（環境変数がある場合のみ）
      ...(domainName && { domainNames: [domainName] }),
      ...(certificate && { certificate }),
      // SPA対応: エラー時にindex.htmlを返す
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    // react-app/distをS3にデプロイ
    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("../react-app/dist")],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"], // デプロイ時にキャッシュ無効化
    });

    // CloudFront URLを出力
    new cdk.CfnOutput(this, "DistributionUrl", {
      value: `https://${distribution.distributionDomainName}`,
      description: "CloudFront Distribution URL",
    });
  }
}
