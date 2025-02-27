# Use Node.js 20 (or higher) instead of Node.js 18
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies explicitly
RUN npm install --legacy-peer-deps

# Copy the entire project AFTER installing dependencies
COPY . .

RUN npx husky install

EXPOSE 5173

CMD ["npm", "run", "dev"]
