# frontend1/Dockerfile
FROM node:20

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3002

# Start the application
CMD ["npm", "run", "preview"]
