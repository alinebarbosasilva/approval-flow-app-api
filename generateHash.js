//Execute esse arquivo no seu terminal do node.js. Para que o script gere uma hash para você cadastrar seu usuário no banco.
const bcrypt = require('bcryptjs');

//Insira uma senha
const password = 'Senha@123'

// Gera a hash da senha usando bcrypt
const hashPassword = bcrypt.hashSync(password, 10);

//No terminal exibirá a hash
console.log('Hash da senha:', hashPassword);