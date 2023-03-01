export enum Role {
  SUPER_ADMIN = 'ROLE_SUPER_ADMIN',
  ADMIN = 'ROLE_ADMIN',
  INTERNAL_USER = 'ROLE_INTERNAL_USER',
  EXTERNAL_USER = 'ROLE_EXTERNAL_USER',
  SUPERVISOR = 'ROLE_SUPERVISOR',
  MANAGER = 'ROLE_MANAGER'
}
export enum UserPermissions {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete'
}

export const RolePermissions = {
  [Role.SUPER_ADMIN]: [UserPermissions.READ, UserPermissions.WRITE, UserPermissions.DELETE],
  [Role.ADMIN]: [UserPermissions.READ, UserPermissions.WRITE],
  [Role.INTERNAL_USER]: [UserPermissions.READ],
  [Role.EXTERNAL_USER]: [UserPermissions.READ],
  [Role.SUPERVISOR]: [UserPermissions.READ, UserPermissions.WRITE],
  [Role.MANAGER]: [UserPermissions.READ, UserPermissions.WRITE]
}