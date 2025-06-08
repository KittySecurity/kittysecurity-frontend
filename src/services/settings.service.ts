import api from "./api";

type PasswordSettings = {
    length: number;
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    special: boolean;
    minNumbers: number;
    minSpecial: number;
};

class SettingsService {
    async getSettings(){
        try{
            const response = await api.get("/settings");
            return response.data;
        }catch (error){
            console.error("Error fetching settings:", error);
            throw error;
        }
    }

    async updateSettings(settingsData: PasswordSettings) {
        if (
            !settingsData ||
            typeof settingsData.length !== "number" ||
            typeof settingsData.lowercase !== "boolean" ||
            typeof settingsData.uppercase !== "boolean" ||
            typeof settingsData.numbers !== "boolean" ||
            typeof settingsData.special !== "boolean" ||
            typeof settingsData.minNumbers !== "number" ||
            typeof settingsData.minSpecial !== "number"
        ) {
            throw new Error("Invalid settings data provided"); 
        }
        try {
            const response = await api.put("/settings", settingsData);
            return response.data;
        } catch (error) {
            console.error("Error updating settings:", error);
            throw error;
        }
    }
}

export default new SettingsService();
export type { PasswordSettings };