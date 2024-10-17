export interface LoginRequest {
  UserName: string;
  Password: string;
}

export interface LoginResponse {
  Data: string;
  Message: string;
  Success: boolean;
  IsAuthorized: boolean;
}
