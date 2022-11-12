import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Movie, Review, ReviewRelations, User} from '../models';
import {MovieRepository} from './movie.repository';
import {UserRepository} from './user.repository';

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype.id,
  ReviewRelations
> {
  public readonly movie: BelongsToAccessor<Movie, typeof Review.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Review.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('MovieRepository')
    protected movieRepositoryGetter: Getter<MovieRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Review, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.movie = this.createBelongsToAccessorFor(
      'movie',
      movieRepositoryGetter,
    );
    this.registerInclusionResolver('movie', this.movie.inclusionResolver);
  }
}
