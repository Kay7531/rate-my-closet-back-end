const { Outfit } = require('../models')

async function create(req, res) {
    try {
      req.body.profileId = req.user.profile.id
      const post = await Outfit.create(req.body)
      res.status(200).json(post)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error })
    }
  }

module.exports = {
    create,
}