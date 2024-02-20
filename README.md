# Server

## Martins Tipp zum erstellen eines JWT Secrets:

node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"


und das dann bei .env in die JWT Secret einfügen
