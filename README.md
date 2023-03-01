# nest-microservice-kafka

## To Start Project

**Start kafka, kafdrop server**

From root directory:

```sh
cd kafka-kafdrop/
```

Start docker compose (make sure docker compose installed in your PC)

```sh
docker compose up
```

**Start API gateway**

From root directory:

```sh
cd api-gateway/ && npm i && npm run start:dev
```

**Start Auth service gateway**

From root directory:

```sh
cd auth/ && npm i && npm run start:dev
```

**Start Users service gateway**

From root directory:

```sh
cd users/ && npm i && npm run start:dev
```
