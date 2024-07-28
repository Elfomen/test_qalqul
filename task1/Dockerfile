# frontend1/Dockerfile
FROM node:18

# Create and set the working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["yarn", "run", "preview"]
