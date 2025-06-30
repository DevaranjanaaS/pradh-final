# Dockerfile for Node.js/Express backend
FROM node:18-alpine

# Set working directory
WORKDIR /server

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Set environment variables (override in docker-compose)
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]
