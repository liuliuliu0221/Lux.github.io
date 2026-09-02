import { withBasePath } from "@/lib/paths";

type SiteHeaderProps = {
  home?: boolean;
};

export function SiteHeader({ home = false }: SiteHeaderProps) {
  const anchor = (id: string) => (home ? `#${id}` : `${withBasePath("/")}#${id}`);

  return (
    <header className="site-header">
      <nav aria-label="主要导航">
        <a href={anchor("about")}>About</a>
        <a href={anchor("skills")}>Expertise</a>
        <a href={anchor("projects")}>Work</a>
        <a href={anchor("blog")}>Writing</a>
        <a href={anchor("contact")}>Inquiries</a>
      </nav>
    </header>
  );
}
