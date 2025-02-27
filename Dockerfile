# Use Node.js 20 (or higher) as the base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Install Husky (if needed)
RUN npx husky install

# Build the frontend application (adjust the build command based on your framework)
RUN npm run build

# Stage 2: Serve the application using a lightweight web server
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install a lightweight HTTP server (e.g., serve)
RUN npm install -g serve

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app will run on
EXPOSE 5173

# Start the app using a static file server
CMD ["serve", "-s", "dist", "-l", "5173"]