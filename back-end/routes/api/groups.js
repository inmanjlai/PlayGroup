const { Group, userGroup } = require('../../db/models');
const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

router.get('/', asyncHandler(async(req, res) => {
    const groups = await Group.findAll({include: {all: true}});

    return res.json(groups);
}))


router.post('/', asyncHandler(async(req, res) => {

    const {name, description, ownerId} = req.body;

    const group = await Group.create({
        name,
        description,
        ownerId
    })

    const groups = await Group.findOne({where: {name, ownerId, description}, include: {all: true}});
    const owner = await userGroup.create({
        userId: ownerId,
        groupId: groups.id
    })

    return res.json(groups);
}))

router.delete('/', asyncHandler(async(req, res) => {

    const {groupId} = req.body;

    const groups = await Group.findOne({where: { id: groupId }, include: {all: true}});
    await groups.destroy();

    return res.json(groups);
}))

router.put('/', asyncHandler(async(req, res) => {

    const {groupId, name, description} = req.body;
    
    const group = await Group.findOne({where: {id: groupId}, include: {all: true}});
    await group.update({
        name,
        description,
    })

    return res.json(group);
}))



module.exports = router;