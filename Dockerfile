# Usa l'immagine ufficiale di PHP con server Apache integrato
FROM php:8.2-apache

# Abilita il modulo rewrite di Apache (utile per routing avanzati, opzionale ma consigliato)
RUN a2enmod rewrite

# Copia i file del sito dalla cartella src alla root del server web
COPY src/ /var/www/html/

# Imposta i permessi corretti per la cartella web
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Esponi la porta 80
EXPOSE 80