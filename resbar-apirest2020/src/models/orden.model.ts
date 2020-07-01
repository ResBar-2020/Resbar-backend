import {Entity, model, property} from '@loopback/repository';

@model()
export class Orden extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    default: '$now',
  })
  fecha?: string;

  @property({
    type: 'string',
    default: '',
  })
  mesero: string;

  @property({
    type: 'boolean',
    default: false,
  })
  domicilio: boolean;

  @property({
    type: 'number',
    default: 0,
  })
  domicilioEtapa: number;

  @property({
    type: 'string',
    default: '',
  })
  mesa: string;

  @property({
    type: 'object',
    itemType:'object',
    default: '',
  })
  cliente: object[];

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    default: '',
  })
  observacion: string;

  @property({
    type: 'date',
    default: '$now',
    required: false,
    jsonSchema: {nullable: true},
  })
  tiempoPreparacion?: string;

  @property({
    type: 'number',
    required: false,
    default: 0,
  })
  propina: number;

  @property({
    type: 'number',
    required: false,
    default: 0,
  })
  costoEnvio: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  detalleOrden: object[];

  constructor(data?: Partial<Orden>) {
    super(data);
  }
}

export interface OrdenRelations {
  // describe navigational properties here
}

export type OrdenWithRelations = Orden & OrdenRelations;
