import { z } from '@hono/zod-openapi'

export const ParamsSchema = z.object({
    id: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: "ID must be a number" })
    .openapi({
        param: {
            name: 'id',
            in: 'path',
        },
        example: '1',
    }),
})

export const CreateUserSchema = z.object({
    name: z.string().min(2).openapi({ example: 'John Doe' }),
    email: z.string().email().openapi({ example: 'john@example.com' }),
    age: z.number().int().min(18).max(100).openapi({ example: 25 }),
})

export const UpdateUserSchema = CreateUserSchema.partial()

export const UserSchema = z.object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'John Doe' }),
    email: z.string().email().openapi({ example: 'john@example.com' }),
    age: z.number().openapi({ example: 25 }),
}).openapi('User')

export const DeleteResponeseSchema = z.object({
    message: z.string
}).openapi('DeleteResponse')