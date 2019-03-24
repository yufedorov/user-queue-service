FROM keymetrics/pm2:8-alpine
#FROM keymetrics/pm2:8-stretch
WORKDIR opt/user_queue
RUN npm install -g typescript
COPY src src/
COPY process.yml .
COPY package.json .
COPY tsconfig.json .
COPY .npmignore .
RUN pwd && ls -lah
RUN npm install
RUN pwd && ls -lah
RUN tsc
RUN pwd && ls -lah
#RUN pwd
#RUN ls -la
#RUN echo "process.yml:" && cat process.yml
CMD ["pm2-runtime", "start", "process.yml","--web"]

