

import api from "@/api";
import { User } from "@/types/user";

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
}
