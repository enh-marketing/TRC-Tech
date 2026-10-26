"use client";

import { useState } from "react";
import { Tag } from "@/components/ui";

const skills = ["React", "Node.js", "Kubernetes", "Go", "PostgreSQL", "Terraform"];

export function SkillsDemo() {
  const [selected, setSelected] = useState<string[]>(["React", "Node.js"]);

  function toggle(skill: string) {
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Tag key={skill} selected={selected.includes(skill)} onToggle={() => toggle(skill)}>
          {skill}
        </Tag>
      ))}
    </div>
  );
}
