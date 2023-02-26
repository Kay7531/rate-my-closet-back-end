const { Outfit,Comment, Profile } = require('../models')
const outfit = require('../models/outfit')
const comment = require('../models/comment')
const cloudinary = require('cloudinary').v2

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
        // order: [['createdAt', 'DESC'], ['comment', 'createdAt', 'ASC']],
        // include: [{model: Comment, as: 'comment'}]
        
      })
      res.status(200).json(outfits)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async function update(req, res) {
    try {
      const outfit = await Outfit.update(req.body, { where: { id: req.params.id }, returning: true })
      res.status(200).json(outfit)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error })
    }
  }

  async function deleteOutfit(req, res) {
    try {
      const numberOfRowsRemoved = await Outfit.destroy({ where: { id: req.params.id } })
      res.status(200).json(numberOfRowsRemoved)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error })
    }
  }
  
  async function addPhoto(req, res) {
    try {
      const imageFile = req.files.photo.path
      const outfit = await Outfit.findByPk(req.params.id)
      const image = await cloudinary.uploader.upload(
        imageFile, 
        { tags: `${req.user.email}` }
      )
      outfit.photo = image.url
      await outfit.save()
      res.status(201).json(outfit.photo)
    } catch (error) {
      console.log(error)
      res.status(500).json({ err: error })
    }
  }
  
  module.exports = {
    create,
    index,
    update,
    delete: deleteOutfit,
    addPhoto
  }

