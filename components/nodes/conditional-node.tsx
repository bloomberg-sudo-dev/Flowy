"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { GitBranch } from "lucide-react"
import type { NodeData } from "@/lib/types"

export const ConditionalNode = memo(({ data, isConnectable }: NodeProps<NodeData>) => {
  return (
    <div className="relative group">
      {/* Main node container */}
      <div className="px-6 py-4 bg-card/90 backdrop-blur-sm border-2 border-destructive rounded-sm min-w-[180px] shadow-terminal hover:shadow-neon transition-all duration-300">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent" />
        
        {/* Node header */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-sm bg-destructive/20 border border-destructive flex items-center justify-center group-hover:shadow-neon group-hover:shadow-destructive/50 transition-all duration-300">
            <GitBranch className="h-5 w-5 text-destructive" />
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm font-display font-bold uppercase tracking-wider text-destructive retro-glow">
              {data.label || "CONDITION"}
            </div>
            <div className="text-xs font-mono text-muted-foreground opacity-80">
              {data.description || ">> LOGIC BRANCH"}
            </div>
          </div>
        </div>

        {/* Condition info */}
        {data.condition && (
          <div className="mt-3 p-2 bg-background/50 border border-destructive/30 rounded-sm">
            <div className="text-xs font-mono text-terminal-green">
              IF: {data.condition}
            </div>
          </div>
        )}

        {/* Branch labels */}
        <div className="mt-3 flex justify-between text-xs font-mono">
          <span className="text-neon-green opacity-60">TRUE</span>
          <span className="text-destructive opacity-60">FALSE</span>
        </div>

        {/* Scan line overlay */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-destructive/10 to-transparent" />
        </div>
      </div>

      {/* Input handle */}
      <Handle 
        type="target" 
        position={Position.Top} 
        isConnectable={isConnectable} 
        className="w-4 h-4 bg-destructive border-2 border-background shadow-neon rounded-sm hover:scale-110 transition-transform duration-200" 
      />
      
      {/* Output handles - True/False */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="true"
        isConnectable={isConnectable} 
        className="w-4 h-4 bg-neon-green border-2 border-background shadow-neon rounded-sm hover:scale-110 transition-transform duration-200" 
        style={{ left: '25%' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="false"
        isConnectable={isConnectable} 
        className="w-4 h-4 bg-destructive border-2 border-background shadow-neon rounded-sm hover:scale-110 transition-transform duration-200" 
        style={{ left: '75%' }}
      />
    </div>
  )
})

ConditionalNode.displayName = "ConditionalNode"
