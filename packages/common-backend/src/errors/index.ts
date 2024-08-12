import { GraphQLError } from 'graphql';

export const UnauthenticatedError = new GraphQLError('User not authenticated', {
    extensions: {
        code: 'UNAUTHENTICATED'
    }
})

export const ForbiddenError = new GraphQLError('Forbidden', {
    extensions: {
        code: 'FORBIDDEN'
    }
})

export const NotFoundError = new GraphQLError('Not found', {
    extensions: {
        code: 'NOT_FOUND'
    }
})

export const ConflictError = new GraphQLError('Conflict', {
    extensions: {
        code: 'CONFLICT'
    }
})

export const InternalServerError = new GraphQLError('Internal server error', {
    extensions: {
        code: 'INTERNAL_SERVER_ERROR'
    }
})

export const BadRequestError = new GraphQLError('Bad request', {
    extensions: {
        code: 'BAD_REQUEST'
    }
})

export const UnprocessableEntityError = new GraphQLError('Unprocessable entity', {
    extensions: {
        code: 'UNPROCESSABLE_ENTITY'
    }
})

export const ValidationError = new GraphQLError('Validation error', {
    extensions: {
        code: 'VALIDATION_ERROR'
    }
})

export const UnauthorizedError = new GraphQLError('Unauthorized', {
    extensions: {
        code: 'UNAUTHORIZED'
    }
})