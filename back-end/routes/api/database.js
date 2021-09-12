const { Event, User, Location, Game } = require('../../db/models');
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

router.get('/', asyncHandler(async(req, res) => {
    const db = {};
    const users = await User.findAll({include: { all: true }});
    const events = await Event.findAll({include: { all:true }})
    const locations = await Location.findAll({include: { all: true }})
    const games = await Game.findAll({include: { all: true}})

    db['users'] = users;
    db['events'] = events;
    db['locations'] = locations;
    db['games'] = games;
    return res.json(db);
}))

module.exports = router;