export type CustomerType = "VIP" | "CORRIENTE";

export type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
  customerType: CustomerType;
  ordersAmount: number;
};

