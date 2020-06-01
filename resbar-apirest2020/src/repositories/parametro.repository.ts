import {DefaultCrudRepository} from '@loopback/repository';
import {Parametro, ParametroRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ParametroRepository extends DefaultCrudRepository<
  Parametro,
  typeof Parametro.prototype.id,
  ParametroRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Parametro, dataSource);
  }
}
