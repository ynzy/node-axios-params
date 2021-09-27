const formidable = require('formidable')

const { SuccessRes } = require('../res-model')

const router = require('koa-router')()

const form = formidable({ multiples: true })

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
    })
})
router.get('/query', (ctx, next) => {
    console.log(ctx.query);
    ctx.body = new SuccessRes({
        method: ctx.request.method,
        url: ctx.request.url,
        ctxQuery: ctx.query
    })
})
router.post('/body', async (ctx, next) => {
    console.log(ctx.request.body);
    ctx.body = new SuccessRes({
        method: ctx.request.method,
        url: ctx.request.url,
        ctxBody: ctx.request.body
    })
})
router.get('/path/:id', async (ctx, next) => {
    console.log(ctx.params);
    ctx.body = new SuccessRes({
        method: ctx.request.method,
        url: ctx.request.url,
        ctxParams: ctx.params
    })
})
router.post('/formData', async (ctx, next) => {
    // console.log(ctx.req);
    const res = await uploadFilesByFormidable(ctx.req)
    console.log(res);
    ctx.body = new SuccessRes({
        method: ctx.request.method,
        url: ctx.request.url,
        ...res
    })
})

router.post('/mixTheRequest/:id', async (ctx, next) => {
    ctx.body = new SuccessRes({
        method: ctx.request.method,
        url: ctx.request.url,
        ctxQuery: ctx.query,
        ctxParams: ctx.params,
        ctxBody: ctx.request.body
    })
})

function uploadFilesByFormidable(req) {
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            // console.log({ fields, files });
            const filesKeys = Object.keys(files)
            const fileList = filesKeys.map(name => {
                const file = files[name]
                return {
                    fileName: file.name || name,
                    filePath: file.path
                }
            })
            resolve({
                fields,
                fileList
            })
        });
    })
}

module.exports = router
