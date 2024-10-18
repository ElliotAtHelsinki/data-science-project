#!/bin/bash

docker build --no-cache -t elliotathelsinki/hsl:latest .
docker push elliotathelsinki/hsl:latest
ssh -i ~/.ssh/id_rsa ubuntu@elliot-at-helsinki.eu "
  sudo docker pull elliotathelsinki/hsl:latest && 
  sudo dokku git:from-image hsl elliotathelsinki/hsl:latest && 
  sudo dokku ps:rebuild hsl
"
