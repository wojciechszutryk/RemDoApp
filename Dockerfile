# # Use an official Node runtime as a parent image
FROM node:20 AS builder

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy all other application files
COPY frontend ./

# Copy the models directory to frontend/src/linked-models
COPY models ./src/linked-models

# Build the assets
RUN npm run build

# Copy the backend code
COPY ./backend ./backend

# Copy the shared models directory to backend
COPY ./models ./backend/src/linked-models

# Change the working directory to the backend directory
WORKDIR /backend

# Install dependencies for the backend
RUN npm install

# Build the backend
RUN npm run build

COPY ./frontend/build ./backend/public

# Expose the port (optional, you can specify it in your app code)
EXPOSE $PORT

WORKDIR /

# Run the backend Node.js app
CMD ["node", "./backend/dist/app.js"]



# # Use Node.js as the base image
# FROM node:20

# # Set environment variables
# ENV DB_URI $DB_URI
# ENV COOKIE_KEY $COOKIE_KEY
# ENV TOKEN_KEY $TOKEN_KEY
# ENV SERVER_URL $SERVER_URL
# ENV CLIENT_URL $CLIENT_URL
# ENV NODE_ENV $NODE_ENV
# ENV GOOGLE_AUTH_CLIENT_ID $GOOGLE_AUTH_CLIENT_ID
# ENV GOOGLE_AUTH_CLIENT_SECRET $GOOGLE_AUTH_CLIENT_SECRET
# ENV GOOGLE_API_KEY $GOOGLE_API_KEY
# ENV VAPID_PUBLIC_KEY $VAPID_PUBLIC_KEY
# ENV VAPID_PRIVATE_KEY $VAPID_PRIVATE_KEY
# ENV PORT $PORT

# # Copy the backend code
# COPY ./backend ./backend

# # Copy the shared models directory to backend
# COPY ./models ./backend/src/linked-models

# # Change the working directory to the backend directory
# WORKDIR /backend

# # Install dependencies for the backend
# RUN npm install

# # Build the backend
# RUN npm run build

# # Change the working directory to the backend directory
# WORKDIR ./

# # Copy package.json and package-lock.json to the working directory
# COPY frontend/package*.json ./

# # Install any needed packages specified in package.json
# RUN npm install

# # Copy all other application files
# COPY frontend ./

# # Copy the models directory to frontend/src/linked-models
# COPY models ./src/linked-models

# # Build the assets
# RUN npm run build

# # Copy the React app build files into the backend directory
# COPY build ./backend/public

# # Expose the port (optional, you can specify it in your app code)
# EXPOSE $PORT

# # Run the backend Node.js app
# CMD ["node", "./backend/dist/app.js"]