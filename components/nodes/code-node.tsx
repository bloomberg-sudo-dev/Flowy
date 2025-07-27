"use client"

import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Code } from "lucide-react"
import type { NodeData } from "@/lib/types"

export const CodeNode = memo(({ data, isConnectable }: NodeProps<NodeData>) => {
  return (
    <div className="relative group">
      {/* Main node container */}
      <div className="px-6 py-4 bg-card/90 backdrop-blur-sm border-2 border-amber rounded-sm min-w-[200px] shadow-terminal hover:shadow-neon transition-all duration-300">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent" />
        
        {/* Node header */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-sm bg-amber/20 border border-amber flex items-center justify-center group-hover:shadow-neon group-hover:shadow-amber/50 transition-all duration-300">
            <Code className="h-5 w-5 text-amber" />
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm font-display font-bold uppercase tracking-wider text-amber retro-glow">
              {data.label || "CODE"}
            </div>
            <div className="text-xs font-mono text-muted-foreground opacity-80">
              {data.description || ">> SCRIPT EXECUTOR"}
            </div>
          </div>
        </div>

        {/* Code language info */}
        {data.codeLanguage && (
          <div className="mt-3 p-2 bg-background/50 border border-amber/30 rounded-sm">
            <div className="text-xs font-mono text-terminal-green">
              LANG: {data.codeLanguage}
            </div>
          </div>
        )}

        {/* Code preview */}
        {data.code && (
          <div className="mt-2 p-2 bg-background/70 border border-amber/20 rounded-sm max-h-20 overflow-hidden">
            <div className="text-xs font-mono text-amber/80 whitespace-pre-wrap">
              {data.code.substring(0, 100)}
              {data.code.length > 100 && "..."}
            </div>
          </div>
        )}

        {/* Scan line overlay */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-amber/10 to-transparent" />
        </div>
      </div>

      {/* Input handle */}
      <Handle 
        type="target" 
        position={Position.Top} 
        isConnectable={isConnectable} 
        className="w-4 h-4 bg-amber border-2 border-background shadow-neon rounded-sm hover:scale-110 transition-transform duration-200" 
      />
      
      {/* Output handle */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        isConnectable={isConnectable} 
        className="w-4 h-4 bg-amber border-2 border-background shadow-neon rounded-sm hover:scale-110 transition-transform duration-200" 
      />
    </div>
  )
})

CodeNode.displayName = "CodeNode"
