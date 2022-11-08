import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, repository, Where} from '@loopback/repository';
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
import {Review} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.User]},
  })
  @post('/reviews')
  @response(200, {
    description: 'Review model instance',
    content: {'application/json': {schema: getModelSchemaRef(Review)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {
            title: 'NewReview',
            exclude: ['id'],
          }),
        },
      },
    })
    review: Omit<Review, 'id'>,
  ): Promise<Review> {
    return this.reviewRepository.create(review);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @get('/reviews/count')
  @response(200, {
    description: 'Review model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Review) where?: Where<Review>): Promise<Count> {
    return this.reviewRepository.count(where);
  }

  @get('/reviews')
  @response(200, {
    description: 'Array of Review model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Review, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Review[]> {
    return this.reviewRepository.find({
      include: [
        {relation: 'movie', scope: {fields: ['title']}},
        {relation: 'user', scope: {fields: ['name']}},
      ],
    });
  }

  @get('/reviews/{id}')
  @response(200, {
    description: 'Review model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Review, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Review> {
    return this.reviewRepository.findById(id, {
      include: [
        {relation: 'movie', scope: {fields: ['title']}},
        {relation: 'user', scope: {fields: ['name']}},
      ],
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @patch('/reviews/{id}')
  @response(204, {
    description: 'Review PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {partial: true}),
        },
      },
    })
    review: Review,
  ): Promise<Review> {
    await this.reviewRepository.updateById(id, review);
    return this.reviewRepository.findById(id, {
      include: [
        {relation: 'movie', scope: {fields: ['title']}},
        {relation: 'user', scope: {fields: ['name']}},
      ],
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @put('/reviews/{id}')
  @response(204, {
    description: 'Review PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() review: Review,
  ): Promise<void> {
    await this.reviewRepository.replaceById(id, review);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @del('/reviews/{id}')
  @response(204, {
    description: 'Review DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reviewRepository.deleteById(id);
  }
}
