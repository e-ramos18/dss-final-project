import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
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
import {CustomResponse} from '../types';
import {responseMessage} from '../utils/constants';
import {tryCatch} from '../utils/helper';
import {userResponseSchema} from './responseSchema';

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
  @response(200, userResponseSchema.register)
  async signup(@requestBody() userData: User): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
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
      },
      null,
      responseMessage.registered,
    );
    return res;
  }

  @post('/users/login')
  @response(200, userResponseSchema.login)
  async login(
    @requestBody() credentials: Credentials,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        // make sure user exist,password should be valid
        const user = await this.userService.verifyCredentials(credentials);
        const userProfile = this.userService.convertToUserProfile(user);

        return this.jwtService.generateToken(userProfile);
      },
      null,
      responseMessage.loggedin,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin, Roles.User]},
  })
  @get('/users/me')
  @response(200, userResponseSchema.currentUser)
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        return Promise.resolve(currentUser);
      },
      null,
      responseMessage.getCurrentUser,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @post('/users')
  @response(200, userResponseSchema.addUser)
  async create(@requestBody() user: User): Promise<CustomResponse<{}>> {
    const res = tryCatch(
      async () => {
        validateCredentials(_.pick(user, ['email', 'password']));
        user.password = await this.hasher.hashPassword(user.password);
        const savedUser = await this.userRepository.create(user);
        return _.omit(savedUser, ['password']);
      },
      null,
      responseMessage.addedUser,
    );
    return res;
  }

  @get('/users')
  @response(200, userResponseSchema.fetchUsers)
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        return this.userRepository.find(filter, {
          fields: ['id', 'email', 'name', 'role', 'isApproved', 'createdAt'],
        });
      },
      [],
      responseMessage.fetchedUsers,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
  })
  @get('/users/{id}')
  @response(200, userResponseSchema.fetchUser)
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<CustomResponse<{}>> {
    const res = tryCatch(
      async () => {
        return this.userRepository.findById(id, filter);
      },
      null,
      responseMessage.fetchedUser,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @patch('/users/{id}')
  @response(204, userResponseSchema.updateUser)
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
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        await this.userRepository.updateById(id, user);
        const savedUser = await this.userRepository.findById(id);
        return _.omit(savedUser, ['password']);
      },
      null,
      responseMessage.updatedUser,
    );
    return res;
  }

  @authenticate({
    strategy: 'jwt',
    options: {required: [Roles.RootAdmin, Roles.Admin]},
  })
  @del('/users/{id}')
  @response(204, userResponseSchema)
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    const res = await tryCatch(
      async () => {
        await this.userRepository.deleteById(id);
        return id;
      },
      null,
      responseMessage.deletedUser,
    );
    return res;
  }
}
