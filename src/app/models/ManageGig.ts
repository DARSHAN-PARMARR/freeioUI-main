interface ManageGigDTO {
    id?: number;
    title: string;
    description: string;
    images: Uint8Array[];
    pricing: number;
    serviceType: string;
    serviceName: string;
  }