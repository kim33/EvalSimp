#!/bin/bash

# Define the backup filename with the current timestamp
BACKUP_DIR="/data/horse/ws/kyim310f-cms-pro/surve-app/postgresql_backup"
BACKUP_FILENAME="db_backup_$(date +'%Y-%m-%d_%H-%M-%S').sql"

# Set your PostgreSQL details
PG_USER="postgres"  # Replace with your PostgreSQL username
PG_DB="survey_db"    # Replace with your database name
PG_HOST="localhost"      # Replace with your database host if needed (localhost by default)
PG_PORT="5432"          # Default PostgreSQL port (use if different)

# Run pg_dump command to create the backup
pg_dump -U $PG_USER -h $PG_HOST -p $PG_PORT -F c -b -v -f "$BACKUP_DIR/$BACKUP_FILENAME" $PG_DB

# Check if the backup was successful
if [ $? -eq 0 ]; then
  echo "Backup of database '$PG_DB' completed successfully."
else
  echo "Error: Backup failed."
fi
