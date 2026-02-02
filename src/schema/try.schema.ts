import { z } from '@hono/zod-openapi';

export const ParamsSchema = z.object({
    id: z
    .string()
    .min(1)
    .openapi({
        param: {
            name: 'id',
            in: 'path',
        },
        example: '1212121',
    }),
})

export const UserSchema = z
    .object({
        id: z.string().openapi({
            example: '1212121',
        }),
        name: z.string().openapi({
            example: 'John Doe',
        }),
        age: z.number().int().positive().openapi({
            example: 42,
        }),
        email: z.string().email().openapi({
            example: 'johndoe@example.com',
        }),
    })
    .openapi('user')