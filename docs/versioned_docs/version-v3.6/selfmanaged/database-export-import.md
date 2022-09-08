---
title: Database Export and Import
---

Export Elasticsearch and PostgreSQL data from one management console and import in another console

## Export

Connect to old management console / database, run following commands to export
```shell
mkdir deepfence_export
cd deepfence_export

docker run --net=host --rm=true --name=elasticsearch-export \
  -v "$(pwd)":/data:rw \
  --entrypoint=/usr/local/bin/es-export.sh \
  -e ES_HOST="127.0.0.1" -e ES_PORT="9200" \
  deepfenceio/deepfence_backup:latest

docker run --net=host --rm=true --name=postgresql-export \
  -v "$(pwd)":/data:rw \
  --entrypoint=/usr/local/bin/pg-export.sh \
  -e POSTGRES_DB_HOST="127.0.0.1" -e POSTGRES_DB_PORT="5432" -e POSTGRES_DB_NAME=users -e POSTGRES_DB_USERNAME=deepfence -e POSTGRES_DB_PASSWORD=password \
  deepfenceio/deepfence_backup:latest
```

## Migrate (Major version upgrade, for elasticsearch)

This step is required when the user is upgrading Deepfence Management Console to a major release. It can be skipped in other cases.

## Import
