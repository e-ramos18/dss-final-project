import {getModelSchemaRef} from '@loopback/rest';
import {Actor, Movie, Review, User} from '../models';

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

export const actorResponseSchema = {
  addActor: {
    description: 'Actor model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Actor),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  fetchActors: {
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
              items: getModelSchemaRef(Actor, {
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
  fetchActor: {
    description: 'Actor model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Actor, {includeRelations: true}),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  updateActor: {
    description: 'Actor PATCH success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Actor),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  deleteActor: {
    description: 'Actor DELETE success, returns deleted actor id',
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

export const reviewResponseSchema = {
  addReview: {
    description: 'Review model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Review, {includeRelations: true}),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  fetchReviews: {
    description: 'Array of Review model instances',
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
              items: getModelSchemaRef(Review, {
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
  fetchReview: {
    description: 'Review model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Review, {includeRelations: true}),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  updateReview: {
    description: 'Review PATCH success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Review, {includeRelations: true}),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
