const { Event, User, Location, Game, RSVP } = require('../../db/models');
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

router.get('/', asyncHandler(async(req, res) => {
    res.json({message: "successful creation"})
}))

router.post('/', asyncHandler(async(req, res) => {

    const { userId, eventId } = req.body;
    const exists = await RSVP.findOne({where: { userId, eventId }});
    console.log(exists, userId, eventId, "<---------------------------------------------")
    if(exists){
        await exists.destroy();
        console.log("RSVP destroyed")
    } else {
        const rsvp = await RSVP.create({
            userId,
            eventId
        })
        console.log("RSVP created")
        return res.json(rsvp);
    }
    console.log("rsvp failed")
    return res.json({message: "something went wrong"})

}))

module.exports = router;