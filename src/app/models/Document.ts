import { Property } from "./Property";
import { User } from "./user";

export interface Document {
    document_id: number;
    file_name: string;
    upload_date: Date;
    created_by: User;
    category: string,
    subcategory: string,
    properties: Property[];
    file_path: string;
    company_id: number;
    archived: Boolean;
  }