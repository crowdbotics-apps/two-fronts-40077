export const getEntityFullName = entity =>
  !!entity?.first_name
    ? `${entity?.first_name} ${entity?.last_name}`
    : entity?.name

export const getEntityInitials = entity =>
  !!entity?.first_name
    ? `${entity?.first_name?.toString()?.charAt(0)}${entity?.last_name
        ?.toString()
        ?.charAt(0)}`.toUpperCase()
    : `${entity?.name?.toString()?.substring(0, 2).toUpperCase()}`
