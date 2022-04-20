const { model } = require('mongoose')
const auth = require('./auth')
const errHandler = require('./err-handler')
const requestTester = require('./request-tester')
const validator = require('./validator')

module.exports = {
    auth,
    errHandler,
    requestTester,
    validator
}