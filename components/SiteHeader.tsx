import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import { profile } from "@/data/profile";

type SiteHeaderProps = {
  home?: boolean;
};

export function SiteHeader({ home = false }: SiteHeaderProps) {
  const anchor = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className="site-header">
      <a className="brand" href={home ? "#home" : "/"} aria-label="PES Explorer 首页">
        <span className="brand-mark" aria-hidden="true" />
        PES Explorer
      </a>

      <nav className="desktop-nav" aria-label="主要导航">
        <a href={anchor("home")}>Home</a>
        <a href={anchor("about")}>About</a>
        <a href={anchor("skills")}>Skills</a>
        <a href={anchor("projects")}>Projects</a>
        <Link href="/blog">Blog</Link>
      </nav>

      <TrackedLink
        className="resume-button"
        href={profile.contacts[0].href}
        download={profile.contacts[0].download}
        eventName="resume_download"
        eventTarget="placeholder-resume"
        eventSource="header"
      >
        Resume
      </TrackedLink>

      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="移动端导航">
          <a href={anchor("home")}>Home</a>
          <a href={anchor("about")}>About</a>
          <a href={anchor("skills")}>Skills</a>
          <a href={anchor("projects")}>Projects</a>
          <Link href="/blog">Blog</Link>
          <a href={anchor("contact")}>Contact</a>
          <TrackedLink
            href={profile.contacts[0].href}
            download={profile.contacts[0].download}
            eventName="resume_download"
            eventTarget="placeholder-resume"
            eventSource="mobile-menu"
          >
            Download Resume
          </TrackedLink>
        </nav>
      </details>
    </header>
  );
}
