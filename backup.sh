#!/bin/sh
# Backs up the database and uploaded images into ./backups (keeps the last 14 days).
# Run manually or from cron:  0 4 * * * /ruta/al/proyecto/backup.sh
set -e
cd "$(dirname "$0")"
mkdir -p backups
TS=$(date +%Y%m%d-%H%M%S)

docker compose exec -T db pg_dump -U newsletter newsletter | gzip > "backups/db-$TS.sql.gz"
docker compose cp app:/app/uploads "backups/uploads-$TS"
tar czf "backups/uploads-$TS.tgz" -C backups "uploads-$TS" && rm -rf "backups/uploads-$TS"

find backups -type f -mtime +14 -delete
echo "Backup listo: backups/db-$TS.sql.gz y backups/uploads-$TS.tgz"
