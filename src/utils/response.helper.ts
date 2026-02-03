import { z } from '@hono/zod-openapi'

// Common response schemas
export const ErrorResponseSchema = z.object({
    error: z.string()
}).openapi('ErrorResponse')

export const MessageResponseSchema = z.object({
    message: z.string()
}).openapi('MessageResponse')

// Pre-defined response objects
export const responses = {
    success: (schema: any, description: string = 'Success') => ({
        200: {
            content: { 'application/json': { schema } },
            description,
        }
    }),
    
    created: (schema: any, description: string = 'Created') => ({
        201: {
            content: { 'application/json': { schema } },
            description,
        }
    }),
    
    notFound: (description: string = 'Not found') => ({
        404: {
            content: { 'application/json': { schema: ErrorResponseSchema } },
            description,
        }
    }),
    
    deleted: (description: string = 'Deleted successfully') => ({
        200: {
            content: { 'application/json': { schema: MessageResponseSchema } },
            description,
        }
    }),
    
    badRequest: (description: string = 'Bad request') => ({
        400: {
            content: { 'application/json': { schema: ErrorResponseSchema } },
            description,
        }
    }),

    unauthorized: (description: string = 'Unauthorized') => ({
        401: {
            content: { 'application/json': { schema: ErrorResponseSchema } },
            description,
        }
    })
}

export const errorResponse = {
    unauthorized: (c: any) => c.json({ message: 'Invalid Credential' }, 401),
}