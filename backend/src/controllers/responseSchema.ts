import {getModelSchemaRef} from '@loopback/rest';
import {Movie} from '../models';

export const movieResponseSchema = {
  addMovie: {
    description: 'Movie model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Movie),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  fetchMovies: {
    description: 'Array of Movie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: {
              type: Array,
              items: getModelSchemaRef(Movie, {
                includeRelations: true,
              }),
            },
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  fetchMovie: {
    description: 'Movie model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Movie, {includeRelations: true}),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  updateMovie: {
    description: 'Movie PATCH success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Movie),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  deleteMovie: {
    description: 'Movie DELETE success, returns deleted movie id',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
