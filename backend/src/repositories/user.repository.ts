import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasOneRepositoryFactory,
} from '@loopback/repository';
import {Roles} from '../authorization/role-keys';
import {DatabaseDataSource} from '../datasources';
import {User, UserRelations, UserCredential} from '../models';
import {UserCredentialRepository} from './user-credential.repository';

export type Credentials = {
  email: string;
  password: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
  role: Roles;
  isApproved: boolean;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredential: HasOneRepositoryFactory<
    UserCredential,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('UserCredentialRepository')
    protected userCredentialRepositoryGetter: Getter<UserCredentialRepository>,
  ) {
    super(User, dataSource);
    this.userCredential = this.createHasOneRepositoryFactoryFor(
      'userCredential',
      userCredentialRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredential',
      this.userCredential.inclusionResolver,
    );
  }

  async findCredential(
    userId: typeof User.prototype.id,
  ): Promise<UserCredential | undefined> {
    try {
      return await this.userCredential(userId).get();
    } catch (error) {
      if (error.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw error;
    }
  }
}
