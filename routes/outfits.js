const router = require('express').Router()
const outfitsCtrl = require('../controllers/outfits.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, outfitsCtrl.create) 

module.exports = router