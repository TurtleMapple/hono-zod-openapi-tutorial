import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { setupUserRoutes } from './routes/user.routes'

const app = new OpenAPIHono()

// Setup routes
setupUserRoutes(app)

app.doc('/doc', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'User API'
    },
})

app.get('/scalar', apiReference({
    spec: { 
        url: '/doc' 
    }
} as any))

const port = 3000
console.log(`Server listening on http://localhost:${port}`)
console.log(`API Documentation: http://localhost:${port}/scalar`)

serve({
    fetch: app.fetch,
    port
})

export default app