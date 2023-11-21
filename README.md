# SE_project-core

## How to start

```
ssh-keygen -t rsa -b 4096 -m PEM -f ./node_app/keys/jwtRS256.key
# Don't add passphrase
openssl rsa -in ./node_app/keys/jwtRS256.key -pubout -outform PEM -out ./node_app/keys/jwtRS256.key.pub
docker-compose up -d
```
