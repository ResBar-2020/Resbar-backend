import {Entity, model, property} from '@loopback/repository';

@model()
export class Parametro extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  valor: string;


  constructor(data?: Partial<Parametro>) {
    super(data);
  }
}

export interface ParametroRelations {
  // describe navigational properties here
}

export type ParametroWithRelations = Parametro & ParametroRelations;
