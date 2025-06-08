export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  username: string;
  email: string;
  roles: string[];
}

export interface Tenant extends BaseEntity {
  name: string;
  domain: string;
  status: 'active' | 'inactive' | 'suspended';
}
