
const routes = require('next-routes')()

// DONT DELETE THIS SEPARATOR LINE!!!
/* ========= */
routes.add('list', '/', 'List')
routes.add('post', '/post/:id', 'Post')
/* ========= */

module.exports = routes
