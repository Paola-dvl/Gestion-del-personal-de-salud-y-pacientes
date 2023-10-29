const bcrypt = require('bcrypt');
const fs = require('fs');


module.exports = class {
  table = null;
  filePath = './data/data.json'; 
  constructor(jsonFile) {
    switch (jsonFile) {
      case 'users':
        this.table = this.loadJsonFile();
        break;
      case 'pokemon':
        this.table = require('./pokemon/pokemon.js');
    }
  }

  loadJsonFile() {
    try {
      const data = fs.readFileSync(this.filePath);
      return JSON.parse(data);
    } catch (err) {
      console.error('Error al cargar el archivo JSON:', err);
      return null;
    }
  }

  saveJsonFile(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error al guardar el archivo JSON:', err);
    }
  }

  findUserByUsername(username) {
    let user;
    this.table.users.forEach(item => {
      if (item.username === username) {
        user = item;
      }
    });

    return user;
  }

  addUser(newUser) {
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    this.table.users.push(newUser); // Suponiendo que el archivo JSON tiene una propiedad "users" que es un array
    this.saveJsonFile(this.table);
  }

  // Método para guardar los cambios en el archivo JSON
  saveChangesToFile() {
    const data = JSON.stringify(this.table, null, 2);
    fs.writeFileSync('./data/users/users.js', data);
    
  }
  
  
}
