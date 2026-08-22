import { TrackedLink } from "@/components/TrackedLink";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer id="contact">
      <div data-reveal="up">
        <p className="footer-kicker">CONTACT / GLOBAL MINIMUM</p>
        <h2>一起找到更低摩擦的产品路径。</h2>
      </div>
      <div className="contact-placeholder" data-reveal="up">
        <div className="contact-identity">
          <span>{profile.displayName}</span>
          <p>{profile.role}</p>
          <small>{profile.location}</small>
        </div>
        <div className="contact-links" aria-label="联系与资料入口">
          {profile.contacts.map((contact) => (
            <TrackedLink
              href={contact.href}
              key={contact.id}
              download={contact.download}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noreferrer" : undefined}
              eventName={contact.event}
              eventTarget={contact.id}
              eventSource="footer"
            >
              <span>{contact.shortLabel}</span>
              <strong>{contact.label}</strong>
              <small>待替换 ↗</small>
            </TrackedLink>
          ))}
        </div>
        <p className="content-notice">{profile.contentNotice}</p>
      </div>
      <p className="footer-note">
        This site is a PES. Explore it like you would explore a chemical space.
      </p>
    </footer>
  );
}
