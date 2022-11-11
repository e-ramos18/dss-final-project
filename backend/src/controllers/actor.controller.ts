import {authenticate} from '@loopback/authentication';
import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Roles} from '../authorization/role-keys';
import {Actor} from '../models';
import {ActorRepository} from '../repositories';
import {CustomResponse} from '../types';
import {responseMessage} from '../utils/constants';
import {tryCatch} from '../utils/helper';
import {actorResponseSchema} from './responseSchema';

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
  @response(200, actorResponseSchema.addActor)
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
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        return this.actorRepository.create(actor);
      },
      null,
      responseMessage.addedActor,
    );
    return res;
  }

  @get('/actors')
  @response(200, actorResponseSchema.fetchActors)
  async find(
    @param.filter(Actor) filter?: Filter<Actor>,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        return this.actorRepository.find(filter);
      },
      [],
      responseMessage.fetchedActors,
    );
    return res;
  }

  @get('/actors/{id}')
  @response(200, actorResponseSchema.fetchActor)
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Actor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Actor>,
  ): Promise<CustomResponse<{}>> {
    const res = tryCatch(
      async () => {
        return this.actorRepository.findById(id, filter);
      },
      null,
      responseMessage.fetchedActor,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @patch('/actors/{id}')
  @response(204, actorResponseSchema.updateActor)
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
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        await this.actorRepository.updateById(id, actor);
        return this.actorRepository.findById(id);
      },
      null,
      responseMessage.updatedActor,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @del('/actors/{id}')
  @response(204, actorResponseSchema.deleteActor)
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        await this.actorRepository.deleteById(id);
        return id;
      },
      null,
      responseMessage.deletedActor,
    );
    return res;
  }
}
