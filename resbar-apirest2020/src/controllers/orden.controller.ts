import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Orden} from '../models';
import {OrdenRepository} from '../repositories';

export class OrdenController {
  constructor(
    @repository(OrdenRepository)
    public ordenRepository: OrdenRepository,
  ) {}

  @post('/ordenes', {
    responses: {
      '200': {
        description: 'Orden model instance',
        content: {'application/json': {schema: getModelSchemaRef(Orden)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orden, {
            title: 'NewOrden',
            exclude: ['id'],
          }),
        },
      },
    })
    orden: Omit<Orden, 'id'>,
  ): Promise<Orden> {
    return this.ordenRepository.create(orden);
  }

  @get('/ordenes/count', {
    responses: {
      '200': {
        description: 'Orden model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Orden) where?: Where<Orden>): Promise<Count> {
    return this.ordenRepository.count(where);
  }

  @get('/ordenes', {
    responses: {
      '200': {
        description: 'Array of Orden model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Orden, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Orden) filter?: Filter<Orden>): Promise<Orden[]> {
    return this.ordenRepository.find(filter);
  }

  @patch('/ordenes', {
    responses: {
      '200': {
        description: 'Orden PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orden, {partial: true}),
        },
      },
    })
    orden: Orden,
    @param.where(Orden) where?: Where<Orden>,
  ): Promise<Count> {
    return this.ordenRepository.updateAll(orden, where);
  }

  @get('/ordenes/{id}', {
    responses: {
      '200': {
        description: 'Orden model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Orden, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Orden, {exclude: 'where'})
    filter?: FilterExcludingWhere<Orden>,
  ): Promise<Orden> {
    return this.ordenRepository.findById(id, filter);
  }

  @patch('/ordenes/{id}', {
    responses: {
      '204': {
        description: 'Orden PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orden, {partial: true}),
        },
      },
    })
    orden: Orden,
  ): Promise<void> {
    await this.ordenRepository.updateById(id, orden);
  }

  @put('/ordenes/{id}', {
    responses: {
      '204': {
        description: 'Orden PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orden: Orden,
  ): Promise<void> {
    await this.ordenRepository.replaceById(id, orden);
  }

  @del('/ordenes/{id}', {
    responses: {
      '204': {
        description: 'Orden DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordenRepository.deleteById(id);
  }

  //NUEVOS AGREGATE
  @get('/MeseroconMasOrdenes/{fecha1}/{fecha2}', {
    responses: {
      '200': {
        description: 'Resumen de orden Aggregate',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Orden}},
          },
        },
      },
    },
  })
  async MeseroconMasOrdenes(
    @param.path.date('fecha1') fecha1: Date,
    @param.path.date('fecha2') fecha2: Date,
  ): Promise<Orden[]> {
    const orderCollection = (this.ordenRepository.dataSource
      .connector as any).collection('Orden');
    return orderCollection
      .aggregate([
        {
          $match: {
            fecha: {
              $gte: fecha1,
              $lte: fecha2,
            },
          },
        },
        {
          $group: {
            _id: '$mesero',
            Total: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            Total: -1,
          },
        },
        {
          $limit: 3,
        },
      ])
      .get();
  }
  //fin del aggregate
  //NUEVOS AGREGATE
  @get('/OrdenPromedios/{fecha1}/{fecha2}', {
    responses: {
      '200': {
        description: 'Resumen de orden Aggregate',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Orden}},
          },
        },
      },
    },
  })
  async OrdenPromedios(
    @param.path.date('fecha1') fecha1: Date,
    @param.path.date('fecha2') fecha2: Date,
  ): Promise<Orden[]> {
    const orderCollection = (this.ordenRepository.dataSource
      .connector as any).collection('Orden');
    return orderCollection
      .aggregate([
        {
          $match: {
            fecha: {
              $gte: fecha1,
              $lte: fecha2,
            },
          },
        },
        {
          $group: {
            _id: 'Datos de Ordenes',
            Promedio: {
              $avg: '$total',
            },
            Count: {
              $sum: 1,
            },
            Minimo: {
              $min: '$total',
            },
            Maximo: {
              $max: '$total',
            },
          },
        },
      ])
      .get();
  }
  //fin del aggregate
}
