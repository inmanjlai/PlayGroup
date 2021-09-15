const { Event, User, Location, Game, RSVP } = require('../../db/models');
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

router.get('/', asyncHandler(async(req, res) => {
    const rsvps = await RSVP.findAll({include: { all: true }})
    return res.json(rsvps)
}))

router.post('/', asyncHandler(async(req, res) => {

    const { userId, eventId } = req.body;
    const exists = await RSVP.findOne({where: { userId, eventId }});

    if(!exists){
        const rsvp = await RSVP.create({
            userId,
            eventId
        })
        console.log("RSVP created")
        const newRsvp = await RSVP.findOne({where: {userId, eventId}, include: {all:true}})
        return res.json(newRsvp);
    }
}))

router.delete('/', asyncHandler(async(req, res) => {

    const { userId, eventId } = req.body;
    const exists = await RSVP.findOne({where: { userId, eventId }});

    if(exists){
        const deleted = await exists.destroy();
        console.log("RSVP destroyed")
    }
    
    const allRSVPS = await RSVP.findAll({include: {all:true}})
    return res.json(allRSVPS);
}))


module.exports = router;