import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { ParamsSchema, CreateUserSchema, UpdateUserSchema, UserSchema } from '../schema/user.schema'
import { userService } from '../service/user.service'
import { responses } from '../utils/response.helper'

// Route definitions
export const getUserRoute = createRoute({
    method: 'get',
    path: '/users/{id}',
    request: { params: ParamsSchema },
    responses: {
      ...responses.success(UserSchema, 'Get user by ID'),
      ...responses.notFound('User not found'),
    },
})

export const createUserRoute = createRoute({
  method: 'post',
  path: '/users',
  request: {
    body: {
      content: { 'application/json': { schema: CreateUserSchema } },
    },
  },
  responses: {
    ...responses.created(UserSchema, 'User created'),
  }
})

export const updateUserRoute = createRoute({
    method: 'put',
    path: '/users/{id}',
    request: {
      params: ParamsSchema,
      body: {
        content: { 'application/json': { schema: UpdateUserSchema } },
      },
    },
    responses: {
      ...responses.success(UserSchema, 'User updated'),
      ...responses.notFound('User not found'),
    },
})

export const deleteUserRoute = createRoute({
    method: 'delete',
    path: '/users/{id}',
    request: { params: ParamsSchema },
    responses: {
      ...responses.deleted('User deleted'),
      ...responses.notFound('User not found'),
    },
})

//                            //
// <<<<< ROUTE HANDLERS >>>>> //
//                            //

export const setupUserRoutes = (app: OpenAPIHono) => {
  // GET /users/:id
  app.openapi(getUserRoute, (c) => {
    const { id } = c.req.valid('param')
    const user = userService.getById(id)
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json(user, 200)
  })

  // POST /users
  app.openapi(createUserRoute, (c) => {
    const userData = c.req.valid('json')
    const newUser = userService.create(userData)
    return c.json(newUser, 201)
  })

  // PUT /users/:id
  app.openapi(updateUserRoute, (c) => {
    const { id } = c.req.valid('param')
    const userData = c.req.valid('json')
    
    const updatedUser = userService.update(id, userData)
    if (!updatedUser) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json(updatedUser, 200)
  })

  // DELETE /users/:id
  app.openapi(deleteUserRoute, (c) => {
    const { id } = c.req.valid('param')
    
    const deleted = userService.delete(id)
    if (!deleted) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json({ message: 'User deleted successfully' }, 200)
  })
}