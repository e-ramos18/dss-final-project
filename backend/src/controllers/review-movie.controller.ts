import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Roles} from '../authorization/role-keys';
import {Movie, Review} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewMovieController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @get('/reviews/{id}/movie', {
    responses: {
      '200': {
        description: 'Movie belonging to Review',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Movie)},
          },
        },
      },
    },
  })
  async getMovie(
    @param.path.string('id') id: typeof Review.prototype.id,
  ): Promise<Movie> {
    return this.reviewRepository.movie(id);
  }
}
