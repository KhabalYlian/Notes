FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install && rm -rf /var/lib/apt/lists/*
ADD . .
ENV NODE_ENV production
RUN npm run build
EXPOSE $PORT | 3000