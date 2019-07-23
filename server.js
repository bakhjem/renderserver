const express = require('express')
const next = require('next')
const cacheableResponse = require('cacheable-response')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({ req, res, actualPage, queryParams }) => ({
      data: await app.renderToHTML(req, res, actualPage, queryParams)
    }),
    send: ({ data, res }) => res.send(data)
  })
app.prepare()
    .then(() => {
        const server = express()

        server.get('/', (req, res) => ssrCache({ req, res, actualPage: '/' }))

        server.get('/truyen/:id', (req, res) => {
            const actualPage = '/truyen'
            const queryParams = { id: req.params.id }
           return ssrCache({req, res, actualPage, queryParams})
        })
        server.get('/update/page/:page', (req, res) => {
            const actualPage = '/update'
            const queryParams = { page: req.params.page }
           return ssrCache({req, res, actualPage, queryParams})
        })
        server.get('/hot/page/:page', (req, res) => {
            const actualPage = '/hot'
            const queryParams = { page: req.params.page }
           return ssrCache({req, res, actualPage, queryParams})
        })
        server.get('/complete/page/:page', (req, res) => {
            const actualPage = '/complete'
            const queryParams = { page: req.params.page }
           return ssrCache({req, res, actualPage, queryParams})
        })
        server.get('/doc/:id/chapter/:chapter', (req, res) => {
            const actualPage = '/chapter'
            const queryParams = { id: req.params.id, chapter: req.params.chapter }
           return app.render(req, res, actualPage, queryParams)
        })
        server.get('/theloai/:id/page/:page', (req, res) => {
            const actualPage = '/theloai'
            const queryParams = { id: req.params.id, page: req.params.page }
           return app.render(req, res, actualPage, queryParams)
        })
        server.get('/search/:id/page/:page', (req, res) => {
            const actualPage = '/search'
            const queryParams = { id: req.params.id, page: req.params.page }
           return app.render(req, res, actualPage, queryParams)
        })
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })