let fs = require('fs')

var User = function(data){
    this.data = data
}

User.prototype.data = {}

User.prototype.add = async function(obj){
    var users = await this.getAllData()  
    users.push(obj)
   
    let data = {
        "users" : users
    }

    fs.writeFile('db/user.json', JSON.stringify(data), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    })
}

User.prototype.delete = async function(obj){
    var users = await this.getAllData() 
    let index = 0

    for (i = 0; i < users.length; i++){
        if (users[i].username === obj.username && users[i].email === obj.email){
            index = i
        }
    }

    users.splice(index, 1)

    let data = {
        "users" : users
    }

    fs.writeFile('db/user.json', JSON.stringify(data), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    })
}

User.prototype.getAllData = function(){
    
    return new Promise((resolve, reject) => {
        fs.readFile('db/user.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err)
            } else {
                obj = JSON.parse(data)
                
                resolve(obj.users) 
            }
        });
    })
    
}

module.exports = User;