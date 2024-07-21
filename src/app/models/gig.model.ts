import { GigImage } from './gig-image.model';

export interface Gig {
  id?: number;
  title: string;
  description: string;
  providerId: number | null;
  providerName?: string | null;
  images: { id: number; image: string; gigId: number }[];
  pricing: number;
  serviceType: string;
  serviceName: string;
}

export interface GigLocal {
  id?: number;
  title: string;
  description: string;
  providerId: number | null;
  providerName?: string | null;
  images: string[];
  pricing: number;
  serviceType: string;
  serviceName: string;
}
export interface UpdateGigDTO {
  id?: number;
  title: string;
  description: string;
  providerId: number | null;
  providerName?: string | null;
  pricing: number;
  serviceType: string;
  serviceName: string;
}
export interface AllGigDTO {
  id: number;
  title: string;
  description: string;
  providerId: number;
  providerName: string;
  pricing: number;
  serviceType: string;
  serviceName: string;
  images: string[]; // Base64 encoded image data
  providerImage: string; // Base64 encoded provider image
}