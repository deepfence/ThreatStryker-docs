---
title: Troubleshooting
---

# Troubleshooting

### Docker Restarts

If the Deepfence management console VM or host has been reset/rebooted, run a following commands on the VM or host that has the Deepfence management console to restart the services:

```
docker-compose -f docker-compose.yml down
sudo sysctl -w vm.max_map_count=262144
docker-compose -f docker-compose.yml up -d
```

### Agent Management

If agents need to be stopped:

 * In a kubernetes environment, execute the following command:

   ```
   helm delete deepfence-agent
   ```

 * Otherwise, for those hosts where we need to stop the deepfence agent, execute the following command on that host:

   ```
   docker rm -f deepfence-agent
   ```