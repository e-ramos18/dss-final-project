import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Roles} from '../authorization/role-keys';
import {Actor} from '../models';
import {ActorRepository} from '../repositories';

export class ActorController {
  constructor(
    @repository(ActorRepository)
    public actorRepository: ActorRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @post('/actors')
  @response(200, {
    description: 'Actor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Actor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {
            title: 'NewActor',
            exclude: ['id'],
          }),
        },
      },
    })
    actor: Omit<Actor, 'id'>,
  ): Promise<Actor> {
    return this.actorRepository.create(actor);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @get('/actors/count')
  @response(200, {
    description: 'Actor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Actor) where?: Where<Actor>): Promise<Count> {
    return this.actorRepository.count(where);
  }

  @get('/actors')
  @response(200, {
    description: 'Array of Actor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Actor, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Actor) filter?: Filter<Actor>): Promise<Actor[]> {
    return this.actorRepository.find(filter);
  }

  @get('/actors/{id}')
  @response(200, {
    description: 'Actor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Actor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Actor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Actor>,
  ): Promise<Actor> {
    return this.actorRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @patch('/actors/{id}')
  @response(204, {
    description: 'Actor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actor, {partial: true}),
        },
      },
    })
    actor: Actor,
  ): Promise<void> {
    await this.actorRepository.updateById(id, actor);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @put('/actors/{id}')
  @response(204, {
    description: 'Actor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() actor: Actor,
  ): Promise<Actor> {
    await this.actorRepository.replaceById(id, actor);
    return this.actorRepository.findById(id);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @del('/actors/{id}')
  @response(204, {
    description: 'Actor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<string> {
    await this.actorRepository.deleteById(id);
    return id;
  }
}
