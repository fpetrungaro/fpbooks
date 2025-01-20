# Base image
FROM node:18-alpine


# Set working directory
WORKDIR /app


# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN echo "Installing dependencies..." && npm install


# Copy project files
COPY . .
RUN ls -la /app


# Build TypeScript
RUN echo "Building TypeScript..."
RUN npm run build

# List files to confirm 'dist/' exists
RUN ls -la dist


# Expose application port
EXPOSE 3001


# Start the application
#CMD ["node", "dist/server.js"]
