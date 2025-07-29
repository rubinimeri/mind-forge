declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      lastName?: string | null;
      createdAt?: Date;
      updatedAt?: Date;
    };
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    lastName?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    lastName?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
}