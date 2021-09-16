const { userGroup, Group } = require('../../db/models');
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

router.get('/', asyncHandler(async(req, res) => {
    const userGroups = await userGroup.findAll({include: {all: true}});

    return res.json(userGroups);
}))

router.post('/', asyncHandler(async(req, res) => {
    const {groupId, userId} = req.body

    await userGroup.create({
        groupId: groupId,
        userId: userId
    })

    const allGroups = await Group.findAll({include: {all:true}})
    return res.json(allGroups);
}))


router.delete('/', asyncHandler(async(req, res) => {
    const {groupId, userId} = req.body

    const group = await userGroup.findOne({where: {userId, groupId}});
    await group.destroy()

    const allGroups = await Group.findAll({include: {all:true}})
    return res.json(allGroups);
}))

module.exports = router;