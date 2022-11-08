import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Movie} from './movie.model';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Review extends Entity {
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
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @property({
    type: 'boolean',
    default: false,
  })
  isApproved?: boolean;

  @property({
    type: 'string',
    defaultFn: 'now',
  })
  createdAt: string;

  @belongsTo(() => Movie, {name: 'movie'})
  movieId: string;

  @belongsTo(() => User, {name: 'user'})
  userId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // describe navigational properties here
}

export type ReviewWithRelations = Review;
