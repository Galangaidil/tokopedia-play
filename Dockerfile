# Stage 1: Build Frontend
FROM node:18-slim as build-frontend
WORKDIR /usr/src/app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

# Stage 2: Build Backend
FROM node:18-slim as build-backend
WORKDIR /usr/src/app
COPY backend/ ./backend/
RUN cd backend && npm install
RUN ls

# Stage 3: Packaging the app
FROM node:18-slim
WORKDIR /root

COPY --from=build-frontend /usr/src/app/frontend/dist/ ./frontend/dist/
COPY --from=build-backend /usr/src/app/backend/ ./backend/

EXPOSE 3000

CMD ["node", "./backend/app.js"]

