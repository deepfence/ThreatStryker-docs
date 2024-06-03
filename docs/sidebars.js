/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  threatstryker: [
    {
      type: 'html',
      value: 'Deepfence ThreatStryker',
      className: 'sidebar-title',
    },

    'index',

    {
      type: 'category',
      label: 'Architecture',
      link: {
        type: 'doc',
        id: 'architecture/index'
      },
      items: [
        'architecture/console',
        'architecture/cloudscanner',
        'architecture/sensors',
        'architecture/threatgraph',
      ],
    },
    'demo',

    {
      type: 'category',
      label: 'Installation',
      link: {
        type: 'doc',
        id: 'installation'
      },
      items: [
        {
          type: 'category',
          label: 'Management Console',
          link: {
            type: 'doc',
            id: 'deploy'
          },
          items: [
            {
              type: 'category',
              label: 'Deepfence Cloud',
              link: {
                type: 'doc',
                id: 'cloud/index'
              },
              items: [
                'cloud/index',
                'cloud/users',
                'cloud/consoles',
                'cloud/agents',
                'cloud/sso',
              ],
            },
            {
              type: 'category',
              label: 'Self-Managed',
              link: {
                type: 'doc',
                id: 'console/index'
              },
              items: [
                'console/requirements',
                'console/upgrade-from-v2.1',
                'console/docker',
                'console/kubernetes',
                'console/managed-database',
                'console/initial-configuration',
                'console/manage-users',
                'console/database-export-import',
                'console/troubleshooting',
              ],
            },
          ],
        },

        {
          type: 'category',
          label: 'Sensor Agent',
          link: {
            type: 'doc',
            id: 'sensors/index'
          },
          items: [
            'sensors/kubernetes',
            'sensors/docker',
            'sensors/aws-ecs',
            'sensors/aws-fargate',
            'sensors/linux-host',
          ],
        },

        {
          type: 'category',
          label: 'Cloud Scanner',
          link: {
            type: 'doc',
            id: 'cloudscanner/index'
          },
          items: [
            'cloudscanner/aws',
            'cloudscanner/azure',
            'cloudscanner/gcp',
            'cloudscanner/other',
           ],
        },

        {
          type: 'category',
          label: 'Kubernetes Scanner',
          link: {
            type: 'doc',
            id: 'kubernetes-scanner/index'
          },
          items: [],
        },
      ],
    },

    {
      type: 'category',
      label: 'Operations',
      link: {
        type: 'doc',
        id: 'operations/index'
      },
      items: [
        'operations/scanning',
        'operations/sboms',
        'operations/compliance',
        {
          type: 'category',
          label: 'Scanning Registries',
          link: {
            type: 'doc',
            id: 'registries/index'
          },
          items: [
            'registries/aws-ecr',
          ],
        },
        'operations/east-west-dpi',
        'operations/attack-disruption',
        'operations/network-monitoring',
        'operations/file-monitoring',
        'operations/proc-monitoring',
        // {
        //   type: 'category',
        //   label: 'CI-CD Integration',
        //   link: {
        //     type: 'doc',
        //     id: 'ci-cd/index'
        //   },
        //   items: [
        //     'ci-cd/circle-ci',
        //     'ci-cd/gitlab',
        //     'ci-cd/jenkins',
        //   ],
        // },
        'operations/scanning-ci',
        'operations/support',
      ],
    },

    {
      type: 'category',
      label: 'Integrations',
      link: {
        type: 'doc',
        id: 'integrations/index'
      },
      items: [
        'integrations/threatrx',
        'integrations/pagerduty',
        'integrations/slack',
        'integrations/microsoft-teams',
        'integrations/sumo-logic',
        'integrations/elasticsearch',
        'integrations/email',
        'integrations/http-endpoint',
        'integrations/jira',
        'integrations/s3',
        'integrations/reports',
        'integrations/splunk',
      ],
    },
    {
      type: 'category',
      label: 'API Documentation',
      link: {
        type: 'doc',
        id: 'api-documentation/index'
      },
      items: [
        'api-documentation/python-sdk'
      ],
    },

    {
      type: 'category',
      label: 'Tips',
      link: {
        type: 'generated-index',
        description:
          "Tips and Techniques to get the most from ThreatMapper"
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'tips',
        },
      ],
    },
  ],
};

module.exports = sidebars;
