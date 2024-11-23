# FROM node:20-alpine

# RUN npm install -g nodemon

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 3003

# CMD ["npm", "run", "dev"]

# FROM node:21.5-bullseye AS build
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies efficiently and leverage layer caching
COPY package*.json .
COPY update_proxy.sh .

RUN ls -lah

RUN chmod +x update_proxy.sh && ./update_proxy.sh

# Set up npm cache in a designated directory to improve caching
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

# Copy the entire application source code
COPY . .

# Run the build command to generate production-ready artifacts
RUN npm run build


# Stage 2: Deployable Image
# Use a specific version of the official Nginx image as the base image for the deployable image
# FROM nginxinc/nginx-unprivileged:1.24-bullseye-perl
FROM nginx:stable-alpine-perl as deploy

# Expose the port that the Nginx server will listen on
EXPOSE 8080

# Copy the built artifacts from the build stage to the Nginx HTML directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html