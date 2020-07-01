import {Entity, model, property} from '@loopback/repository';

@model()
export class Bitacora extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  accion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCompleto: string;

  @property({
    type: 'string',
    required: true,
  })
  loggin: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;


  constructor(data?: Partial<Bitacora>) {
    super(data);
  }
}

export interface BitacoraRelations {
  // describe navigational properties here
}

export type BitacoraWithRelations = Bitacora & BitacoraRelations;
