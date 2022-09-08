---
title: AWS ECS (EC2 Provider)
---

# AWS ECS (EC2 Provider)

*Deployed as a daemon service using a task definition*

In AWS ECS, the ThreatStryker sensors are deployed as a daemon service using task definition.

# Prerequisites

Make sure you have the following information:
- Quay login, later referred as `<QUAY_LOGIN>`
- Quay password, later referred as `<QUAY_PASSWORD>`
- Management console URL/IP, later referred as `<MGMT_CONSOLE_URL>`
- Deepfence API key, later referred as `<DEEPFENCE_KEY>` (This key can be found from the management console, in the settings > User > API Key)

# Installing on AWS ECS (EC2 Provider)

1. Add secrets for quay login
    - Go to the secret manager dashboard from the AWS Console
    - Select "store new secret"
    - Select "Other type of secret"
    - Select "Plaintext" and paste the following:
```json
{
    "username" : "<QUAY_LOGIN>",
    "password" : "<QUAY_PASSWORD>"
}
```

Create the secret and store the ARN. We will refer to it as `<ARN_QUAY_CREDS>`

Be careful with the double quotes, sometimes the AWS UI transforms them into a special character that is not recognized as valid JSON.

2. Create a new role (e.g.: `deepfence-agent-role`)
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
  - Search for your newly created roles
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
        "<ARN_QUAY_CREDS>"
        ]
    }
    ]
}
```

Then create the new policy.

3. Create new task definition for deepfence agent

    - Go to the "Elastic Container Service" dashboard from AWS console
    - In the top left corner, disable new UI to use the legacy UI.
    - Go to "Task Definitions"
    - Select "Create new Task Definition"
    - Select EC2, then "Next step"
    - Provide a name to your task definition (e.g. `deepfence-agent-ec2-task`)
    - Select the Task role and execution role (e.g. `deepfence-agent-role`)
    - At the bottom, select "Configure via JSON"
    - Copy and paste the following JSON configuration: (Replace `<DEEPFENCE_KEY>`, `<MGMT_CONSOLE_URL>` and `<ARN_QUAY_CREDS>` with actual values)

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
            "name": "DEEPFENCE_KEY",
            "value": "<DEEPFENCE_KEY>"
        },
        {
            "name": "DF_FIM_ON",
            "value": "Y"
        },
        {
            "name": "DF_TRAFFIC_ANALYSIS_MODE",
            "value": "all"
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
        "secrets": null,
        "dockerSecurityOptions": [],
        "memory": null,
        "memoryReservation": null,
        "volumesFrom": [],
        "stopTimeout": null,
        "image": "quay.io/deepfenceio/deepfence_agent:3.6.2",
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
        "privileged": null,
        "name": "deepfence-agent"
    }
    ],
    "placementConstraints": [],
    "memory": "2048",
    "family": "deepfence-agent-ec2-provider-thomas",
    "pidMode": null,
    "requiresCompatibilities": [
    "EC2"
    ],
    "networkMode": "bridge",
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

Then create the new task definition.

5. Create a new service to execute the Task and deploy the agent
    - Go to the "Elastic Container Service" dashboard from the AWS console
    - Go to "Task definitions"
    - Select previously created task definition
    - Select a revision (latest)
    - Select "Actions" > "Create service"
    - Select Launch type: `EC2`
    - Provide a name to your service (e.g. `deepfence-agent-ec2-service`)
    - Set `Desired tasks` as the number of ec2 instances in the ECS cluster
    - Create the service

6. Monitor the service creation and check if the task is in running state. It can take a couple of minutes

7. If the task is running, you should see the agent appearing in your console, well done!
