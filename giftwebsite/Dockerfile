# Use Node.js LTS version
FROM node:18.12.1-bullseye-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy application code
COPY . .

# Expose port (if needed)
EXPOSE 9000

# Run the application
CMD ["npm", "run", "serve"]
