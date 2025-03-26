#!/bin/bash

# Define variables
DB_USER="postgres"
DB_NAME="survey_db"
BACKUP_DIR="/data/horse/ws/kyim310f-cms-pro/surve-app"
DATE=$(date +"%Y%m%d%H%M")
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_backup_${DATE}.sql"

# Create a backup using pg_dump
pg_dump -U $DB_USER $DB_NAME > $BACKUP_FILE

# Optionally, compress the backup
gzip $BACKUP_FILE

# Print a message indicating the backup is done
echo "Backup of database $DB_NAME created at $BACKUP_FILE"
