const { Outfit } = require('../models')
const outfit = require('../models/outfit')

 async function create(req, res) {
    try {
      req.body.profileId = req.user.profile.id
      const outfit = await Outfit.create(req.body)
      res.status(200).json(outfit)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error })
    }
  }

  async function index(req, res) {
    try {
      const outfits = await Outfit.findAll({
        order: [['createdAt', 'DESC']], //['comment', 'createdAt', 'ASC']],
        // include: [{model: Comment, as: 'comment'}]
      })
      res.status(200).json(outfits)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  
  module.exports = {
    create,
    index,
  }

