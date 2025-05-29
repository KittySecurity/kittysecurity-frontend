import api from "./api";

class UserService {
  async getUser() {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  async updateUser(userData: { username?: string; email?: string; master_hash?: string }) {
    if (!userData || Object.keys(userData).length === 0) {
      throw new Error("No user data provided");
    }
    try {
      const response = await api.put("/user", userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  }
}

export default new UserService;