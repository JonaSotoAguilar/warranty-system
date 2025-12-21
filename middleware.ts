import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Con Authentik Proxy Provider, las cabeceras se inyectan en la petición.
  // Verificamos el ID de usuario para asegurar que la petición viene autenticada por el proxy.
  const userId = request.headers.get("x-authentik-uid");

  // Si no hay ID de usuario y no es una ruta de archivos estáticos o favicon,
  // devolvemos 401 Unauthorized ya que Authentik Proxy debería haber manejado el login.
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (svg, png, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
