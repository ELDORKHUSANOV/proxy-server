# Yengil bazaviy image
FROM node:16-alpine

# Ishchi papka
WORKDIR /e-imzo-server

# Faqat kerakli fayllar
COPY package*.json ./

# Modullarni o‘rnatamiz
RUN npm install --production

# Qolgan fayllarni ko‘chiramiz
COPY . .

# Port ochamiz
EXPOSE 3000

# Dasturni ishga tushiramiz
CMD ["node", "server.js"]
