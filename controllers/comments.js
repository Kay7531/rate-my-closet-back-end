const { Comment, Outfit, Profile } = require('../models')
const comment = require('../models/comment')

async function addComment(req, res) {
    try {
    //   req.body.outfitId = req.params.id
      req.body.profileId = req.user.profile.id
      console.log(req.body);
      const comment = await Comment.create(req.body)
      const author = await Profile.findByPk(comment.profileId)
      comment.dataValues.author = author
      res.status(200).json(comment)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error })
    }
  }

  async function updateComment(req, res) {
    try {
      const comment = await Comment.update(req.body, { where: { id: req.params.id }, returning: true })
      res.status(200).json(comment)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error })
    }
  }

  async function deleteComment(req, res) {
    try {
      const numberOfRowsRemoved = await Comment.destroy({ where: { id: req.params.id} })
      res.status(200).json(numberOfRowsRemoved)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error })
    }
  }
  

module.exports = {
addComment,
updateComment,
deleteComment

}