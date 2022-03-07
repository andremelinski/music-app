import entities from "./models"

module.exports = () => {
    return {
        "type": "mysql",
        "host": "mysql-login",
        "port": 3306,
        username: 'user',
        password: 'password',
        database: 'users',
        entities, // "src/**/*.entity{.ts}"
        "synchronize": true // production false
    }
}


  
