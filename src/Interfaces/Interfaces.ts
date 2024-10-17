export interface LoginRequest {
  UserName: string;
  Password: string;
}

export interface AuthResponse {
  Data: string;
  Message: string;
  Success: boolean;
  IsAuthorized: boolean;
}

export interface RegisterRequest {
  Name: string;
  UserName: string;
  Password: string;
}
export interface Student {
  ID: number;
  Name: string;
  Mobile: string;
  Email: string;
  NationalID: string;
  Age: number;
}
export interface StudentResponse {
  Data: Student[];
  Message: string;
  Success: boolean;
  IsAuthorized: boolean;
}
