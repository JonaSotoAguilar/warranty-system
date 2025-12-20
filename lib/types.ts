export type WarrantyStatus = "pending" | "ready" | "completed";

export interface Warranty {
  id: string;
  clientName: string;
  invoiceNumber?: string; // Obligatorio en UI
  product: string;
  failureDescription?: string; // Nuevo campo Falla
  sku?: string;
  rut?: string;
  contact?: string; // Obligatorio en UI
  email?: string;
  locationId: string;
  location?: string; // Nombre de la ubicación (vía join)
  entryDate: string; // ISO Date string
  deliveryDate?: string; // ISO Date string (Fecha de entrega/completada)
  readyDate?: string; // ISO Date string (Fecha en que estuvo lista)
  status: WarrantyStatus;
  repairCost?: number;
  notes?: string;
  userId: string;
  locationLogs?: LocationLog[];
}

export interface LocationLog {
  id: string;
  warrantyId: string;
  fromLocationId: string;
  toLocationId: string;
  changedAt: string; // ISO Date
  fromLocation?: string; // Nombre opcional
  toLocation?: string; // Nombre opcional
}

export type NewWarrantyPayload = Omit<Warranty, "id" | "status"> & {
  status?: WarrantyStatus;
};
