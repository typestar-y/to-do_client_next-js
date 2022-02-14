FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -q
COPY . ./
ENV NEXT_PUBLIC_API_BASE_URL http://localhost:3001
RUN npm run build

CMD ["npm", "run", "start"]