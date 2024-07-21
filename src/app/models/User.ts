// user.model.ts
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password?: string; 
    role: string;
    image?: string; 
  }
  