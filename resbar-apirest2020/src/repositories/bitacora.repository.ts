import {DefaultCrudRepository} from '@loopback/repository';
import {Bitacora, BitacoraRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BitacoraRepository extends DefaultCrudRepository<
  Bitacora,
  typeof Bitacora.prototype.id,
  BitacoraRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Bitacora, dataSource);
  }
}
