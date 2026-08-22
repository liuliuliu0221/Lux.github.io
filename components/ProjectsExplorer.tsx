"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { trackEvent } from "@/lib/analytics";
import { TrackedLink } from "@/components/TrackedLink";

function energyY(energy: number) {
  return 320 - energy * 2.45;
}

function curvePath(project: Project) {
  const startX = 60;
  const endX = 940;
  const peakX = startX + (endX - startX) * project.curve.transitionProgress;
  const startY = energyY(project.curve.startEnergy);
  const peakY = energyY(project.curve.barrierEnergy);
  const endY = energyY(project.curve.endEnergy);

  return [
    `M ${startX} ${startY}`,
    `C ${peakX - 180} ${startY}, ${peakX - 120} ${peakY}, ${peakX} ${peakY}`,
    `C ${peakX + 130} ${peakY}, ${endX - 190} ${endY}, ${endX} ${endY}`,
  ].join(" ");
}

function nodeStyle(project: Project) {
  const left = 6 + project.curve.transitionProgress * 88;
  const top = (energyY(project.curve.barrierEnergy) / 360) * 100;
  return { "--node-x": `${left}%`, "--node-y": `${top}%` } as CSSProperties;
}

export function ProjectsExplorer() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [open, setOpen] = useState(false);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const showProject = (project: Project, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    trackEvent("project_open", { target: project.slug, source: "projects" });
    setActiveProject(project);
    setOpen(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="reaction-explorer" data-reveal="up">
        <div className="reaction-chart">
          <div className="reaction-chart-axis" aria-hidden="true">
            <span>SYSTEM ENERGY</span>
            <span>REACTION COORDINATE →</span>
          </div>
          <svg viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
            <g className="reaction-grid">
              {[70, 140, 210, 280].map((y) => (
                <line key={y} x1="40" x2="960" y1={y} y2={y} />
              ))}
            </g>
            {projects.map((project, index) => (
              <path
                className={`reaction-path reaction-path-${index + 1}`}
                d={curvePath(project)}
                key={project.id}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          {projects.map((project) => (
            <button
              className="reaction-node"
              key={project.id}
              type="button"
              style={nodeStyle(project)}
              onClick={(event) => showProject(project, event.currentTarget)}
              aria-label={`查看${project.title}的决策日志`}
            >
              <i aria-hidden="true" />
              <span>决策点 · CASE {project.id}</span>
            </button>
          ))}
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-meta">
                <span>CASE {project.id}</span>
                <span>{project.type}</span>
              </div>
              <h3>{project.title}</h3>
              <dl>
                <div>
                  <dt>能量壁垒 / Challenge</dt>
                  <dd>{project.challenge}</dd>
                </div>
                <div className="decision-row">
                  <dt>催化策略 / Decision</dt>
                  <dd>{project.decision}</dd>
                </div>
                <div>
                  <dt>产物 / Outcome</dt>
                  <dd>{project.outcome}</dd>
                </div>
              </dl>
              <button
                className="project-open"
                type="button"
                onClick={(event) => showProject(project, event.currentTarget)}
              >
                查看 PM 决策日志 <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
        <div className="project-proof-links" aria-label="项目代码与论文入口">
          {profile.contacts
            .filter((contact) => contact.id === "github" || contact.id === "scholar")
            .map((contact) => (
              <TrackedLink
                href={contact.href}
                key={contact.id}
                target="_blank"
                rel="noreferrer"
                eventName="contact_click"
                eventTarget={contact.id}
                eventSource="projects"
              >
                <span>{contact.shortLabel}</span>
                {contact.label} <i aria-hidden="true">↗</i>
              </TrackedLink>
            ))}
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="decision-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
          }}
        >
          <div className="dialog-meta">
            <span>PM DECISION LOG / CASE {activeProject.id}</span>
            <Dialog.Close className="dialog-close" aria-label="关闭决策日志">×</Dialog.Close>
          </div>
          <Dialog.Title>{activeProject.title}</Dialog.Title>
          <Dialog.Description>
            这份日志记录项目中最关键的一次约束识别与方案取舍。
          </Dialog.Description>
          <dl>
            <div>
              <dt>能量壁垒 / Challenge</dt>
              <dd>{activeProject.challenge}</dd>
            </div>
            <div className="dialog-decision">
              <dt>催化策略 / Decision</dt>
              <dd>{activeProject.decision}</dd>
            </div>
            <div>
              <dt>产物 / Outcome</dt>
              <dd>{activeProject.outcome}</dd>
            </div>
          </dl>
          <div className="dialog-evidence">
            <p>{activeProject.evidence}</p>
            <div>
              {activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
