import {DefaultCrudRepository} from '@loopback/repository';
import {ResumenDeVenta, ResumenDeVentaRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ResumenDeVentaRepository extends DefaultCrudRepository<
  ResumenDeVenta,
  typeof ResumenDeVenta.prototype.id,
  ResumenDeVentaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ResumenDeVenta, dataSource);
  }
}
