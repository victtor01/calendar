import { Register } from "./registers";

export interface Account {
  id: number;
  code: string;
  name: string;
  description: string;
  registers?: Register[];
}
