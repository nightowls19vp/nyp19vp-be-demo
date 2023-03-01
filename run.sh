#!/bin/bash

root=`pwd`

cd $root && cd kafka-kafdrop/ && docker compose up &

cd $root && cd ./api-gateway/ && npm install &&  npm run start:dev &

cd $root && cd ./users/ && npm install &&  npm run start:dev &

cd $root && cd ./auth/ && npm install &&  npm run start:dev &

