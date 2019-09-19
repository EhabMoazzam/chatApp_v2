var ChatSchema = require('./../schemas/chat.js')

module.exports.send = function(req, res){
    var data = {
        "from_id" : req.body.from_id,
        "to_id" : req.body.to_id,
        "message" : req.body.msg,
        "send_at" : Date.now()
    }

    ChatSchema.create(data, function(err, doc){
        if(err){
            res.status(401).json(err);
        }
        res.status(201).json(doc);
    })

}

module.exports.getAllChatHistoryById = function(req, res){
    var data = []

    ChatSchema.find({}, function (err, docs){
        if (err) res.status(401).json(err)

        for (var i = 0; i < docs.length; i++){
            var doc = docs[i]

            if (doc.from_id === req.body._id || doc.to_id === req.body._id) data.push(doc)
        }

        res.status(201).json(data);
    })

}