export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type SignInCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type AuthSession = {
  user: AuthUser;
};
