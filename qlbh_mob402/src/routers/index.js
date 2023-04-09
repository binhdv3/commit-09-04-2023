const siteRouter = require('./site')
const loginsignupRouter = require('./login_signup')
const adminRouter = require('./admin')

function router(app) {
    app.use('/admin', adminRouter)
    app.use('/loginsignup', loginsignupRouter)
    app.use('/',siteRouter)
}

module.exports = router;