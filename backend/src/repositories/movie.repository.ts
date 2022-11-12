import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
  HasManyThroughRepositoryFactory,
} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Movie, MovieRelations, Review, Actor, Contract} from '../models';
import {ReviewRepository} from './review.repository';
import {ContractRepository} from './contract.repository';
import {ActorRepository} from './actor.repository';

export class MovieRepository extends DefaultCrudRepository<
  Movie,
  typeof Movie.prototype.id,
  MovieRelations
> {
  public readonly reviews: HasManyRepositoryFactory<
    Review,
    typeof Movie.prototype.id
  >;

  public readonly actors: HasManyThroughRepositoryFactory<
    Actor,
    typeof Actor.prototype.id,
    Contract,
    typeof Movie.prototype.id
  >;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
    @repository.getter('ReviewRepository')
    protected reviewRepositoryGetter: Getter<ReviewRepository>,
    @repository.getter('ContractRepository')
    protected contractRepositoryGetter: Getter<ContractRepository>,
    @repository.getter('ActorRepository')
    protected actorRepositoryGetter: Getter<ActorRepository>,
  ) {
    super(Movie, dataSource);
    this.actors = this.createHasManyThroughRepositoryFactoryFor(
      'actors',
      actorRepositoryGetter,
      contractRepositoryGetter,
    );
    this.registerInclusionResolver('actors', this.actors.inclusionResolver);
    this.reviews = this.createHasManyRepositoryFactoryFor(
      'reviews',
      reviewRepositoryGetter,
    );
    this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
  }
}
