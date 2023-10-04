import api from "@/api";

export class ConfirmationCodesService {
  static async create(userId: number) {
    return await api.post("/auth/create-send-code", { userId });
  }
}
