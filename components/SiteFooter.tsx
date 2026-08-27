import Image from "next/image";
import { ElasticIdentityBadge } from "@/components/ElasticIdentityBadge";
import { TrackedLink } from "@/components/TrackedLink";
import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer id="contact">
      <div className="footer-intro" data-reveal="up">
        <p className="footer-kicker">CONTACT / GLOBAL MINIMUM</p>
        <h2>一起找到更低摩擦的产品路径。</h2>
      </div>
      <ElasticIdentityBadge
        backMessage="保持好奇，把想法变成可用的产品。"
        label={`${profile.name}的个人工牌`}
      >
        <header className="identity-badge-header">
          <span>PERSONAL ID / PES EXPLORER</span>
          <span>CONTACT COORDINATE · 001</span>
        </header>
        <div className="identity-badge-main">
          <div className="identity-photo-frame">
            <Image
              className="contact-portrait"
              src={profile.portrait}
              alt={`${profile.name}的个人照片`}
              width={675}
              height={900}
              sizes="(max-width: 760px) 144px, 224px"
            />
            <span>PHOTO / PROFILE</span>
          </div>
          <div className="contact-identity">
            <span>{profile.displayName}</span>
            <h3>{profile.name} <small>{profile.englishName}</small></h3>
            <p>{profile.role}</p>
            <small>{profile.education}</small>
            <div className="identity-tags" aria-label="个人方向">
              <span>AI PRODUCT</span>
              <span>HUMAN–AI</span>
              <span>INDIE DEV</span>
            </div>
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
                <small>{contact.placeholder ? "待替换 ↗" : "打开 ↗"}</small>
              </TrackedLink>
            ))}
          </div>
        </div>
        <div className="identity-badge-footer">
          <p className="content-notice">{profile.contentNotice}</p>
          <span>AI PM · GLOBAL MINIMUM SEEKER</span>
        </div>
      </ElasticIdentityBadge>
      <p className="footer-note">
        This site is a PES. Explore it like you would explore a chemical space.
      </p>
    </footer>
  );
}
