# Use Node.js as the base image
FROM node:16-alpine

# Create a directory for the app
RUN mkdir -p /usr/src/app

# Set the working directory to the app folder
WORKDIR /usr/src/app

# Set environment variables
ENV DB_URI $DB_URI
ENV COOKIE_KEY $COOKIE_KEY
ENV TOKEN_KEY $TOKEN_KEY
ENV SERVER_URL $SERVER_URL
ENV CLIENT_URL $CLIENT_URL
ENV NODE_ENV $NODE_ENV
ENV GOOGLE_AUTH_CLIENT_ID $GOOGLE_AUTH_CLIENT_ID
ENV GOOGLE_AUTH_CLIENT_SECRET $GOOGLE_AUTH_CLIENT_SECRET
ENV GOOGLE_API_KEY $GOOGLE_API_KEY
ENV VAPID_PUBLIC_KEY $VAPID_PUBLIC_KEY
ENV VAPID_PRIVATE_KEY $VAPID_PRIVATE_KEY
ENV PORT $PORT

# Copy the backend code
COPY ./backend ./backend

# Copy the shared models directory
COPY ./models ./backend/src/linked-models

# Change the working directory to the backend directory
WORKDIR /usr/src/app/backend

# Install dependencies for the backend
RUN npm install

# Build the backend
RUN npm run build

# Change the working directory back to the app folder
WORKDIR /usr/src/app

# Expose the port (optional, you can specify it in your app code)
EXPOSE $PORT

# Run the backend Node.js app
CMD ["node", "/usr/src/app/backend/dist/app.js"]