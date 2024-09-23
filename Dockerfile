# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install React Native CLI globally (optional, but useful for running commands)
RUN npm install -g react-native-cli

# Expose the default React Native packager port
EXPOSE 8081

# Start the React Native packager
CMD ["npm", "start"]

