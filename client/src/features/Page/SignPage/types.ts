export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  img: string;
  isAdmin: boolean;
  city: string;
  contact: string;
  birthDate: string;
};

export type AuthState = {
  auth: User | undefined;
  error: string | undefined;
  loading: boolean;
};

export type ProfileState = {
  profiles: User[];
  error: string | undefined;
  loading: boolean;
};

export type UserId = User['id'];

export type UserSignUp = Omit<User, 'id' | 'img'> & { rpassword: string };

export type UserSignIn = Omit<User, 'id' | 'img' | 'name'>;

export type UserSignUpp = {
  name: string;
  email: string;
  password: string;
  rpassword: string;
};

export type UserSignInn = {
  email: string;
  password: string;
};
