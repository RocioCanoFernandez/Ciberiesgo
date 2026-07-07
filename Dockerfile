# Utilizamos una imagen muy ligera y oficial de Nginx para servir sitios estáticos
FROM nginx:alpine

# Copiamos directamente nuestros archivos estáticos a la carpeta de Nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY img/ /usr/share/nginx/html/img/

# Exponemos el puerto 80 (puerto por defecto de HTTP)
EXPOSE 80

# El comando por defecto de la imagen ya arranca Nginx en primer plano, 
# pero podemos dejarlo explícito para mayor claridad.
CMD ["nginx", "-g", "daemon off;"]
