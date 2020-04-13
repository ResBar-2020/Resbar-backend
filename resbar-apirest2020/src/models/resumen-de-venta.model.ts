import {Entity, model, property} from '@loopback/repository';

@model()
export class ResumenDeVenta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
    jsonSchema: {
      format: 'date',
    },
  })
  fecha?: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  productos: object[];

  constructor(data?: Partial<ResumenDeVenta>) {
    super(data);
  }
}

export interface ResumenDeVentaRelations {
  // describe navigational properties here
}

export type ResumenDeVentaWithRelations = ResumenDeVenta &
  ResumenDeVentaRelations;
