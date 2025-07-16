# Dockerfile for React frontend (Vite or Create React App)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build with environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx-https.conf /etc/nginx/conf.d/default.conf

# Create SSL directory and copy certificates
RUN mkdir -p /etc/nginx/ssl
COPY cert.pem /etc/nginx/ssl/
COPY key.pem /etc/nginx/ssl/

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
