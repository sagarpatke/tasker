FROM mhart/alpine-node-auto

RUN mkdir -p usr/src/tasker
WORKDIR usr/src/tasker

COPY . .

RUN npm install

CMD ["npm" ,"start" ,"--production"]
