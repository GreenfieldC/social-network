FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/feed .
COPY apps/feed/prisma ./prisma/
ENV PORT=3335
EXPOSE ${PORT}
RUN npm install --production
RUN npx prisma generate
CMD node ./main.js
