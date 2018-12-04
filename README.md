# DATC-2018

## Installation process:

### Prequisites:
1. Docker - https://docs.docker.com/install/linux/docker-ce/ubuntu/
2. Docker compose - https://docs.docker.com/compose/install/

### First launch

1. ```docker-compose up --build``` 

### Routes

1. Get all: http://localhost:8081/v1/parking-lot
2. Get one: http://localhost:8081/v1/parking-lot/:name
3. Post: http://localhost:8081/v1/parking-lot
4. Patch: http://localhost:8081/v1/parking-lot/:name
5. Delete: http://localhost:8081/v1/parking-lot/:name