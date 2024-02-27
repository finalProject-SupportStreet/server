# Schema Modelle

Nutzer zum testen in Thunderclient:

User: ...d50a
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZGRkYmUzMmYxYjJiN2RjMjQxZDUwYSIsImVtYWlsIjoiMTIzQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiIkMmIkMTIkQ2xlZC80eURza1NnRVRXcm9IaWg3ZUZiT0NCV2VTSmUuamtkdS8uRnNvdXRqaFhCREN5SXUiLCJmaXJzdE5hbWUiOiJKb2huIiwiYWRkcmVzcyI6W3siemlwIjoiMTIzNDUiLCJzdHJlZXQiOiJNYWluIFN0cmVldCIsIm51bWJlciI6IjEyMyIsIl9pZCI6IjY1ZGRkYmUzMmYxYjJiN2RjMjQxZDUwYiJ9XSwiZm9sbG93VXNlcnMiOltdLCJncm91cHMiOltdLCJpbnRlcmVzdHMiOltdLCJvZmZlcnMiOltdLCJhY3Rpdml0aWVzIjpbXSwib3JnYW5pemluZyI6W10sImJsb2NrZWRVc2VycyI6W10sIm1hcmtldEl0ZW1zIjpbXSwiX192IjowfSwiaWF0IjoxNzA5MDM4NjM4fQ.pvfsXZsSxouXCYhBhAuSgF8CMMqGAGdAyQrGW2Sru8M

User: ...641e
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZDc1MmQ3YWVjMTRhMTY0YjZkNjQxZSIsImVtYWlsIjoidXNlcjRAZmFrZS5kZSIsInBhc3N3b3JkIjoiJDJiJDEyJC95TnhtVXNFNHBBQnJxVzNNRlJranV2LkJUN0JVLlhBZ3ROM0tIM2pyME8zbXZ5aEVjdVhPIiwiZmlyc3ROYW1lIjoidXNlcjQiLCJhZGRyZXNzIjpbeyJwbHoiOiIxMjM0NCIsInN0cmVldCI6IkZha2UgU3RyZWV0IiwibnVtYmVyIjoiMTM0IiwiX2lkIjoiNjVkNzUyZDdhZWMxNGExNjRiNmQ2NDFmIn1dLCJmb2xsb3dVc2VycyI6W10sImdyb3VwcyI6W10sImludGVyZXN0cyI6W10sIm9mZmVycyI6W10sImFjdGl2aXRpZXMiOltdLCJvcmdhbml6aW5nIjpbXSwiYmxvY2tlZFVzZXJzIjpbXSwiX192IjowLCJtYXJrZXRJdGVtcyI6W119LCJpYXQiOjE3MDkwMzc3NjZ9.NImrfzTjgZ6ojHzcDveunUy2Z5fw3PIWTkFcAOKD67E

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