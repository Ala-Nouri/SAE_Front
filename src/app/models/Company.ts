import { User } from "./user";

export interface Company {
    company_id: number;
    company_name: string;
    admin_email: string;
    users: User[];
  }