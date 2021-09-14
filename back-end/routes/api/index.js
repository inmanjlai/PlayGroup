const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events')
const gamesRouter = require('./games')
const dbRouter = require('./database')
const rsvpRouter = require('./rsvp');
const locationsRouter = require('./locations')


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/events', eventsRouter)

router.use('/games', gamesRouter)

router.use('/locations', locationsRouter)

router.use('/rsvps', rsvpRouter)

router.use('/db', dbRouter)


module.exports = router;