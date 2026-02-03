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
        title: 'User API',
        description: 'REST API with Hono, Zod, and OpenAPI'
    },
})

// Dokumentasi Scalar UI
app.get('/scalar', apiReference({
    spec: { 
        url: '/doc' 
    }
} as any))

// Health Chechk Endpoint
app.get('/health', (c) => {
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    })
})

export default app