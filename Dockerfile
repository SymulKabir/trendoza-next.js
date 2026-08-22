FROM node:20-alpine

WORKDIR /symul/firshlo

COPY package.json package-lock.json ./

RUN npm ci

# DEBUG
RUN npm ls @tailwindcss/postcss
RUN test -d node_modules/@tailwindcss/postcss && echo "TAILWIND POSTCSS EXISTS"

COPY . .

RUN npx prisma generate

RUN npm run build

RUN mkdir -p /symul/storage/fishlo

EXPOSE 3000

CMD ["npm", "start"]