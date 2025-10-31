#!/bin/bash

echo "🚀 Starting Directus initialization process..."
echo "🔗 Connecting to database..."

# Verificar conexión a la base de datos
echo "📊 Database client: $DB_CLIENT"
echo "🏠 Database host: $DB_HOST"
echo "📱 Database port: $DB_PORT"
echo "🗄️  Database name: $DB_DATABASE"

# Forcer l'installation des tables système Directus
echo "⚡ Forcing Directus database initialization..."
npx directus database install --yes

# Appliquer le schéma personnalisé
echo "📋 Applying custom schema..."
npx directus schema apply --yes ./schema.json

# Démarrer Directus
echo "🚀 Starting Directus server..."
npx directus start
