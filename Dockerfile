#Build the React application
#FROM node:14 as build
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm run build

#Serve the React application
#FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

#demo test. delete below after work done
FROM nginx:latest
LABEL name="demo"

COPY ./src/index.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
