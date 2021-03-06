# Pull from a base image
FROM node:13-alpine

# Use app as the working directory
WORKDIR /app

# Copies your code file from your current directory (.) to the app
COPY . /app

# Install dependencies
RUN npm ci

# Build production app
RUN npm run build

# Listen on the specified port
EXPOSE 3000

# Set node server
ENTRYPOINT npm run start