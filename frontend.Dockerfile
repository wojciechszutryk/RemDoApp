FROM node:16 AS builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copy the frontend code
COPY ./frontend ./frontend
COPY ./models ./frontend/src/linked-models

# Change the working directory to the frontend directory
WORKDIR /usr/src/app/frontend

# Clear npm cache
RUN npm cache clean --force

# Install dependencies for the frontend
RUN npm install

# Build the React app
RUN npm run build

# Step 2: Set up the production environment
FROM nginx:stable-alpine

# Copy the built artifacts from the builder stage
COPY --from=builder /usr/src/app/frontend/build /usr/share/nginx/html

# Copy nginx configuration
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]