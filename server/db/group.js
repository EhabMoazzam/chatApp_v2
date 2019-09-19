let fs = require('fs')

var Group = function(data){
    this.data = data
}

Group.prototype.data = {}

Group.prototype.add = function(obj){
    var groups = this.getAllData()

    groups.push(obj)

    let data = {
        "groups" : users
    }

    fs.writeFile('db/group.json', JSON.stringify(data), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    })

}

Group.prototype.delete = function(obj){
    
}

Group.prototype.getAllData = function(){
    return new Promise((resolve, reject) => {
        fs.readFile('db/group.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err)
            } else {
                let obj = JSON.parse(data)
                
                resolve(obj.groups) 
            }
        });
    })
}

module.exports = Group;