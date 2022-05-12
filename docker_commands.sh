#!/bin/bash
echo "wait 10 sec"
sleep 10
npx knex migrate:latest
npm start