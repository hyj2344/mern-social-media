# FROM node:18
FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app

# COPY *.json .
COPY . .

RUN npm install -g nodemon





ENV PASSWORD=123
ENV DB=docker-db
ENV JWT_SECRET='ABDRASDF'
ENV PORT=3001

CMD ["npm", "start"]
EXPOSE 3001
