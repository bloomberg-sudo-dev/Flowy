"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { WorkflowNode } from "@/lib/types"
import CodeEditor from "./code-editor"

interface NodeConfigPanelProps {
  node: WorkflowNode
  updateNodeData: (nodeId: string, data: any) => void
  onClose: () => void
}

export default function NodeConfigPanel({ node, updateNodeData, onClose }: NodeConfigPanelProps) {
  const [localData, setLocalData] = useState({ ...node.data })

  const handleChange = (key: string, value: any) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: value,
    }))
    updateNodeData(node.id, { [key]: value })
  }

  const renderInputFields = () => {
    switch (node.type) {
      case "input":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataSource" className="text-xs font-mono uppercase text-neon-cyan">
                DATA SOURCE
              </Label>
              <Select
                value={localData.dataSource || "manual"}
                onValueChange={(value) => handleChange("dataSource", value)}
              >
                <SelectTrigger id="dataSource" className="font-mono">
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">MANUAL INPUT</SelectItem>
                  <SelectItem value="api">API ENDPOINT</SelectItem>
                  <SelectItem value="database">DATABASE</SelectItem>
                  <SelectItem value="file">FILE UPLOAD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sampleData" className="text-xs font-mono uppercase text-neon-cyan">
                SAMPLE DATA (JSON)
              </Label>
              <Textarea
                id="sampleData"
                value={localData.sampleData || ""}
                onChange={(e) => handleChange("sampleData", e.target.value)}
                className="h-32 font-mono text-terminal-green"
                placeholder='{"key": "value", "status": "active"}'
              />
            </div>
          </div>
        )

      case "output":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="outputType" className="text-xs font-mono uppercase text-neon-green">
                OUTPUT TYPE
              </Label>
              <Select
                value={localData.outputType || "console"}
                onValueChange={(value) => handleChange("outputType", value)}
              >
                <SelectTrigger id="outputType" className="font-mono">
                  <SelectValue placeholder="Select output type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="console">CONSOLE</SelectItem>
                  <SelectItem value="api">API ENDPOINT</SelectItem>
                  <SelectItem value="database">DATABASE</SelectItem>
                  <SelectItem value="file">FILE EXPORT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="outputFormat" className="text-xs font-mono uppercase text-neon-green">
                OUTPUT FORMAT
              </Label>
              <Select
                value={localData.outputFormat || "json"}
                onValueChange={(value) => handleChange("outputFormat", value)}
              >
                <SelectTrigger id="outputFormat" className="font-mono">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="text">PLAIN TEXT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "process":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="processType" className="text-xs font-mono uppercase text-neon-magenta">
                PROCESS TYPE
              </Label>
              <Select
                value={localData.processType || "transform"}
                onValueChange={(value) => handleChange("processType", value)}
              >
                <SelectTrigger id="processType" className="font-mono">
                  <SelectValue placeholder="Select process type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transform">TRANSFORM</SelectItem>
                  <SelectItem value="filter">FILTER</SelectItem>
                  <SelectItem value="aggregate">AGGREGATE</SelectItem>
                  <SelectItem value="sort">SORT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="processConfig" className="text-xs font-mono uppercase text-neon-magenta">
                PROCESS CONFIG (JSON)
              </Label>
              <Textarea
                id="processConfig"
                value={localData.processConfig || ""}
                onChange={(e) => handleChange("processConfig", e.target.value)}
                className="h-32 font-mono text-terminal-green"
                placeholder='{"operation": "transform", "rules": []}'
              />
            </div>
          </div>
        )

      case "conditional":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="condition" className="text-xs font-mono uppercase text-destructive">
                CONDITION LOGIC
              </Label>
              <Input
                id="condition"
                value={localData.condition || ""}
                onChange={(e) => handleChange("condition", e.target.value)}
                placeholder="data.value > 10 || data.status === 'active'"
                className="font-mono text-terminal-green"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trueLabel" className="text-xs font-mono uppercase text-neon-green">
                  TRUE PATH
                </Label>
                <Input
                  id="trueLabel"
                  value={localData.trueLabel || "TRUE"}
                  onChange={(e) => handleChange("trueLabel", e.target.value)}
                  className="font-mono"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="falseLabel" className="text-xs font-mono uppercase text-destructive">
                  FALSE PATH
                </Label>
                <Input
                  id="falseLabel"
                  value={localData.falseLabel || "FALSE"}
                  onChange={(e) => handleChange("falseLabel", e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </div>
        )

      case "code":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codeLanguage" className="text-xs font-mono uppercase text-amber">
                LANGUAGE
              </Label>
              <Select
                value={localData.codeLanguage || "javascript"}
                onValueChange={(value) => handleChange("codeLanguage", value)}
              >
                <SelectTrigger id="codeLanguage" className="font-mono">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JAVASCRIPT</SelectItem>
                  <SelectItem value="typescript">TYPESCRIPT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code" className="text-xs font-mono uppercase text-amber">
                CODE EDITOR
              </Label>
              <CodeEditor
                value={
                  localData.code ||
                  "// FLOWY Code Node\nfunction process(data) {\n  // Transform your data here\n  console.log('Processing:', data);\n  return data;\n}"
                }
                onChange={(value) => handleChange("code", value)}
                language={localData.codeLanguage || "javascript"}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-display font-bold uppercase tracking-wider text-primary retro-glow">
          CONFIG: {node.data.label || node.type}
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/20 hover:text-destructive">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto">
        {/* Basic Configuration */}
        <div className="p-4 border border-primary/30 rounded-sm bg-background/50">
          <h3 className="text-sm font-display font-bold uppercase tracking-wider text-accent mb-4">
            BASIC CONFIG
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label" className="text-xs font-mono uppercase text-muted-foreground">
                NODE LABEL
              </Label>
              <Input 
                id="label" 
                value={localData.label || ""} 
                onChange={(e) => handleChange("label", e.target.value)}
                className="font-mono"
                placeholder="Enter node name..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-mono uppercase text-muted-foreground">
                DESCRIPTION
              </Label>
              <Textarea
                id="description"
                value={localData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe node functionality..."
                className="font-mono min-h-[60px]"
              />
            </div>

            <div className="flex items-center space-x-3 py-2">
              <Switch
                id="required"
                checked={localData.required || false}
                onCheckedChange={(checked) => handleChange("required", checked)}
              />
              <Label htmlFor="required" className="text-xs font-mono uppercase text-muted-foreground">
                CRITICAL NODE
              </Label>
            </div>
          </div>
        </div>

        {/* Advanced Configuration */}
        <div className="p-4 border border-accent/30 rounded-sm bg-background/30">
          <h3 className="text-sm font-display font-bold uppercase tracking-wider text-accent mb-4">
            ADVANCED CONFIG
          </h3>

          {renderInputFields()}
        </div>
      </div>
    </div>
  )
}
