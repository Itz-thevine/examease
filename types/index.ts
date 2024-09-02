import { ImageSourcePropType } from "react-native";

export interface Address {
    id: string;
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    isDefault: boolean;
}
 

export interface Section {
    assemblyGroupNodeId: number;
    assemblyGroupName: string;
  }

export interface DynamicObject{
    [key : string] : any;
}

export type CarPart = {
    Description: string;
    genericArticleId: number;
    legacyArticleId: number;
    linkageTargetTypes: string[];
    brand_id: number;
    mfrName: string;
    'Manufacturer Part Number': string;
    mfrId: number;
    EAN: string | null;
    images: {
      small: string | null;
      medium: string | null;
      big: string | null;
    };
    articleCriteria: DynamicObject[];
  };
  

export interface InventoryItem {
    id: string;
    brand: string;
    name: string;
    price: string;
    status: string;
    stock: number;
    image: ImageSourcePropType
  }
export interface productsItem {
    id: string;
    brand: string;
    name: string;
    price: string;
    status: string;
    stock: number;
    image: ImageSourcePropType,
    brandImage: ImageSourcePropType,
  }