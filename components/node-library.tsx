"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Database, FileOutput, GitBranch, Code, Settings, Zap } from "lucide-react"

const nodeTypes = [
  {
    type: "input",
    label: "INPUT",
    description: ">> DATA SOURCE NODE",
    icon: <Database className="h-4 w-4 mr-2" />,
    color: "text-neon-cyan",
  },
  {
    type: "output",
    label: "OUTPUT",
    description: ">> DATA OUTPUT NODE",
    icon: <FileOutput className="h-4 w-4 mr-2" />,
    color: "text-neon-green",
  },
  {
    type: "process",
    label: "PROCESS",
    description: ">> DATA PROCESSOR",
    icon: <Settings className="h-4 w-4 mr-2" />,
    color: "text-neon-magenta",
  },
  {
    type: "conditional",
    label: "CONDITION",
    description: ">> LOGIC BRANCH",
    icon: <GitBranch className="h-4 w-4 mr-2" />,
    color: "text-destructive",
  },
  {
    type: "code",
    label: "CODE",
    description: ">> SCRIPT EXECUTOR",
    icon: <Code className="h-4 w-4 mr-2" />,
    color: "text-amber",
  },
]

export default function NodeLibrary() {
  const onDragStart = (event: React.DragEvent<HTMLButtonElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="flex flex-col gap-3">
      {nodeTypes.map((node) => (
        <Button
          key={node.type}
          variant="outline"
          className="justify-start text-left h-auto p-4 hover:shadow-neon hover:scale-105 transition-all duration-200"
          draggable={true}
          onDragStart={(e) => onDragStart(e, node.type)}
        >
          <div className={`${node.color} flex items-center w-full`}>
            {node.icon}
            <div className="flex flex-col items-start flex-1">
              <span className="font-display font-bold text-sm uppercase tracking-wider">
                {node.label}
              </span>
              <span className="text-xs font-mono opacity-80 mt-1">
                {node.description}
              </span>
            </div>
          </div>
        </Button>
      ))}
      
      <div className="mt-6 p-3 border border-primary/30 rounded-sm bg-background/50">
        <div className="text-xs font-mono text-terminal-green opacity-80">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-accent">$</span>
            <span>DRAG_NODE_TO_CANVAS</span>
          </div>
          <div className="text-muted-foreground/60">
            &gt; BUILD YOUR WORKFLOW
          </div>
        </div>
      </div>

      {/* Coming Soon Callout */}
      <div className="mt-4 p-4 border-2 border-amber/50 rounded-sm bg-amber/5 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-amber/10 to-transparent" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-amber animate-pulse" />
            <span className="font-display font-bold text-sm uppercase tracking-wider text-amber">
              COMING SOON
            </span>
          </div>
          <div className="text-xs font-mono text-muted-foreground/80 leading-relaxed">
            <div>&gt; EMAIL NOTIFICATIONS</div>
            <div>&gt; DATA FILTERS</div>
            <div>&gt; SUB-WORKFLOWS</div>
            <div>&gt; DATABASE TABLES</div>
            <div className="mt-2 text-amber/60">&gt; STAY_TUNED.EXE</div>
          </div>
        </div>
      </div>
    </div>
  )
}
