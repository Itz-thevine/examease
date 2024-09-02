import { Ionicons } from "@expo/vector-icons";

export type Brand = {
    id: string;
    name: string;
    icon?: keyof typeof Ionicons.glyphMap;
    image?: string
  };