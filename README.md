# apinodejs

Criar o arquivo package
npm init -y

//Gerencia as requisições, rotas e URLs, entre outra funcionalidades
npm install express

//Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte
npm install -D nodemon (Caso de o comando nodemon src/server.js e aparecer o erro: "nodemon: command not found" vá para o terminal e instale o nodemon de forma global) sudo npm install nodemon -g

//Produz código JS válido - para import do ES6
npm install -D sucrase

//Iniciar o servidor
npm rum dev

//Instalar as dependencias
npm install

//Instalar o MongoDB
npm install --save mongodb

//Instalar o Mongoose - Mongoose traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados por sua aplicação.
npm install --save mongoose

//Não esquecer de iniciar o MongoDB. Vá para a raiz onde foi instalado e ai no terminal digite:
sudo service mongod start

sudo systemctl status mongod

//validar campo
npm install --save yup

//Instalar o módulo para criptografar a senha
npm install --save bcryptjs

// Intalar a dependencia para JWT
npm install --save jsonwebtoken

//instalar o módulo para paginação com mongoose
npm install --save mongoose-paginate-v2

//multer é um middleware node.js para manipulação multipart/form-date, usado para o upload de arquivos.
npm install --save multer (meu)

//permitir acesso a API
npm Install --save cors

//Criar o Dump
mongodump --db NOME-DO-BANCO --out /home/%USUARIO%/%DIR_DE_BACKUP

//Restaurar o Backup
mongorestore --db NOME-DO-BANCO /home/%USUARIO%/%DIR_DE_BACKUP/NOME-DO-BANCO