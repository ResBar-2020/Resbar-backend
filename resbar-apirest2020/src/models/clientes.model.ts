import {Entity, model, property} from '@loopback/repository';

@model()
export class Clientes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCompleto: string;

  @property({
    type: 'string',
  })
  telefonoCasa: string;

  @property({
    type: 'string',
  })
  celular: string;

  @property({
    type: 'string',
  })
  whatsapp?: string;

  @property({
    type: 'string',
  })
  direccion: string;

  @property({
    type: 'string',
  })
  municipio: string;

  @property({
    type: 'string',
  })
  departamento: string;

  @property({
    type: 'string',
  })
  puntoDeReferencia: string;

  @property({
    type: 'string',
  })
  observaciones?: string;

  @property({
    type: 'date',
  })
  fechaRegistro: string;

  @property({
    type: 'string',
  })
  coordenadas?: string;


  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  // describe navigational properties here
}

export type ClientesWithRelations = Clientes & ClientesRelations;
