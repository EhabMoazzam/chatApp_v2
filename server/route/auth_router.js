var UserSchema = require('./../schemas/user.js')

module.exports.auth = async function(req, res){
    var _email = req.body.email
    var _password = req.body.password
    var _info = await get_all_users()

    if (_info == undefined){
        var result = await add_user(_email,_password)
        res.status(201).json(result)
        return
    }

    for (let i = 0; i < _info.length; i++){
        let doc = _info[i]

        if (doc.email === _email && doc.password === _password){
            res.status(201).json(doc)
            return
        }
    }

    var result = await add_user(_email,_password)
    res.status(201).json(result)
}

function add_user(email, password){
    var data = {
        "name"          : email.split("@")[0],
        "email"         : email,
        "password"      : password,
        "role"          : 4,
        "group_id"      : "5d82ad71a4d165378c7681de",
        "channel_id"    : "5d82b35c32621644b8034f07",
        "avator_url"    : "http://localhost:3000/images/avatar.png"
    }

    return new Promise(function(resolve, reject){
        UserSchema.create(data, function(err, doc){          
            resolve(doc)
        })
    })

    
}

function get_all_users(){
    return new Promise(function(resolve, reject){
        UserSchema.find({},function(err, docs){
            resolve(docs)
        })
    })
}

module.exports.add = function(req, res){
    var data = {
        "name"          : req.body.name,
        "email"         : req.body.email,
        "password"      : req.body.password,
        "role"          : req.body.role,
        "group_id"      : req.body.group_id,
        "channel_id"    : req.body.channel_id,
        "avator_url"    : "http://localhost:3000/images/avatar.png"
    }

    UserSchema.create(data, function(err, doc){
        if(err){
            res.status(401).json(err);
        }
        res.status(201).json(doc);
    })
}

module.exports.get = function(req, res){
    UserSchema.findOne({'_id' : req.body._id}, function (err, doc){
        if (err) res.status(401).json(err)
        
        res.status(201).json(doc)
    })
}

module.exports.get_all = function(req, res){
    var data = []

    UserSchema.find({}, function (err, docs){
        if (err) res.status(401).json(err)

        docs.forEach(function (doc) {
            data.push(doc)
        })

        res.status(201).json(data);
    })
}

module.exports.delete = function(req, res){
    UserSchema.findOne({'_id' : req.body._id}, function (err, doc){
        if (err) res.status(401).json(err)

        if (doc){
            doc.remove(function(err, data){
                if (err) res.status(401).json(err)
    
                res.status(201).json({ result : 'deleted'})
            })
        }
    })

    res.status(201).json({ result : 'none'})
}

module.exports.update = function(req, res){
    var data = {
        "name"          : req.body.email.split("@")[0],
        "email"         : req.body.email,
        "password"      : req.body.password,
        "role"          : req.body.role,
        "group_id"      : req.body.group_id,
        "channel_id"    : req.body.channel_id,
        "avator_url"    : req.body.avator_url
    }

    var query = {'_id' : req.body._id}

    UserSchema.update(query, data, function (err, doc){
        if (err) res.status(401).json(err)

        res.status(201).json(doc);
    })
}