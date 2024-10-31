FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install cors
RUN apk add --no-cache postgresql-client
COPY . .
CMD ["node", "app.js"]

