"use client"
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
}

export default function CodeEditor({ value, onChange, language = "javascript" }: CodeEditorProps) {
  // Terminal-style code editor with retro aesthetics
  return (
    <div className="relative border-2 border-amber/50 rounded-sm bg-background/80 backdrop-blur-sm overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between bg-amber/10 border-b border-amber/30 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-destructive"></div>
            <div className="w-2 h-2 rounded-full bg-amber"></div>
            <div className="w-2 h-2 rounded-full bg-neon-green"></div>
          </div>
          <span className="text-xs font-mono text-amber/80 uppercase">
            {language}_EDITOR.{language === 'typescript' ? 'TS' : 'JS'}
          </span>
        </div>
        <span className="text-xs font-mono text-muted-foreground/60">
          CTRL+S TO SAVE
        </span>
      </div>
      
      {/* Code editor area */}
      <div className="relative">
        {/* Line numbers background effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-12 bg-gradient-to-r from-amber/20 to-transparent border-r border-amber/20"></div>
        </div>
        
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-sm h-64 whitespace-pre bg-transparent border-0 resize-none text-terminal-green pl-16 focus:ring-0 focus:outline-none"
          spellCheck={false}
          placeholder="// Enter your code here..."
        />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-amber/5 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}
