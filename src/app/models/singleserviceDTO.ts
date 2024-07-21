import { GigImage } from "./gig-image.model";

export interface singleServiceDTO{
     id?: number;
    title: string;
    description: string;
    providerId: number| null;
    providerName?: string| null;
    images:GigImages[]
    pricing: number;
    serviceType: string;
    serviceName: string;
}
export interface GigImages {
    imageData: string;
  }
  
  