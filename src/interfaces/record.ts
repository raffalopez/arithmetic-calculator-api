export interface IRecord {
  operationId?: string;
  userId: string;
  amount: number;
  userBalance: number;
  operationResponse?: number;
  date?: Date;
}
