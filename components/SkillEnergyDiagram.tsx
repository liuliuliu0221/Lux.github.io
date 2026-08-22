"use client";

import { useState } from "react";
import { skills, type Skill } from "@/data/skills";

function skillY(skill: Skill) {
  return 372 - skill.rarity * 3;
}

function skillX(skill: Skill) {
  return 250 + skill.depth * 6.4;
}

export function SkillEnergyDiagram() {
  const [activeId, setActiveId] = useState(skills[0].id);
  const activeSkill = skills.find((skill) => skill.id === activeId) ?? skills[0];

  return (
    <div className="skill-explorer" data-reveal="up">
      <div className="skill-chart-shell">
        <div className="skill-chart-labels" aria-hidden="true">
          <span>HIGH BARRIER</span>
          <span>LOW BARRIER</span>
        </div>
        <svg
          className="skill-chart"
          viewBox="0 0 1000 430"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <g className="chart-grid">
            {[70, 140, 210, 280, 350].map((y) => (
              <line key={y} x1="90" x2="950" y1={y} y2={y} />
            ))}
            <line x1="180" x2="180" y1="35" y2="390" />
          </g>
          {skills.map((skill) => {
            const y = skillY(skill);
            const x = skillX(skill);
            const spread = skill.uncertainty * 6;
            const active = skill.id === activeId;

            return (
              <g className={active ? "energy-level is-active" : "energy-level"} key={skill.id}>
                <text x="96" y={y + 5}>{skill.energy}</text>
                <line className="level-track" x1="220" x2="900" y1={y} y2={y} />
                <line className="level-fill" x1="220" x2={x} y1={y} y2={y} />
                <line className="uncertainty" x1={x - spread} x2={x + spread} y1={y} y2={y} />
                <line className="uncertainty-cap" x1={x - spread} x2={x - spread} y1={y - 10} y2={y + 10} />
                <line className="uncertainty-cap" x1={x + spread} x2={x + spread} y1={y - 10} y2={y + 10} />
                <circle cx={x} cy={y} r={active ? 8 : 5} />
                <text className="level-depth" x="920" y={y + 5}>{skill.depth}%</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="skill-controls" aria-label="选择技能查看说明">
        {skills.map((skill, index) => (
          <button
            className={skill.id === activeId ? "skill-control is-active" : "skill-control"}
            key={skill.id}
            type="button"
            aria-pressed={skill.id === activeId}
            onClick={() => setActiveId(skill.id)}
            onFocus={() => setActiveId(skill.id)}
            onMouseEnter={() => setActiveId(skill.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{skill.name}</strong>
            <small>{skill.depth}%</small>
          </button>
        ))}
      </div>

      <div className="skill-readout" aria-live="polite">
        <div>
          <p>ACTIVE LEVEL / {activeSkill.energy}</p>
          <h3>{activeSkill.name}</h3>
        </div>
        <div>
          <p>{activeSkill.detail}</p>
          <span>{activeSkill.evidence}</span>
        </div>
      </div>
    </div>
  );
}
