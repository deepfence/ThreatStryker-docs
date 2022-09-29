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
  // By default, Docusaurus generates a sidebar from the docs folder structure
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
          'architecture/index',
          'architecture/cloudscanner',
          'architecture/threatgraph',
      ],
    },

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
          items: [
            'selfmanaged/index',
            'selfmanaged/managed-database',
            'selfmanaged/console',
            'selfmanaged/users',
            'selfmanaged/aws-elb',
            'selfmanaged/troubleshooting',
            'selfmanaged/database-export-import',
          ],
        },
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

    {
      type: 'category',
      label: 'Sensor Agents',
      link: {
        type: 'doc',
        id: 'sensors/index'
      },
      items: [
        'sensors/kubernetes',
        'sensors/docker',
        'sensors/aws-ecs',
        'sensors/aws-fargate',
        'sensors/bare-metal',
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
        'operations/visualization',
        'operations/vulnerability-management',
        'operations/registry-scanning',
        'operations/compliance',
        'operations/runtime-workload-firewall',
        'operations/east-west-dpi',
        'operations/runtime-integrity',
        'operations/attack-disruption',
        'operations/report-generation',
        'operations/ci-cd',
        'operations/notifications',
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
        'integrations/slack',
        'integrations/sumo-logic',
        'integrations/terraform',
       ],
    },
    "api-reference",
  ],
};

module.exports = sidebars;
