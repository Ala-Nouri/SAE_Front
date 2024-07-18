import { Document } from "./Document";

export interface User {
  id: number;
  public_id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string []; 
  password: string;
  company_id: number;
}

