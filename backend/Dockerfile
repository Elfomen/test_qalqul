# backend/Dockerfile
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

RUN chmod +x ./init.sh

# Expose the port the app runs on
EXPOSE 3000

CMD ["./init.sh"]
