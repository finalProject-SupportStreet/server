# Schema Modelle

### UserSchema
#### Require
- Email (unique)
- username (unique)
- plz
- password
- confirmPassword


#### weitere Angaben
- Name
- geschlecht
- gebloggte User
- 

#### Automatische Angelegt
- id
- JWT Token
- Session Cookies?


#### techniken:
- (node ist global instaliert)

- NPM (npm init es6)

- morgan

- Nodemon 

- Express.js: Express ist ein beliebtes Framework für Node.js, das beim Erstellen von RESTful APIs hilft.

- Mongoose: Mongoose ist eine Object Data Modeling (ODM) -Bibliothek für MongoDB und erleichtert das Arbeiten mit MongoDB durch Schemas, Validierung usw.

- bcrypt.js: Für die Sicherheit von Passwörtern ist bcrypt.js eine gute Wahl, da es zum Hashen von Passwörtern verwendet werden kann.

- jsonwebtoken: Wenn du eine Authentifizierungslösung implementieren möchtest, kannst du jsonwebtoken verwenden, um JWTs (JSON Web Tokens) zu erstellen und zu überprüfen.

- cors: Das cors-Paket ist nützlich, um Cross-Origin-Requests zu ermöglichen, wenn deine Frontend- und Backend-Server auf unterschiedlichen Domains oder Ports laufen.

- npm i express-session connect-mongo 

body-parser: Um JSON-Anfragen zu verarbeiten, ist body-parser hilfreich, da es den Körper von HTTP-Anfragen analysiert und für Express verfügbar macht.

helmet: Für Sicherheitszwecke ist das Helmet-Paket nützlich, da es verschiedene HTTP-Header für die Sicherheit standardmäßig setzt.

express-validator: Für die Validierung von Anfragedaten bietet express-validator eine einfache und saubere Möglichkeit, Anfragen zu validieren und sicherzustellen, dass sie den erwarteten Formaten entsprechen.

socket.io: Wenn du Live-Kommunikation in Echtzeit in deiner Nachbarschafts-App implementieren möchtest, ist socket.io eine ausgezeichnete Wahl für WebSocket-Kommunikation.