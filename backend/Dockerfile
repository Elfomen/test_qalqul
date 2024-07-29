# backend/Dockerfile
FROM node:18

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Prepare the init.sh script for execution
RUN chmod +x ./init.sh

# Expose the port the app runs on
EXPOSE 3000

# Execute the script
CMD ["./init.sh"]
