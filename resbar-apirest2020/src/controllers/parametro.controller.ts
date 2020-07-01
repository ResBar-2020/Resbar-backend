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
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Parametro} from '../models';
import {ParametroRepository} from '../repositories';

export class ParametroController {
  constructor(
    @repository(ParametroRepository)
    public parametroRepository : ParametroRepository,
  ) {}

  @post('/parametros', {
    responses: {
      '200': {
        description: 'Parametro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parametro)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {
            title: 'NewParametro',
            
          }),
        },
      },
    })
    parametro: Parametro,
  ): Promise<Parametro> {
    return this.parametroRepository.create(parametro);
  }

  @get('/parametros/count', {
    responses: {
      '200': {
        description: 'Parametro model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Parametro) where?: Where<Parametro>,
  ): Promise<Count> {
    return this.parametroRepository.count(where);
  }

  @get('/parametros', {
    responses: {
      '200': {
        description: 'Array of Parametro model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Parametro, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Parametro) filter?: Filter<Parametro>,
  ): Promise<Parametro[]> {
    return this.parametroRepository.find(filter);
  }

  @patch('/parametros', {
    responses: {
      '200': {
        description: 'Parametro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {partial: true}),
        },
      },
    })
    parametro: Parametro,
    @param.where(Parametro) where?: Where<Parametro>,
  ): Promise<Count> {
    return this.parametroRepository.updateAll(parametro, where);
  }

  @get('/parametros/{id}', {
    responses: {
      '200': {
        description: 'Parametro model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parametro, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Parametro, {exclude: 'where'}) filter?: FilterExcludingWhere<Parametro>
  ): Promise<Parametro> {
    return this.parametroRepository.findById(id, filter);
  }

  @patch('/parametros/{id}', {
    responses: {
      '204': {
        description: 'Parametro PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parametro, {partial: true}),
        },
      },
    })
    parametro: Parametro,
  ): Promise<void> {
    await this.parametroRepository.updateById(id, parametro);
  }

  @put('/parametros/{id}', {
    responses: {
      '204': {
        description: 'Parametro PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parametro: Parametro,
  ): Promise<void> {
    await this.parametroRepository.replaceById(id, parametro);
  }

  @del('/parametros/{id}', {
    responses: {
      '204': {
        description: 'Parametro DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parametroRepository.deleteById(id);
  }
}
