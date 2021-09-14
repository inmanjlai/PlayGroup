const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events')
const gamesRouter = require('./games')
const rsvpRouter = require('./rsvp');
const locationsRouter = require('./locations')
const groupsRouter = require('./groups');
const userGroupsRouter = require('./userGroups')


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/events', eventsRouter)

router.use('/games', gamesRouter)

router.use('/locations', locationsRouter)

router.use('/rsvps', rsvpRouter)

router.use('/groups', groupsRouter)

router.use('/userGroups', userGroupsRouter)


module.exports = router;