import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import _ from 'lodash';
import {Roles} from '../authorization/role-keys';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../keys';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {validateCredentials} from '../services';
import {BcryptHasher} from '../services/hash.password';
import {JWTService} from '../services/jwt-service';
import {MyUserService} from '../services/user-service';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    // @inject('service.hasher')
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

    // @inject('service.user.service')
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,

    // @inject('service.jwt.service')
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

  @post('/users/signup')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async signup(@requestBody() userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']));
    userData.password = await this.hasher.hashPassword(userData.password);
    try {
      const savedUser = await this.userRepository.create(userData);
      return _.omit(savedUser, ['password']);
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpErrors.Conflict('Email is already taken.');
      }
      throw error;
    }
  }

  @post('/users/login')
  @response(200, {
    description: 'Token',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody() credentials: Credentials,
  ): Promise<{token: string}> {
    // make sure user exist,password should be valid
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);

    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({token: token});
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @get('/users/me')
  @response(200, {
    description: 'The current user profile',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    return Promise.resolve(currentUser);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(@requestBody() user: User) {
    validateCredentials(_.pick(user, ['email', 'password']));
    user.password = await this.hasher.hashPassword(user.password);
    const savedUser = await this.userRepository.create(user);
    return _.omit(savedUser, ['password']);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter, {
      fields: ['id', 'email', 'name', 'role', 'isApproved', 'createdAt'],
    });
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ) {
    await this.userRepository.updateById(id, user);
    const savedUser = await this.userRepository.findById(id);
    return _.omit(savedUser, ['password']);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<string> {
    await this.userRepository.deleteById(id);
    return id;
  }
}
