import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Roles} from '../authorization/role-keys';
import {Actor, Movie} from '../models';
import {MovieRepository} from '../repositories';

export class MovieActorController {
  constructor(
    @repository(MovieRepository) protected movieRepository: MovieRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @get('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Array of Movie has many Actor through Contract',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Actor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Actor>,
  ): Promise<Actor[]> {
    return this.movieRepository.actors(id).find(filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @post('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'create a Actor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Actor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Movie.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {
            title: 'NewActorInMovie',
            exclude: ['id'],
          }),
        },
      },
    })
    actor: Omit<Actor, 'id'>,
  ): Promise<Actor> {
    return this.movieRepository.actors(id).create(actor);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @patch('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Movie.Actor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {partial: true}),
        },
      },
    })
    actor: Partial<Actor>,
    @param.query.object('where', getWhereSchemaFor(Actor)) where?: Where<Actor>,
  ): Promise<Count> {
    return this.movieRepository.actors(id).patch(actor, where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @del('/movies/{id}/actors', {
    responses: {
      '200': {
        description: 'Movie.Actor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Actor)) where?: Where<Actor>,
  ): Promise<Count> {
    return this.movieRepository.actors(id).delete(where);
  }
}
