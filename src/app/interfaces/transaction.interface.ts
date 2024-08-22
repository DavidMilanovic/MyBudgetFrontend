export interface Transaction{
    id: number;
    description: string;
    currency: string;
    amount: number;
    accountName?: string;
    accountId?: number; 
}