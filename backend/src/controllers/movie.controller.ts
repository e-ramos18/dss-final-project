import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
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
import {Movie} from '../models';
import {
  ContractRepository,
  MovieRepository,
  ReviewRepository,
} from '../repositories';
import {CustomResponse} from '../types';
import {responseMessage} from '../utils/constants';
import {arrayNotEmpty, isNotEmpty, tryCatch} from '../utils/helper';
import {movieResponseSchema} from './responseSchema';

export class MovieController {
  constructor(
    @repository(MovieRepository)
    public movieRepository: MovieRepository,

    @repository(ContractRepository)
    public contractRepository: ContractRepository,

    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @post('/movies')
  @response(200, movieResponseSchema.addMovie)
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {
            title: 'NewMovie',
            exclude: ['id'],
          }),
        },
      },
    })
    movie: Omit<Movie, 'id'>,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        isNotEmpty(movie.title, 'title');
        isNotEmpty(movie.description, 'description');
        isNotEmpty(movie.cost, 'cost');
        arrayNotEmpty(movie.actorsIds, 'actors');
        const newMovie = await this.movieRepository.create(movie);
        if (movie.actorsIds && movie.actorsIds.length > 0) {
          await this.contractRepository.createAll([
            ...movie.actorsIds.map((actorId: string) => ({
              actorId,
              movieId: newMovie.id,
            })),
          ]);
        }
        return newMovie;
      },
      null,
      responseMessage.addedMovie,
    );

    return res;
  }

  @get('/movies')
  @response(200, movieResponseSchema.fetchMovies)
  async find(): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        return this.movieRepository.find({
          include: ['reviews'],
        });
      },
      [],
      responseMessage.fetchedMovies,
    );

    return res;
  }

  @get('/movies/{id}')
  @response(200, movieResponseSchema.fetchMovie)
  async findById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    const res = tryCatch(
      async () => {
        const movie = await this.movieRepository.findById(id, {
          include: [
            {
              relation: 'actors',
            },
            {
              relation: 'reviews',
              scope: {
                include: [
                  {
                    relation: 'user',
                    scope: {
                      fields: {
                        password: false,
                      },
                    },
                  },
                ],
              },
            },
          ],
        });
        let sum = 0;
        let averageRating = 0;
        if (movie.reviews?.length) {
          sum = movie.reviews.reduce(
            (partialSum, review) => partialSum + review.rating,
            0,
          );
          averageRating = sum / movie.reviews.length || 0;
        }

        return {
          ...movie,
          averageRating,
        };
      },
      null,
      responseMessage.fetchedMovie,
    );

    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @patch('/movies/{id}')
  @response(204, movieResponseSchema.updateMovie)
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movie, {partial: true}),
        },
      },
    })
    movie: Movie,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        await this.movieRepository.updateById(id, movie);
        const updatedMovie = await this.movieRepository.findById(id, {
          include: [{relation: 'reviews'}],
        });
        return updatedMovie;
      },
      null,
      responseMessage.updatedMovie,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @del('/movies/{id}')
  @response(204, movieResponseSchema.deleteMovie)
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        const toDeleteMovie = await this.movieRepository.findById(id);
        const thisYear = new Date().getFullYear();
        if (thisYear - parseInt(toDeleteMovie.year) < 1)
          throw new Error('Movies less than a year cannot be deleted.');
        await this.movieRepository.deleteById(id);
        await this.contractRepository.deleteAll({movieId: id});
        await this.reviewRepository.deleteAll({movieId: id});
        return id;
      },
      null,
      responseMessage.deletedMovie,
    );
    return res;
  }

  @get('/movies/{key}/search')
  @response(200, movieResponseSchema.fetchMovies)
  async searchByTitle(
    @param.path.string('key') key: string,
  ): Promise<CustomResponse<{}>> {
    const res = tryCatch(
      async () => {
        const searchParams = [{title: {like: key || '', options: 'i'}}];
        const objFilter = {
          where: {or: searchParams},
          order: ['title ASC'],
          include: ['reviews'],
        };

        return this.movieRepository.find(objFilter);
      },
      [],
      responseMessage.searchedMovies,
    );
    return res;
  }
}
