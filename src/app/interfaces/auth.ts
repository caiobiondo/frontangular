export interface Auth {
  first_name: string,
  last_name?: string,
  email: string,
  username: string,
  password1: string,
  password2: string,
}

export interface Login {
  email: string,
  username: string,
  password: string,
}

export interface ChangePassword {
  new_password1: string,
  new_password2: string,
}

export interface ResetPassword {
  new_password1: string,
  new_password2: string,
  uid: string,
  token: string,
}

export interface RestUser {
  pk: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
}

export interface Token {
  username: string,
  password: string,
}

export interface RefreshToken {
  refresh: string,
  access: string,
}

export interface ValidateToken {
  uid: string,
  token: string,
}
