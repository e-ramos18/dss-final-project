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
import {Movie} from '../models';
import {MovieRepository} from '../repositories';

export class MovieController {
  constructor(
    @repository(MovieRepository)
    public movieRepository: MovieRepository,
  ) {}

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @post('/movies')
  @response(200, {
    description: 'Movie model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movie)}},
  })
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
  ): Promise<Movie> {
    return this.movieRepository.create(movie);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @get('/movies/count')
  @response(200, {
    description: 'Movie model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Movie) where?: Where<Movie>): Promise<Count> {
    return this.movieRepository.count(where);
  }

  @get('/movies')
  @response(200, {
    description: 'Array of Movie model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movie, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Movie[]> {
    return this.movieRepository.find({
      include: ['reviews'],
    });
  }

  @get('/movies/{id}')
  @response(200, {
    description: 'Movie model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movie, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Movie> {
    return this.movieRepository.findById(id, {
      include: ['reviews'],
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @patch('/movies/{id}')
  @response(204, {
    description: 'Movie PATCH success',
  })
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
  ): Promise<void> {
    await this.movieRepository.updateById(id, movie);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @put('/movies/{id}')
  @response(204, {
    description: 'Movie PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() movie: Movie,
  ): Promise<Movie> {
    await this.movieRepository.replaceById(id, movie);
    return this.movieRepository.findById(id);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @del('/movies/{id}')
  @response(204, {
    description: 'Movie DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<string> {
    await this.movieRepository.deleteById(id);
    return id;
  }
}
