import { prisma } from "@/lib/prisma";
import { Warranty, WarrantyStatus } from "./types";

// Helper to convert Prisma result to Warranty type (Dates to strings)
function mapToWarranty(item: any): Warranty {
  return {
    ...item,
    entryDate: item.entryDate.toISOString(),
    deliveryDate: item.deliveryDate
      ? item.deliveryDate.toISOString()
      : undefined,
    readyDate: item.readyDate ? item.readyDate.toISOString() : undefined,
    status: item.status as WarrantyStatus,
  };
}

export async function getWarranties(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: WarrantyStatus[];
}): Promise<{ data: Warranty[]; total: number; page: number; limit: number }> {
  const page = params?.page || 1;
  const limit = params?.limit || 20;
  const skip = (page - 1) * limit;

  // Construir filtros
  const where: any = {};

  if (params?.status && params.status.length > 0) {
    where.status = { in: params.status };
  }

  // Nota: La búsqueda difusa en Prisma SQLite es limitada, pero intentaremos algo básico.
  // Para search real, normalmente se usa un índice FullText o similar.
  if (params?.search) {
    const search = params.search;
    // Búsqueda simple OR en varios campos
    where.OR = [
      { clientName: { contains: search } },
      { product: { contains: search } },
      // invoiceNumber es Int, no podemos hacer contains directo con string a menos que sea exacto o convirtamos.
      // Para simplificar, buscamos si es un número válido
    ];

    const searchNum = Number(search);
    if (!Number.isNaN(searchNum)) {
      where.OR.push({ invoiceNumber: { equals: searchNum } });
    }
  }

  const [items, total] = await Promise.all([
    prisma.warranty.findMany({
      where,
      skip,
      take: limit,
      orderBy: { entryDate: "desc" },
    }),
    prisma.warranty.count({ where }),
  ]);

  return {
    data: items.map(mapToWarranty),
    total,
    page,
    limit,
  };
}

export async function saveWarranty(warranty: Warranty): Promise<void> {
  await prisma.warranty.create({
    data: {
      id: warranty.id,
      invoiceNumber: warranty.invoiceNumber,
      clientName: warranty.clientName,
      rut: warranty.rut,
      contact: warranty.contact,
      email: warranty.email,
      product: warranty.product,
      failureDescription: warranty.failureDescription,
      sku: warranty.sku,
      location: warranty.location,
      entryDate: new Date(warranty.entryDate),
      deliveryDate: warranty.deliveryDate
        ? new Date(warranty.deliveryDate)
        : null,
      readyDate: warranty.readyDate ? new Date(warranty.readyDate) : null,
      status: warranty.status,
      repairCost: warranty.repairCost,
      notes: warranty.notes,
    },
  });
}

export async function updateWarranty(updatedWarranty: Warranty): Promise<void> {
  await prisma.warranty.update({
    where: { id: updatedWarranty.id },
    data: {
      invoiceNumber: updatedWarranty.invoiceNumber,
      clientName: updatedWarranty.clientName,
      rut: updatedWarranty.rut,
      contact: updatedWarranty.contact,
      email: updatedWarranty.email,
      product: updatedWarranty.product,
      failureDescription: updatedWarranty.failureDescription,
      sku: updatedWarranty.sku,
      location: updatedWarranty.location,
      // entryDate usually doesn't change, but we map it anyway
      entryDate: new Date(updatedWarranty.entryDate),
      deliveryDate: updatedWarranty.deliveryDate
        ? new Date(updatedWarranty.deliveryDate)
        : null,
      readyDate: updatedWarranty.readyDate
        ? new Date(updatedWarranty.readyDate)
        : null,
      status: updatedWarranty.status,
      repairCost: updatedWarranty.repairCost,
      notes: updatedWarranty.notes,
    },
  });
}

export async function deleteWarranty(id: string): Promise<void> {
  await prisma.warranty.delete({
    where: { id },
  });
}
