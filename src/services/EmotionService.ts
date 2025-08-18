import api from "@/api/axiosInstance";
import { message } from "antd";



export interface IEmotion {
  id?: string;
  date_create?: string;
  emotional: "motivated" | "neutral" | "anxious" | "sad" | "angry";
  energy: "high" | "medium" | "low";
  focus: "clear" | "confused" | "blocked";
  events: string;
  action: string;
  anchor: string;
  tookMedicine: boolean;
  dopamineCount: number;
  read: boolean;
  argued: boolean;
  wentOutside: boolean;
  weather: "cold" | "hot" | "cloudy" | "rainy";
}


export class CEmotion {
   async getAll() {
    const response = await api.get<IEmotion[]>("/api/emotion");
    return response.data;
  }
   async created( dados : IEmotion) {
    const response = await api.post("/api/emotion", dados);
    return response.data;
  }
   async update(dados : IEmotion) {
     if (dados.id) {
      message.error("informar id para confirmar atualização do item");
    }
    const response = await api.put("/api/emotion", dados);
    return response.data;
  }
   async delete(id : string) {
   
    const response = await api.delete(`/api/emotion/${id}`);
    return response.data;
  }
}