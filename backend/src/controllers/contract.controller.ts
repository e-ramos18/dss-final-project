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
import {Contract} from '../models';
import {ContractRepository} from '../repositories';

export class ContractController {
  constructor(
    @repository(ContractRepository)
    public contractRepository: ContractRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @post('/contracts')
  @response(200, {
    description: 'Contract model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contract)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {
            title: 'NewContract',
            exclude: ['id'],
          }),
        },
      },
    })
    contract: Omit<Contract, 'id'>,
  ): Promise<Contract> {
    return this.contractRepository.create(contract);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @get('/contracts/count')
  @response(200, {
    description: 'Contract model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Contract) where?: Where<Contract>): Promise<Count> {
    return this.contractRepository.count(where);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @get('/contracts')
  @response(200, {
    description: 'Array of Contract model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contract, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contract) filter?: Filter<Contract>,
  ): Promise<Contract[]> {
    return this.contractRepository.find(filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @get('/contracts/{id}')
  @response(200, {
    description: 'Contract model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contract, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contract, {exclude: 'where'})
    filter?: FilterExcludingWhere<Contract>,
  ): Promise<Contract> {
    return this.contractRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @patch('/contracts/{id}')
  @response(204, {
    description: 'Contract PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contract, {partial: true}),
        },
      },
    })
    contract: Contract,
  ): Promise<void> {
    await this.contractRepository.updateById(id, contract);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @put('/contracts/{id}')
  @response(204, {
    description: 'Contract PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contract: Contract,
  ): Promise<void> {
    await this.contractRepository.replaceById(id, contract);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @del('/contracts/{id}')
  @response(204, {
    description: 'Contract DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contractRepository.deleteById(id);
  }
}
