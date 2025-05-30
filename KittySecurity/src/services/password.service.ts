import api from "./api";

class PasswordService {
  async addPassword(passwordData: { name: string; url: string; login: string; encrypted: string; IV: string }) {
    if (
      !passwordData ||
      !passwordData.name ||
      !passwordData.url ||
      !passwordData.login ||
      !passwordData.encrypted ||
      !passwordData.IV
    ) {
      throw new Error("Invalid password data provided");
    }
    try {
      const response = await api.post("/passwords", passwordData);
      return response.data;
    } catch (error) {
      console.error("Error adding password:", error);
      throw error;
    }
  }

  async getAllPasswords() {
    try {
      const response = await api.get("/passwords");
      return response.data;
    } catch (error) {
      console.error("Error fetching passwords:", error);
      throw error;
    }
  }
}

export default new PasswordService();