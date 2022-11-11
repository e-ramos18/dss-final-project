import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Roles} from '../authorization/role-keys';
import {Review} from '../models';
import {ReviewRepository} from '../repositories';
import {CustomResponse} from '../types';
import {responseMessage} from '../utils/constants';
import {tryCatch} from '../utils/helper';
import {reviewResponseSchema} from './responseSchema';

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
  @response(200, reviewResponseSchema.addReview)
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
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        return this.reviewRepository.create(review);
      },
      null,
      responseMessage.addedReview,
    );
    return res;
  }

  @get('/reviews')
  @response(200, reviewResponseSchema.fetchReviews)
  async find(): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        return this.reviewRepository.find({
          include: [
            {relation: 'movie', scope: {fields: ['title']}},
            {relation: 'user', scope: {fields: ['name']}},
          ],
        });
      },
      [],
      responseMessage.fetchedReviews,
    );
    return res;
  }

  @get('/reviews/{id}')
  @response(200, reviewResponseSchema.fetchReview)
  async findById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        return this.reviewRepository.findById(id, {
          include: [
            {relation: 'movie', scope: {fields: ['title']}},
            {relation: 'user', scope: {fields: ['name']}},
          ],
        });
      },
      null,
      responseMessage.fetchedReview,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @patch('/reviews/{id}')
  @response(204, reviewResponseSchema.updateReview)
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
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        await this.reviewRepository.updateById(id, review);
        return this.reviewRepository.findById(id, {
          include: [
            {relation: 'movie', scope: {fields: ['title']}},
            {relation: 'user', scope: {fields: ['name']}},
          ],
        });
      },
      null,
      responseMessage.updatedReview,
    );
    return res;
  }
}
