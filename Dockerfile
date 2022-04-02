# Base on offical Nodejs image
FROM node:14-alpine

# Owner
LABEL author.name="Dylan Tran"

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies, package.json, package-lock.json ...
COPY package.json .

# Install dependencies
RUN npm install

# Copy
COPY . .

# Build
RUN npm run build

# Config port
EXPOSE 3000

# Run
CMD ["npm", "run", "start"]