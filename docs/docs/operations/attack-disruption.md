---
title: Attack Disruption
---

# Multi-Stage Attack Disruption

*MultiStage, Wide-Area Attack Disruption*

ThreatStryker helps you detect multiple stages of an attack and provides protection policies to disrupt those attacks at various stages.

## Quarantine Policies


Quarantine policies enable reset, pause and decommissioning of infected containers, pods or virtual machines:

![Add New Quarantine Policy](../img/deepfence_quarantine.jpg)


## Network Policies


Network policies enable blocking external as well as internal attackers on their tracks. Protection Policy can be enforced using deepfence agent or [Cloud WAF](#network-protection-policy-using-cloud-waf). By default, it is enforced by deepfence agent.

![Define New Network Policy](../img/deepfence_networkpolicy.jpg)

![View Network Policies](../img/deepfence_networkpolicypage.jpg)

## Alert Correlation with Clustering Rules

User can define rules to cluster similar alerts based on their classtypes, frequency and spatial attributes. This helps to reduce potential noise, and view the alerts in a grouped manner.

![Define Alert Clustering Rule](../img/deepfence_clusteringrules.jpg)

![View Alert Clustering Rules](../img/deepfence_clusteringrulespage.jpg)


## Intent Detection Rules

Intent detection rules empower users to perform advanced correlation on alerts based on various alert attributes like classtypes, intents, presence of known vulnerabilities and other spatial attributes as follows:

![Define Intent Detection Rule](../img/deepfence_intentdetection.jpg)

![View Intent Detection Rules](../img/deepfence_intentdetectionrules.jpg)


## Network Protection Policy using Cloud WAF

Protection policy can be enforced using Cloud WAF if configured by the user. Only AWS WAF is supported at this moment.
Deepfence will create [IP Set](https://docs.aws.amazon.com/waf/latest/developerguide/waf-ip-set-creating.html) and add a [rule](https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-ipset-match.html) in the Web ACL's provided by the user.

### IAM Role

1. Deepfence Management Console requires write permissions to WAF for policy enforcement. 
2. Create an IAM role and add the following policy (`arn:aws:iam::aws:policy/AWSWAFFullAccess`) and set the role as EC2 instance IAM Role. In case of EKS (Kubernetes), this policy should be added to `Cluster IAM role`.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AllowUseOfAWSWAF",
                "Effect": "Allow",
                "Action": [
                    "waf:*",
                    "waf-regional:*",
                    "wafv2:*",
                    "elasticloadbalancing:SetWebACL",
                    "apigateway:SetWebACL",
                    "appsync:SetWebACL",
                    "logs:DescribeResourcePolicies",
                    "logs:DescribeLogGroups",
                    "cognito-idp:AssociateWebACL",
                    "cognito-idp:DisassociateWebACL",
                    "cognito-idp:ListResourcesForWebACL",
                    "cognito-idp:GetWebACLForResource"
                ],
                "Resource": "*"
            },
            {
                "Sid": "AllowLogDeliverySubscription",
                "Effect": "Allow",
                "Action": [
                    "logs:CreateLogDelivery",
                    "logs:DeleteLogDelivery"
                ],
                "Resource": "*"
            },
            {
                "Sid": "GrantLogDeliveryPermissionForS3Bucket",
                "Effect": "Allow",
                "Action": [
                    "s3:PutBucketPolicy",
                    "s3:GetBucketPolicy"
                ],
                "Resource": [
                    "arn:aws:s3:::aws-waf-logs-*"
                ]
            },
            {
                "Sid": "GrantLogDeliveryPermissionForCloudWatchLogGroup",
                "Effect": "Allow",
                "Action": [
                    "logs:PutResourcePolicy"
                ],
                "Resource": "*",
                "Condition": {
                    "ForAnyValue:StringEquals": {
                        "aws:CalledVia": [
                            "wafv2.amazonaws.com"
                        ]
                    }
                }
            }
        ]
    }
    ```

### Configuration
1. Copy ARN's of all Web ACL's in all regions that needs protection.
   ![AWS WAF](../img/aws-waf-1.png)
2. Add the Web ACL ARN's in Deepfence settings and save.
   ![Cloud WAF](../img/cloud-waf-1.png)
3. Deepfence will automatically create IP Set for each Web ACL provided and update those Web ACL's with new rule.
   ![AWS WAF](../img/aws-waf-2.png)
4. Set network protection policies based on intents/classtypes. Alerts matching the policies will result in source ip getting added to the IP Set managed by Deepfence and blocked.
   ![Define New Network Policy](../img/deepfence_networkpolicy.jpg)