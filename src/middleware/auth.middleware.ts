// src/middleware/auth.middleware.ts
import { Context, Next } from 'hono'
import { errorResponse } from '../utils/response.helper'

export const apiKeyAuth = async (c: Context, next: Next) => {
  const apiKey = c.req.header('x-api-key')
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return errorResponse.unauthorized(c)
  }
  
  await next()
}
