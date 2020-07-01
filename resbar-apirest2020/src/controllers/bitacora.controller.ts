import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Bitacora} from '../models';
import {BitacoraRepository} from '../repositories';

export class BitacoraController {
  constructor(
    @repository(BitacoraRepository)
    public bitacoraRepository : BitacoraRepository,
  ) {}

  @post('/bitacoras', {
    responses: {
      '200': {
        description: 'Bitacora model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bitacora)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bitacora, {
            title: 'NewBitacora',
            exclude: ['id'],
          }),
        },
      },
    })
    bitacora: Omit<Bitacora, 'id'>,
  ): Promise<Bitacora> {
    return this.bitacoraRepository.create(bitacora);
  }

  @get('/bitacoras/count', {
    responses: {
      '200': {
        description: 'Bitacora model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Bitacora) where?: Where<Bitacora>,
  ): Promise<Count> {
    return this.bitacoraRepository.count(where);
  }

  @get('/bitacoras', {
    responses: {
      '200': {
        description: 'Array of Bitacora model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Bitacora, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Bitacora) filter?: Filter<Bitacora>,
  ): Promise<Bitacora[]> {
    return this.bitacoraRepository.find(filter);
  }

  @patch('/bitacoras', {
    responses: {
      '200': {
        description: 'Bitacora PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bitacora, {partial: true}),
        },
      },
    })
    bitacora: Bitacora,
    @param.where(Bitacora) where?: Where<Bitacora>,
  ): Promise<Count> {
    return this.bitacoraRepository.updateAll(bitacora, where);
  }

  @get('/bitacoras/{id}', {
    responses: {
      '200': {
        description: 'Bitacora model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Bitacora, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bitacora, {exclude: 'where'}) filter?: FilterExcludingWhere<Bitacora>
  ): Promise<Bitacora> {
    return this.bitacoraRepository.findById(id, filter);
  }

  @patch('/bitacoras/{id}', {
    responses: {
      '204': {
        description: 'Bitacora PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bitacora, {partial: true}),
        },
      },
    })
    bitacora: Bitacora,
  ): Promise<void> {
    await this.bitacoraRepository.updateById(id, bitacora);
  }

  @put('/bitacoras/{id}', {
    responses: {
      '204': {
        description: 'Bitacora PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bitacora: Bitacora,
  ): Promise<void> {
    await this.bitacoraRepository.replaceById(id, bitacora);
  }

  @del('/bitacoras/{id}', {
    responses: {
      '204': {
        description: 'Bitacora DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bitacoraRepository.deleteById(id);
  }
}
