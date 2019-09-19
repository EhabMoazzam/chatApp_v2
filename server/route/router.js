// Main Routers
var express = require('express')
var router = express.Router()

// Router Controllers
var _auth = require('./auth_router')
var _group = require('./group_router')
var _channel = require('./channel_router')
var _chat = require('./chat_router')

// Routers - User
router.post('/auth', _auth.auth)
router.post('/user/add', _auth.add)
router.post('/user/get', _auth.get)
router.post('/user/get_all', _auth.get_all)
router.post('/user/update', _auth.update)
router.post('/user/delete', _auth.delete)

// Routers - Group
router.post('/group/create', _group.create)
router.post('/group/update', _group.update)
router.post('/group/delete', _group.delete)
router.post('/group/get', _group.get)
router.post('/group/get_all', _group.get_all)

// Routers - Channel
router.post('/channel/create', _channel.create)
router.post('/channel/update', _channel.update)
router.post('/channel/delete', _channel.delete)
router.post('/channel/get', _channel.get)
router.post('/channel/get_all', _channel.get_all)
router.post('/channel/get_group', _channel.getGroupByID)
router.post('/channel/get_groups_by_id', _channel.get_all_by_groupID)

// Routers - Chat
router.post('/chat/send', _chat.send)
router.post('/chat/history', _chat.getAllChatHistoryById)

module.exports = router
