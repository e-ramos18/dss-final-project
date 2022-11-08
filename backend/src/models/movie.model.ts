import {Entity, hasMany, model, property} from '@loopback/repository';
import {Actor} from './actor.model';
import {Contract} from './contract.model';
import {Review} from './review.model';

@model({settings: {strict: false}})
export class Movie extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  cost: string;

  @property({
    type: 'string',
    required: true,
  })
  imageUrl: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  actorsIds: string[];

  @property({
    type: 'string',
    required: true,
  })
  year: string;
  @property({
    type: 'string',
    defaultFn: 'now',
  })
  createdAt?: string;

  @hasMany(() => Review, {keyTo: 'movieId'})
  reviews: Review[];

  @hasMany(() => Actor, {through: {model: () => Contract}})
  actors: Actor[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Movie>) {
    super(data);
  }
}

export interface MovieRelations {
  // describe navigational properties here
}

export type MovieWithRelations = Movie;
