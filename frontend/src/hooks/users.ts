

import api from "@/api";

export interface User {
  id: number;
  firstName: string;
  key: string;
  lastName: string;
  email: string;
  status: number;
  photo: string;
  password: string;
  repeatPassword: string;
  phone: string;
  birth: Date;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  birth: string;
  cpf: string;
  photo?: File;
  phone?: string;
}

interface TokenAccessProps {
  access_token: string;
  refresh_token: string;
}

export class UsersService {

  static async create(data: CreateUserDto): Promise<any> {
    const formData = new FormData();

    const { repeatPassword, ...props } = data;

    Object.entries(props).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return await api.post("/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async findOneByKey(key: string): Promise<User | null | undefined> {
    try {
      const { data } = await api.get(`/users/find/${key}`);
      return data;
    } catch (error) {
      return null;
    }
  }

  static async login({ email, password }: { email: string; password: string }) {
    const { data: data } = await api.post("/auth/login", {
      email,
      password,
    });

    if (!data) throw new Error("Login não autorizado!");

    if (data.status === 1) {
      window.location.href = `confirm-email/${data?.userKey}`;
    }

    return data;
  }

 /*  static async setCredentials({ access_token, refresh_token }: TokenAccessProps) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  }

  static getCredentials() {
    try {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.log(error);
    }
  } */
}
