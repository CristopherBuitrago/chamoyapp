import type { Client, CustomerType } from "../model/types";

export const DATA: Client[] = [
  {
    id: 23,
    name: "Cristopher Buitrago",
    phone: "3212017384",
    email: "No proporcionado",
    customerType: "VIP",
    ordersAmount: 3,
  },
  {
    id: 24,
    name: "Alan Brito Delgado",
    phone: "No proporcionado",
    email: "alanbritodelgado@gmail.com",
    customerType: "VIP",
    ordersAmount: 3,
  },
  {
    id: 25,
    name: "Carmen Bolivar",
    phone: "3145678989",
    email: "carmenbolivar@gmail.com",
    customerType: "VIP",
    ordersAmount: 3,
  },
];

// --- Colores para tags ---
export const CUSTOMER_TYPE_COLOR: Record<CustomerType, string> = {
  "VIP" : "green",
  "CORRIENTE" : "purple",
};