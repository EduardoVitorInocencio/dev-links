import { links } from "../../data/links";
import Button from "../ui/Button";

export default function LinkList() {
  return (
    <nav
      aria-label="Links principais"
      className="flex w-full flex-col gap-4 p-6"
    >
      {links.map(link => (
        <Button
          key={link.id}
          href={link.href}
          target="_blank"
        >
          {link.label}
        </Button>
      ))}
    </nav>
  );
}
