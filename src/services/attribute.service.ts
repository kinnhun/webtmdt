import httpClient from "@/lib/http/client";

// ── Types ─────────────────────────────────────────────────────────
export type AttributeType = "category" | "material" | "moq" | "color" | "style";

export interface ProductAttributeDTO {
  _id: string;
  key: string;
  type: AttributeType;
  nameUS: string;
  nameUK?: string;
  nameVI?: string;
  collection: string | null;
  colorHex: string | null;
  order: number;
  count: number;
}

export interface CreateAttributePayload {
  type: AttributeType;
  nameUS: string;
  nameUK?: string;
  nameVI?: string;
  collection?: string;
  colorHex?: string;
}

export interface UpdateAttributePayload {
  nameUS?: string;
  nameUK?: string;
  nameVI?: string;
  collection?: string;
  colorHex?: string;
}

// ── API calls ─────────────────────────────────────────────────────

export async function getAttributes(type?: AttributeType): Promise<ProductAttributeDTO[]> {
  const params: Record<string, string> = {};
  if (type) params.type = type;
  const { data } = await httpClient.get<ProductAttributeDTO[]>("/products/attributes", { params });
  return data;
}

export async function createAttribute(payload: CreateAttributePayload): Promise<ProductAttributeDTO> {
  const { data } = await httpClient.post<ProductAttributeDTO>("/products/attributes", payload);
  return data;
}

export async function updateAttribute(id: string, payload: UpdateAttributePayload): Promise<ProductAttributeDTO> {
  const { data } = await httpClient.put<ProductAttributeDTO>(`/products/attributes/${id}`, payload);
  return data;
}

export async function deleteAttribute(id: string): Promise<void> {
  await httpClient.delete(`/products/attributes/${id}`);
}

export async function seedAttributes(): Promise<{ message: string; upserted: number; matched: number; total: number }> {
  const { data } = await httpClient.post("/products/attributes/seed");
  return data;
}
