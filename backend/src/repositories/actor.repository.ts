import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Actor, ActorRelations} from '../models';

export class ActorRepository extends DefaultCrudRepository<
  Actor,
  typeof Actor.prototype.id,
  ActorRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Actor, dataSource);
  }
}
