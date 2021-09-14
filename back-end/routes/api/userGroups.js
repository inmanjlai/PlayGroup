const { userGroup } = require('../../db/models');
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

router.get('/', asyncHandler(async(req, res) => {
    const userGroups = await userGroup.findAll({include: {all: true}});

    return res.json(userGroups);
}))

module.exports = router;