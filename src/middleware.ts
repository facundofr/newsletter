import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Admin, API, uploads and static files (anything with a dot) are not localized.
  matcher: ["/((?!api|admin|uploads|_next|_vercel|.*\\..*).*)"],
};
