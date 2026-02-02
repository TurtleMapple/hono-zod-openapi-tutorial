import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { route } from './routes/try.route'

const app = new OpenAPIHono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.openapi(route, (c) => {
    const { id } = c.req.valid('param')
    return c.json({
        id,
        name: 'John Doe',
        age: 42,
    })
})

app.doc('/doc', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'My API'
    },
})

app.get('/scalar', apiReference({
    spec: { url: '/doc' },
    theme: 'purple',
    pageTitle: 'My Awesome API Documentation'
}))

const port = 3000
console.log(`Server listening on http://localhost:${port}`)
console.log(`API Documentation: http://localhost:${port}/scalar`)

serve({
    fetch: app.fetch,
    port
})

export default app