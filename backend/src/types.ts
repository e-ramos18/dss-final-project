import {Roles} from './authorization/role-keys';

export interface RequiredRoles {
  required: Roles[];
}

export interface MyUserProfile {
  id: string;
  email: string;
  name: string;
  role: Roles;
  isApproved: boolean;
}
