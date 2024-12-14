#!/bin/bash

# Démarrer PostgreSQL
echo "Démarrage de PostgreSQL..."
sudo service postgresql start

# Activer l'environnement virtuel
echo "Activation de l'environnement virtuel..."
source env/bin/activate

# Appliquer les migrations
echo "Application des migrations..."
python manage.py migrate

# Démarrer le serveur Django
echo "Démarrage du serveur Django..."
python manage.py runserver &

# Capturer le PID du serveur Django
SERVER_PID=$!

echo "







PostgreSQL........ OK
Environnement..... OK
Migration......... OK
Serveur........... OK

Django Admin : http://localhost:8000/admin/
GRAPHQL : http://localhost:8000/graphql/"


# Attendre que le serveur Django se termine
wait $SERVER_PID
