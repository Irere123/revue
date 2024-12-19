# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript project
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy built files from the build stage
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json .

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["node", "build/index.js"]