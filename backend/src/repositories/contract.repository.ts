import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Contract, ContractRelations} from '../models';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.id,
  ContractRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Contract, dataSource);
  }
}
