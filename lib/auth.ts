import { headers } from "next/headers";

interface AuthentikUser {
  id: string;
  email: string | null;
  name: string;
  username: string;
}

/**
 * Obtiene el usuario autenticado desde las cabeceras inyectadas por Authentik Proxy Provider.
 * Traefik/Dokploy inyectan estas cabeceras tras una autenticación exitosa.
 */
export async function getAuthUser(): Promise<AuthentikUser | null> {
  const headersList = await headers();

  const userId = headersList.get("x-authentik-uid");
  const email = headersList.get("x-authentik-email");
  const name = headersList.get("x-authentik-name");
  const username = headersList.get("x-authentik-username");

  if (!userId || !username) {
    return null;
  }

  return {
    id: userId,
    email: email,
    name: name || username,
    username: username,
  };
}
