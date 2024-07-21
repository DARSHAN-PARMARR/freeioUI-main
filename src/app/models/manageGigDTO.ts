import { GigImage } from "./gig-image.model";

export interface ManageGigDTO {
    id?: number;
    title: string;
    description: string;
    providerId: number| null;
    providerName?: string| null;
    images: GigImage[];
    pricing: number;
    serviceType: string;
    serviceName: string;
}