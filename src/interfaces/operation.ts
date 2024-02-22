export interface IOperation {
  recordId: string;
  userId: string;
  type: string;
  operationResponse: string | number | null;
  cost: number;
}
