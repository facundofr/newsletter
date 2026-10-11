import { BriefcaseIcon, HouseIcon, NewspaperIcon, RocketIcon } from "./icons";

export const NAV = [
  { href: "/", key: "home", Icon: HouseIcon },
  { href: "/projects", key: "projects", Icon: BriefcaseIcon },
  { href: "/newsletter", key: "newsletter", Icon: NewspaperIcon },
  { href: "/services", key: "services", Icon: RocketIcon },
] as const;
