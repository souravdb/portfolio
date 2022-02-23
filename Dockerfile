FROM node:lts as dependencies
WORKDIR /main-app
COPY package.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /main-app
COPY . .
COPY --from=dependencies /main-app/node_modules ./node_modules
RUN npm build

FROM node:lts as runner
WORKDIR /main-app
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /main-app/next.config.js ./
COPY --from=builder /main-app/public ./public
COPY --from=builder /main-app/.next ./.next
COPY --from=builder /main-app/node_modules ./node_modules
COPY --from=builder /main-app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]