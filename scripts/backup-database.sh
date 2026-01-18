#!/bin/bash
# Database Backup Script
# Creates a compressed backup of PostgreSQL database
# Usage: ./scripts/backup-database.sh [backup_directory]

set -euo pipefail

# Configuration
DATABASE_URL="${DATABASE_URL:-}"
BACKUP_DIR="${1:-${BACKUP_DIR:-./backups}}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/backup-${TIMESTAMP}.sql"
COMPRESSED_FILE="${BACKUP_FILE}.gz"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
error_exit() {
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Validate DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    error_exit "DATABASE_URL environment variable is not set"
fi

# Check if DATABASE_URL starts with postgresql://
if [[ ! "$DATABASE_URL" =~ ^postgresql:// ]]; then
    error_exit "DATABASE_URL must start with postgresql://"
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR" || error_exit "Failed to create backup directory: $BACKUP_DIR"

info "Starting database backup..."
info "Backup directory: $BACKUP_DIR"
info "Database URL: ${DATABASE_URL%%@*}" # Hide password in log

# Extract connection details from DATABASE_URL
# Format: postgresql://user:password@host:port/database
DB_CONN_STRING="$DATABASE_URL"

# Run pg_dump
info "Running pg_dump..."
if command -v pg_dump >/dev/null 2>&1; then
    pg_dump "$DB_CONN_STRING" > "$BACKUP_FILE" || error_exit "pg_dump failed"
else
    error_exit "pg_dump not found. Install PostgreSQL client tools."
fi

# Check if backup file was created and has content
if [ ! -s "$BACKUP_FILE" ]; then
    error_exit "Backup file is empty or was not created"
fi

BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
info "Backup created successfully: $BACKUP_FILE (${BACKUP_SIZE})"

# Compress backup
info "Compressing backup..."
gzip "$BACKUP_FILE" || error_exit "Failed to compress backup"

COMPRESSED_SIZE=$(du -h "$COMPRESSED_FILE" | cut -f1)
info "Compressed backup: $COMPRESSED_FILE (${COMPRESSED_SIZE})"

# Calculate compression ratio
ORIGINAL_SIZE=$(stat -f%z "${BACKUP_FILE}.gz" 2>/dev/null || stat -c%s "${BACKUP_FILE}.gz" 2>/dev/null || echo "0")
if [ "$ORIGINAL_SIZE" -gt 0 ]; then
    info "Backup compression completed"
fi

# Remove old backups (older than RETENTION_DAYS)
info "Cleaning up old backups (older than ${RETENTION_DAYS} days)..."
DELETED_COUNT=0
while IFS= read -r -d '' file; do
    rm "$file" && ((DELETED_COUNT++))
done < <(find "$BACKUP_DIR" -name "backup-*.sql.gz" -type f -mtime +$RETENTION_DAYS -print0 2>/dev/null || true)

if [ $DELETED_COUNT -gt 0 ]; then
    info "Deleted $DELETED_COUNT old backup(s)"
else
    info "No old backups to delete"
fi

# List current backups
CURRENT_BACKUPS=$(find "$BACKUP_DIR" -name "backup-*.sql.gz" -type f | wc -l)
info "Total backups in directory: $CURRENT_BACKUPS"

info "✅ Backup completed successfully: $COMPRESSED_FILE"

# Exit with success
exit 0
