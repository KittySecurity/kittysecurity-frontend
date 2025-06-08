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
      const response = await api.post("/v1/password", passwordData);
      return response.data;
    } catch (error) {
      console.error("Error adding password:", error);
      throw error;
    }
  }

  async getAllPasswords() {
    try {
      const response = await api.get("v1/passwords");
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching passwords:", error);
      throw error;
    }
  }

  async deletePassword(id: number){
    try{
      const response = await api.delete(`v1/password/${id}`);
      if (response.status !== 200){
        throw Error("Somethig went wrong");
      }
    }catch (error){
      console.error("Error deleting passwords:", error);
      throw error;
    }
  }
}

export default new PasswordService();