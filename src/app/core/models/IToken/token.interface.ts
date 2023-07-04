import { Role } from "../../enums/role.enum";

export interface IToken {
  unique_name: string;
  role: Role;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
