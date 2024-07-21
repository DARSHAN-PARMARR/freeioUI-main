export interface Order {
    orderId: number;
    date: Date;
    totalAmount: number;
    paymentType: string;
    providerName: string;
    serviceName: string;
}
