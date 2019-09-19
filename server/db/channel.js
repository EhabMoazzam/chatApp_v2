let fs = require('fs')

var Channel = function(data){
    this.data = data
}

Channel.prototype.data = {}

Channel.prototype.add = function(obj){
    var channels = this.getAllData()

    channels.push(obj)

    let data = {
        "channels" : channels
    }

    fs.writeFile('db/channel.json', JSON.stringify(data), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    })

}

Channel.prototype.delete = function(obj){
    
}

Channel.prototype.getAllData = function(){
    return new Promise((resolve, reject) => {
        fs.readFile('db/channel.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err)
            } else {
                let obj = JSON.parse(data)
                
                resolve(obj.channels) 
            }
        });
    })
}

module.exports = Channel;