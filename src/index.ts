import { OpenAPIHono } from '@hono/zod-openapi'
import { apiReference } from '@scalar/hono-api-reference'
import { setupUserRoutes } from './routes/user.routes'
import { apiKeyAuth } from './middleware/auth.middleware'

const api = new OpenAPIHono().basePath('/v1')
const app = new OpenAPIHono()

// Apply API key middleware only to /users routes
api.use('/users/*', apiKeyAuth)

// Setup routes pada instance api (bukan app)
setupUserRoutes(api)

api.doc('/doc', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'User API',
        description: 'REST API with Hono, Zod, and OpenAPI'
    },
})

// Dokumentasi Scalar UI (tidak perlu auth)
api.get('/scalar', apiReference({
    spec: { 
        url: '/v1/doc' 
    }
} as any))

// Health Check Endpoint (tidak perlu auth)
api.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

app.get('/', (c) => {
    return c.redirect('/v1/scalar')
})

app.route('/', api)

export default app