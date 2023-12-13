---
title: AWS ECS (EC2 Provider)
---

# AWS ECS (EC2 Provider)

*Deployed as a daemon service using a task definition*

In AWS ECS, the ThreatStryker sensors are deployed as a daemon service using task definition.

## Prerequisites

Make sure you have the following information:
- Quay login, later referred as `<QUAY_LOGIN>`
- Quay password, later referred as `<QUAY_PASSWORD>`
- Management console URL/IP, later referred as `<MGMT_CONSOLE_URL>`
- Deepfence API key, later referred as `<DEEPFENCE_KEY>` (This key can be found from the management console, in the settings > User > API Key)

## Installing on AWS ECS (EC2 Provider)

1. Add secret for quay login
    - Go to the secret manager dashboard from the AWS Console
    - Select "Store a new secret"
    - Select "Other type of secret"
    - Select "Plaintext" and paste the following:
      ```json
      {
          "username" : "<QUAY_LOGIN>",
          "password" : "<QUAY_PASSWORD>"
      }
      ```

Create the secret and store the ARN. We will refer to it as `<ARN_QUAY_CREDS>`

2. Add secret for Deepfence API key
    - Go to the secret manager dashboard from the AWS Console
    - Select "Store a new secret"
    - Select "Other type of secret"
    - Select "Plaintext" and paste the following:
      ```json
      {
          "deepfence_api_key" : "<DEEPFENCE_KEY>"
      }
      ```

Create the secret and store the ARN. We will refer to it as `<API_KEY_SECRET_ARN>`
:::caution
Be careful with the double quotes, sometimes the AWS UI transforms them into a special character that is not  recognized as valid JSON.
:::

3. Create a new role (e.g.: `deepfence-agent-role`)
    - Go to the IAM dashboard from AWS Console
    - Go to Access management > roles
    - Select "Create Role",
    - Select "Custom trust policy"
    - Paste the following:
      ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": "Allow",
                  "Principal": {
                      "Service": "ecs-tasks.amazonaws.com"
                  },
                  "Action": "sts:AssumeRole"
              }
          ]
      }
      ```

Then continue:

    - Search in the "Permissions policies" for "Task" > Select the following policy: `AmazonECSTaskExecutionRolePolicy`
    - Click "Next", name the role `deepfence-agent-role`, then "Create role"
    - Store the Role ARN. We will refer to it as `<AGENT_TASK_ROLE_ARN>`
    - Search for your newly created role
    - Click on it (`deepfence-agent-role` in our example)
    - Select "Add permissions" > "Create inline policy" and add:
        ```json
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "secretsmanager:GetSecretValue"
                    ],
                    "Resource": [
                        "<ARN_QUAY_CREDS>",
                        "<API_KEY_SECRET_ARN>"
                    ]
                }
            ]
        }
        ```

    - If you are using a custom KMS key for your secrets and not using the default key, you will also need to add the KMS key permissions to your inline policy:

      ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Effect": "Allow",
                  "Action": [
                      "kms:Decrypt",
                      "secretsmanager:GetSecretValue"
                  ],
                  "Resource": [
                      "<ARN_QUAY_CREDS>",
                      "<API_KEY_SECRET_ARN>",
                      "<custom_kms_key_arn>"
                  ]
              }
          ]
      }
      ```

Then create the new policy.

4. Create new task definition for deepfence agent
    - Use Old ECS Experience (old UI)
    - Go to the "Elastic Container Service" dashboard from AWS console
    - In the top left corner, disable new UI to use the legacy UI.
    - Go to "Task Definitions"
    - Select "Create new Task Definition"
    - Select EC2, then "Next step"
    - At the bottom, select "Configure via JSON"
    - Copy and paste the following JSON configuration: (Replace `<DEEPFENCE_KEY>`, `<MGMT_CONSOLE_URL>`, `<ARN_QUAY_CREDS>`, `<API_KEY_SECRET_ARN>` and `<AGENT_TASK_ROLE_ARN>` with actual values)

      ```json
      {
        "ipcMode": null,
        "containerDefinitions": [
          {
            "dnsSearchDomains": [],
            "environmentFiles": null,
            "logConfiguration": null,
            "entryPoint": [],
            "portMappings": [],
            "command": [],
            "linuxParameters": null,
            "cpu": 0,
            "environment": [
              {
                "name": "DF_FIM_ON",
                "value": "N"
              },
              {
                "name": "DF_TRAFFIC_ANALYSIS_MODE",
                "value": "all"
              },
              {
                "name": "DEFENDERD_DISABLE_XFF_PROTECTION",
                "value": "false"
              },
              {
                "name": "DEFENDERD_TCP_BUFFER_LIMIT",
                "value": "500MB"
              },
              {
                "name": "DF_TRAFFIC_ANALYSIS_ON",
                "value": "Y"
              },
              {
                "name": "MGMT_CONSOLE_URL",
                "value": "<MGMT_CONSOLE_URL>"
              },
              {
                "name": "USER_DEFINED_TAGS",
                "value": ""
              }
            ],
            "resourceRequirements": null,
            "ulimits": null,
            "repositoryCredentials": {
              "credentialsParameter": "<ARN_QUAY_CREDS>"
            },
            "dnsServers": [],
            "mountPoints": [
              {
                "readOnly": true,
                "containerPath": "/fenced/mnt/host",
                "sourceVolume": "Host"
              },
              {
                "readOnly": false,
                "containerPath": "/sys/kernel/debug",
                "sourceVolume": "SysKernelDebug"
              },
              {
                "readOnly": false,
                "containerPath": "/sys/fs/bpf",
                "sourceVolume": "SysFsBpf"
              },
              {
                "readOnly": false,
                "containerPath": "/var/run/docker.sock",
                "sourceVolume": "DockerSock"
              },
              {
                "readOnly": false,
                "containerPath": "/var/log/fenced",
                "sourceVolume": "VarLogFenced"
              }
            ],
            "workingDirectory": null,
            "secrets": [
              {
                "name": "DEEPFENCE_KEY",
                "valueFrom": "<API_KEY_SECRET_ARN>:deepfence_api_key::"
              }
            ],
            "dockerSecurityOptions": [],
            "memory": null,
            "memoryReservation": null,
            "volumesFrom": [],
            "stopTimeout": null,
            "image": "quay.io/deepfenceio/deepfence_agent:2.1.0",
            "startTimeout": null,
            "firelensConfiguration": null,
            "dependsOn": null,
            "disableNetworking": null,
            "interactive": null,
            "healthCheck": null,
            "essential": true,
            "links": [],
            "hostname": null,
            "extraHosts": null,
            "pseudoTerminal": null,
            "user": null,
            "readonlyRootFilesystem": null,
            "dockerLabels": {},
            "systemControls": [],
            "privileged": true,
            "name": "deepfence"
          }
        ],
        "placementConstraints": [],
        "executionRoleArn": "<AGENT_TASK_ROLE_ARN>",
        "taskRoleArn": "<AGENT_TASK_ROLE_ARN>",
        "memory": "2048",
        "family": "deepfence-agent-ec2-task",
        "pidMode": null,
        "requiresCompatibilities": [
          "EC2"
        ],
        "networkMode": "host",
        "runtimePlatform": {
          "operatingSystemFamily": "LINUX",
          "cpuArchitecture": "X86_64"
        },
        "cpu": "512",
        "inferenceAccelerators": null,
        "proxyConfiguration": null,
        "volumes": [
          {
            "fsxWindowsFileServerVolumeConfiguration": null,
            "efsVolumeConfiguration": null,
            "name": "SysKernelDebug",
            "host": {
              "sourcePath": "/sys/kernel/debug"
            },
            "dockerVolumeConfiguration": null
          },
          {
            "fsxWindowsFileServerVolumeConfiguration": null,
            "efsVolumeConfiguration": null,
            "name": "SysFsBpf",
            "host": {
              "sourcePath": "/sys/fs/bpf"
            },
            "dockerVolumeConfiguration": null
          },
          {
            "fsxWindowsFileServerVolumeConfiguration": null,
            "efsVolumeConfiguration": null,
            "name": "DockerSock",
            "host": {
              "sourcePath": "/var/run/docker.sock"
            },
            "dockerVolumeConfiguration": null
          },
          {
            "fsxWindowsFileServerVolumeConfiguration": null,
            "efsVolumeConfiguration": null,
            "name": "VarLogFenced",
            "host": {
              "sourcePath": null
            },
            "dockerVolumeConfiguration": null
          },
          {
            "fsxWindowsFileServerVolumeConfiguration": null,
            "efsVolumeConfiguration": null,
            "name": "Host",
            "host": {
              "sourcePath": "/"
            },
            "dockerVolumeConfiguration": null
          }
        ]
      }
      ```
    - Select the container "deepfence" and select `Auto-configure CloudWatch Logs` for `Log configuration`
    - Then create the new task definition.

5. Create a new service to execute the Task and deploy the agent
    - Use Old ECS Experience (old UI)
    - Go to the "Elastic Container Service" dashboard from the AWS console
    - Go to "Task definitions"
    - Select previously created task definition
    - Select "Actions" > "Create service"
    - Select Launch type: `EC2`
    - Choose the ECS cluster to deploy
    - Provide a name to your service (e.g. `deepfence-agent-ec2-service`)
    - Set `Service Type` as `DAEMON`
    - Create the service

6. Monitor the service creation and check if the task is in running state. It can take a couple of minutes

7. If the task is running, you should see the agent appearing in your console, well done!
