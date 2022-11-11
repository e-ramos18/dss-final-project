import {getModelSchemaRef} from '@loopback/rest';
import {Movie, User} from '../models';

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
              type: 'array',
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

export const userResponseSchema = {
  register: {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(User),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  login: {
    description: 'Token',
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
  currentUser: {
    description: 'Get current user',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(User),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  addUser: {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(User),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  fetchUsers: {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: {
              type: 'array',
              items: getModelSchemaRef(User),
            },
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  fetchUser: {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(User),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  updateUser: {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(User),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  deleteMovie: {
    description: 'User DELETE success, returns deleted user id',
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
