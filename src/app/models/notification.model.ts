export interface Notification {
    id: number;
    message: string;
    isRead: boolean;
    createdAt: Date;
    userId: number;
    userName?: string; // Optional property to include the user's name if needed
  }
  