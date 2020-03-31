import {DefaultCrudRepository} from '@loopback/repository';
import {Orden, OrdenRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrdenRepository extends DefaultCrudRepository<
  Orden,
  typeof Orden.prototype.id,
  OrdenRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Orden, dataSource);
  }
}
