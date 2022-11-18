import {Role} from "../types/role.type";
import {TagColor} from "../types/tag-color.type";

type RoleTagColorMap = {
  [K in Role]: TagColor
}
export const roleTagColorMap: RoleTagColorMap = {
  'ADMIN': 'purple',
  'AGENT': 'blue',
  'ACCOUNT_MANAGER': 'pink',
  'EXTERNAL_REVIEWER': 'orange'
}

export function formatRole(role: Role): string {
  if (!role) return '';

  const formatted = role.toLowerCase().split('_').join(' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
