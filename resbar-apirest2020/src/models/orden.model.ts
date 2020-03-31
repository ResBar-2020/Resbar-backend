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
    type: 'string',
    default: '',
  })
  mesa: string;

  @property({
    type: 'string',
    default: '',
  })
  cliente: string;

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
