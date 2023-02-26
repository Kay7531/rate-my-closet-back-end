const router = require('express').Router()
const commentsCtrl = require('../controllers/comments.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, commentsCtrl.addComment)
router.put('/:id',checkAuth, commentsCtrl.updateComment)
router.delete('/:id',checkAuth, commentsCtrl.deleteComment)


module.exports = router