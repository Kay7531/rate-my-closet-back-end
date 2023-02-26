const router = require('express').Router()
const outfitsCtrl = require('../controllers/outfits.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/
router.get('/',outfitsCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, outfitsCtrl.create)
router.put('/:id',checkAuth, outfitsCtrl.update)
router.delete('/:id',checkAuth,outfitsCtrl.delete)
router.put('/:id/add-photo', checkAuth, outfitsCtrl.addPhoto)


module.exports = router