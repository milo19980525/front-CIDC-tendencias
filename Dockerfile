# https://shekhargulati.com/2019/01/18/dockerizing-a-vue-js-application/

# Etapa de compilación
FROM node:13.14.0-alpine as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción Nginx
# FROM nginx:stable-alpine as nginx
# COPY --from=node /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# Etapa de producción Apache
FROM httpd:2.4-alpine as apache
COPY --from=node /app/dist /usr/local/apache2/htdocs
EXPOSE 80

# Now let's build the Docker image of our Vue.js app:
# docker build -t cidc.udistrital.edu.co/siciud:v2.0 .
# Finally, let's run our Vue.js app in a Docker container:
# docker run -it -p 8080:80 -d --name siciud-v2-front cidc.udistrital.edu.co/siciud:v2.0
# We should be able to access our Vue.js app on localhost:8080.
