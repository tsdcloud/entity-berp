FROM node:18 AS builder
LABEL maintainer="ysiaka@bfclimited.com"
# WORKDIR /App/BERP
WORKDIR /App/entity

COPY package* ./
RUN npm install --legacy-peer-deps
COPY . .
# RUN npm run build
#ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "index.js"]
# Étape 2 : Serveur Node.js minimal
# FROM node:18
# WORKDIR /App/entity
#RUN npm install -g serve
#COPY --from=builder /App/BERP/dist .
# EXPOSE 3000
# CMD ["serve", "-s", ".", "--listen", "tcp://0.0.0.0:3000"]