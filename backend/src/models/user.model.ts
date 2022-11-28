import {Entity, model, property, hasOne} from '@loopback/repository';
import {UserCredential} from './user-credential.model';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: Boolean,
    default: false,
  })
  isApproved?: boolean;

  @property({
    type: 'string',
    defaultFn: 'now',
  })
  createdAt?: string;

  @hasOne(() => UserCredential)
  userCredential: UserCredential;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User;
