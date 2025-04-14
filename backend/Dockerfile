# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 node:21-alpine

WORKDIR /nftapi

COPY package*.json ./

# Install dependencies as a separate step to leverage Docker cache
RUN yarn install

# Add nodemon globally
RUN yarn global add nodemon

# Copy the rest of the application code
COPY --chown=node:node . .

# Expose the port specified in the .env file
EXPOSE 8090

# Start the application using nodemon
CMD ["yarn", "start"]
