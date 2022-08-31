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

    'threatstryker/index',

    {
      type: 'category',
      label: 'Architecture',
      link: {
          type: 'doc',
          id: 'threatstryker/architecture/index'
      },
      items: [
          'threatstryker/architecture/index',
          'threatstryker/architecture/cloudscanner',
          'threatstryker/architecture/threatgraph',
      ],
    },

    {
      type: 'category',
      label: 'Management Console',
       link: {
        type: 'doc',
        id: 'threatstryker/deploy'
      },
      items: [
        {
          type: 'category',
          label: 'Deepfence Cloud',
          items: [
            'threatstryker/cloud/index',
            'threatstryker/cloud/users',
            'threatstryker/cloud/consoles',
            'threatstryker/cloud/agents',
          ],
        },
        {
          type: 'category',
          label: 'Self-Managed',
          items: [
            'threatstryker/selfmanaged/index',
            'threatstryker/selfmanaged/console',
            'threatstryker/selfmanaged/users',
            'threatstryker/selfmanaged/aws-elb',
            'threatstryker/selfmanaged/troubleshooting',
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'Cloud Scanner task',
      link: {
          type: 'doc',
          id: 'threatstryker/cloudscanner/index'
      },
      items: [
          'threatstryker/cloudscanner/aws',
          'threatstryker/cloudscanner/azure',
          'threatstryker/cloudscanner/gcp',
          'threatstryker/cloudscanner/other',
      ],
    },

    {
      type: 'category',
      label: 'Sensor Agents',
      link: {
        type: 'doc',
        id: 'threatstryker/sensors/index'
      },
      items: [
        'threatstryker/sensors/kubernetes',
        'threatstryker/sensors/docker',
        'threatstryker/sensors/aws-ecs',
        'threatstryker/sensors/aws-fargate',
        'threatstryker/sensors/bare-metal',
      ],
    },

    {
      type: 'category',
      label: 'Operations',
      link: {
        type: 'doc',
        id: 'threatstryker/operations/index'
      },
      items: [
        'threatstryker/operations/visualization',
        'threatstryker/operations/vulnerability-management',
        'threatstryker/operations/registry-scanning',
        'threatstryker/operations/compliance',
        'threatstryker/operations/runtime-workload-firewall',
        'threatstryker/operations/east-west-dpi',
        'threatstryker/operations/runtime-integrity',
        'threatstryker/operations/attack-disruption',
        'threatstryker/operations/report-generation',
        'threatstryker/operations/ci-cd',
        'threatstryker/operations/notifications',
      ],
    },

    {
      type: 'category',
      label: 'Integrations',
      link: {
        type: 'doc',
        id: 'threatstryker/integrations/index'
      },
      items: [
        'threatstryker/integrations/slack',
        'threatstryker/integrations/sumo-logic',
        'threatstryker/integrations/terraform',
       ],
    },
    "threatstryker/api-reference",
  ],
};

module.exports = sidebars;
