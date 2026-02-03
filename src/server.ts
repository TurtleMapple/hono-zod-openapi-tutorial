import 'dotenv/config'
import { serve } from '@hono/node-server'
import app from './index'

const port = Number(process.env.PORT)
const host = process.env.HOST

console.log(`🚀 Server starting...`)
console.log(`📍 Server running on http://${host}:${port}`)
console.log(`📚 API Documentation: http://${host}:${port}/scalar`)
console.log(`📋 OpenAPI Spec: http://${host}:${port}/doc`)

serve ({
    fetch: app.fetch,
    port,
    hostname: host
}, (info) => {
    console.log(`✅ Server successfully started on port ${info.port}`)
})
