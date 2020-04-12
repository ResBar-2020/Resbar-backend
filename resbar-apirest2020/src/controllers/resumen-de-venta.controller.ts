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
import {ResumenDeVenta} from '../models';
import {ResumenDeVentaRepository} from '../repositories';

export class ResumenDeVentaController {
  constructor(
    @repository(ResumenDeVentaRepository)
    public resumenDeVentaRepository: ResumenDeVentaRepository,
  ) {}

  @post('/resumenDeVentas', {
    responses: {
      '200': {
        description: 'ResumenDeVenta model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(ResumenDeVenta)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResumenDeVenta, {
            title: 'NewResumenDeVenta',
            exclude: ['id'],
          }),
        },
      },
    })
    resumenDeVenta: Omit<ResumenDeVenta, 'id'>,
  ): Promise<ResumenDeVenta> {
    return this.resumenDeVentaRepository.create(resumenDeVenta);
  }

  @get('/resumenDeVentas/count', {
    responses: {
      '200': {
        description: 'ResumenDeVenta model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ResumenDeVenta) where?: Where<ResumenDeVenta>,
  ): Promise<Count> {
    return this.resumenDeVentaRepository.count(where);
  }

  @get('/resumenDeVentas', {
    responses: {
      '200': {
        description: 'Array of ResumenDeVenta model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ResumenDeVenta, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ResumenDeVenta) filter?: Filter<ResumenDeVenta>,
  ): Promise<ResumenDeVenta[]> {
    return this.resumenDeVentaRepository.find(filter);
  }
  //consumiendo un aggregate para resumir por productos
  @get('/ResumendeVentaProductos/{fecha1}/{fecha2}', {
    responses: {
      '200': {
        description: 'Resumen de venta Aggregate',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ResumenDeVenta}},
          },
        },
      },
    },
  })
  async ResumendeVentaProductos(
    @param.path.date('fecha1') fecha1: Date,
    @param.path.date('fecha2') fecha2: Date,
  ): Promise<ResumenDeVenta[]> {
    const orderCollection = (this.resumenDeVentaRepository.dataSource
      .connector as any).collection('ResumenDeVenta');
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
          $unwind: {
            path: '$productos',
          },
        },
        {
          $group: {
            _id: '$productos.nombre',
            Total: {
              $sum: '$productos.cantidad',
            },
          },
        },
      ])
      .get();
  }
  //fin del aggregate

  @patch('/resumenDeVentas', {
    responses: {
      '200': {
        description: 'ResumenDeVenta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResumenDeVenta, {partial: true}),
        },
      },
    })
    resumenDeVenta: ResumenDeVenta,
    @param.where(ResumenDeVenta) where?: Where<ResumenDeVenta>,
  ): Promise<Count> {
    return this.resumenDeVentaRepository.updateAll(resumenDeVenta, where);
  }

  @get('/resumenDeVentas/{id}', {
    responses: {
      '200': {
        description: 'ResumenDeVenta model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ResumenDeVenta, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ResumenDeVenta, {exclude: 'where'})
    filter?: FilterExcludingWhere<ResumenDeVenta>,
  ): Promise<ResumenDeVenta> {
    return this.resumenDeVentaRepository.findById(id, filter);
  }

  @patch('/resumenDeVentas/{id}', {
    responses: {
      '204': {
        description: 'ResumenDeVenta PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResumenDeVenta, {partial: true}),
        },
      },
    })
    resumenDeVenta: ResumenDeVenta,
  ): Promise<void> {
    await this.resumenDeVentaRepository.updateById(id, resumenDeVenta);
  }

  @put('/resumenDeVentas/{id}', {
    responses: {
      '204': {
        description: 'ResumenDeVenta PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() resumenDeVenta: ResumenDeVenta,
  ): Promise<void> {
    await this.resumenDeVentaRepository.replaceById(id, resumenDeVenta);
  }

  @del('/resumenDeVentas/{id}', {
    responses: {
      '204': {
        description: 'ResumenDeVenta DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.resumenDeVentaRepository.deleteById(id);
  }
}
