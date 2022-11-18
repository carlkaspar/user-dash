import {Role} from "../types/role.type";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: Role;
}
