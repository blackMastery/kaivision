export interface BusinessApplication {
  id: string;
  business_name: string;
  industry: string;
  email: string;
  phone_number: string | null;
  current_situation: string;
  goal: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessApplicationInsert {
  business_name: string;
  industry: string;
  email: string;
  phone_number?: string | null;
  current_situation: string;
  goal: string;
}
