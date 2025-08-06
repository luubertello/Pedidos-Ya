export const permisosPorRol: Record<string, string[]> = {
  cliente: [
    'restaurant:list',
    'restaurant:findByID',
  ],
  dueño: [
    'restaurant:create',
    'restaurant:update',
    'restaurant:delete',
    'restaurant:findMy',
    'restaurant:partialUpdate'
  ],
};
