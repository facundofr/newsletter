import { BriefcaseIcon, GridIcon, HomeIcon, MailIcon } from "./icons";

export const NAV = [
  { href: "/", key: "home", Icon: HomeIcon },
  { href: "/projects", key: "projects", Icon: GridIcon },
  { href: "/newsletter", key: "newsletter", Icon: MailIcon },
  { href: "/services", key: "services", Icon: BriefcaseIcon },
] as const;
