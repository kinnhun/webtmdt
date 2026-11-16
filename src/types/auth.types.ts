export type AdminJwtPayload = {
  id: string;
  username: string;
  permissions: string[];
};

export type AdminSessionUser = {
  userId: string;
  username: string;
  permissions: string[];
};

export type AdminVerifyResult =
  | { ok: true; user: AdminSessionUser }
  | { ok: false; status: number; error: string };

