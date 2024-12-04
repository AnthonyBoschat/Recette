#!/bin/bash

# Trouver et tuer le processus Django en cours
echo "Arrêt du serveur Django..."
pkill -f 'python manage.py runserver'

# Arrêter PostgreSQL (si nécessaire)
echo "Arrêt de PostgreSQL..."
sudo service postgresql stop

echo "Tous les services ont été arrêtés."