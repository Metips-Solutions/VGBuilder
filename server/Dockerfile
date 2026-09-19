# Misma imagen base (Debian, no depende del SO del host) tanto para
# desarrollo local como para producción en el servidor Rocky Linux —
# el punto de Docker es justo evitar que "el SO del server" sea un factor.
FROM oven/bun:1

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "--watch", "src/index.ts"]
