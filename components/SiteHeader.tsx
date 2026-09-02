import { TrackedLink } from "@/components/TrackedLink";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/paths";

type SiteHeaderProps = {
  home?: boolean;
};

export function SiteHeader({ home = false }: SiteHeaderProps) {
  const anchor = (id: string) => (home ? `#${id}` : `${withBasePath("/")}#${id}`);

  return (
    <header className="site-header">
      <a className="brand" href={home ? "#home" : withBasePath("/")} aria-label="Lux 个人主页">
        Lux <span aria-hidden="true">*</span>
      </a>

      <nav className="desktop-nav" aria-label="主要导航">
        <a href={anchor("about")}>About</a>
        <a href={anchor("skills")}>Expertise</a>
        <a href={anchor("projects")}>Selected work</a>
        <a href={anchor("blog")}>Journal</a>
        <a href={anchor("contact")}>Inquiries</a>
      </nav>

      <TrackedLink
        className="resume-button"
        href={profile.contacts[0].href}
        download={profile.contacts[0].download}
        eventName="resume_download"
        eventTarget="placeholder-resume"
        eventSource="header"
      >
        Résumé ↗
      </TrackedLink>

      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="移动端导航">
          <a href={anchor("about")}>About</a>
          <a href={anchor("skills")}>Expertise</a>
          <a href={anchor("projects")}>Selected work</a>
          <a href={anchor("blog")}>Journal</a>
          <a href={anchor("contact")}>Inquiries</a>
          <TrackedLink
            href={profile.contacts[0].href}
            download={profile.contacts[0].download}
            eventName="resume_download"
            eventTarget="placeholder-resume"
            eventSource="mobile-menu"
          >
            Résumé ↗
          </TrackedLink>
        </nav>
      </details>
    </header>
  );
}
