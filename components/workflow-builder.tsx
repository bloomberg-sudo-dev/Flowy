"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
  type Node,
} from "reactflow"
import "reactflow/dist/style.css"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Save, Upload, Play, Zap, Terminal, Database } from "lucide-react"
import NodeLibrary from "./node-library"
import NodeConfigPanel from "./node-config-panel"
import CustomEdge from "./custom-edge"
import { InputNode } from "./nodes/input-node"
import { OutputNode } from "./nodes/output-node"
import { ProcessNode } from "./nodes/process-node"
import { ConditionalNode } from "./nodes/conditional-node"
import { CodeNode } from "./nodes/code-node"
import { generateNodeId, createNode } from "@/lib/workflow-utils"
import type { WorkflowNode } from "@/lib/types"

const nodeTypes: NodeTypes = {
  input: InputNode,
  output: OutputNode,
  process: ProcessNode,
  conditional: ConditionalNode,
  code: CodeNode,
}

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
}

export default function WorkflowBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, type: "custom" }, eds)),
    [setEdges],
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")

      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return
      }

      if (reactFlowBounds && reactFlowInstance) {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        })

        const newNode = createNode({
          type,
          position,
          id: generateNodeId(type),
        })

        setNodes((nds) => nds.concat(newNode))
      }
    },
    [reactFlowInstance, setNodes],
  )

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const updateNodeData = useCallback(
    (nodeId: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            }
          }
          return node
        }),
      )
    },
    [setNodes],
  )

  const saveWorkflow = () => {
    if (nodes.length === 0) {
      toast({
        title: "// ERROR: NO DATA FOUND",
        description: "INITIALIZE WORKFLOW NODES BEFORE SAVE OPERATION",
        variant: "destructive",
      })
      return
    }

    const workflow = {
      nodes,
      edges,
    }

    const workflowString = JSON.stringify(workflow)
    localStorage.setItem("workflow", workflowString)

    toast({
      title: "// WORKFLOW SAVED",
      description: "DATA STREAM SUCCESSFULLY WRITTEN TO LOCAL STORAGE",
    })
  }

  const loadWorkflow = () => {
    const savedWorkflow = localStorage.getItem("workflow")

    if (!savedWorkflow) {
      toast({
        title: "// WARNING: NO BACKUP FOUND",
        description: "NO WORKFLOW DATA DETECTED IN MEMORY BANK",
        variant: "destructive",
      })
      return
    }

    try {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedWorkflow)
      setNodes(savedNodes)
      setEdges(savedEdges)
      toast({
        title: "// WORKFLOW RESTORED",
        description: "DATA STREAM SUCCESSFULLY LOADED FROM MEMORY",
      })
    } catch (error) {
      toast({
        title: "// CRITICAL ERROR",
        description: "CORRUPTED DATA STREAM - LOAD OPERATION FAILED",
        variant: "destructive",
      })
    }
  }

  const executeWorkflow = () => {
    if (nodes.length === 0) {
      toast({
        title: "// EXECUTION ABORT",
        description: "NO EXECUTABLE NODES DETECTED IN WORKFLOW",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "// INITIATING EXECUTION",
      description: "WORKFLOW PROCESSING... STANDBY FOR COMPLETION",
    })

    // In a real implementation, we would traverse the graph and execute each node
    // For the MVP, we'll just simulate execution with a success message
    setTimeout(() => {
      toast({
        title: "// EXECUTION COMPLETE",
        description: "ALL WORKFLOW NODES PROCESSED SUCCESSFULLY",
      })
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-background relative overflow-hidden">
      {/* Matrix rain effect */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-5">
        <div className="retro-grid h-full w-full" />
      </div>

      {/* Sidebar */}
      <div className="w-72 border-r-2 border-primary/50 bg-card/90 backdrop-blur-sm p-6 relative z-10 overflow-y-auto">
        <div className="border-b-2 border-accent/50 pb-4 mb-6">
          <h2 className="text-xl font-display font-bold uppercase tracking-wider text-primary retro-glow flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            NODE LIBRARY
          </h2>
          <p className="text-xs font-mono text-muted-foreground mt-2 opacity-80">
            &gt; DRAG TO DEPLOY
          </p>
        </div>
        <NodeLibrary />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="border-b-2 border-primary/50 bg-card/90 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold uppercase tracking-wider text-primary retro-glow flex items-center gap-2">
                <Zap className="h-6 w-6" />
                FLOWY
              </h1>
              <p className="text-xs font-mono text-muted-foreground opacity-80">
                &gt; CYBERPUNK WORKFLOW BUILDER v1.0
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={saveWorkflow} size="sm" variant="outline">
                <Save className="h-4 w-4" />
                SAVE
              </Button>
              <Button onClick={loadWorkflow} size="sm" variant="outline">
                <Upload className="h-4 w-4" />
                LOAD
              </Button>
              <Button onClick={executeWorkflow} size="sm" variant="default">
                <Play className="h-4 w-4" />
                EXECUTE
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              snapToGrid
              snapGrid={[15, 15]}
              defaultEdgeOptions={{ type: "custom" }}
              style={{ 
                background: 'transparent',
              }}
            >
              <Background 
                color="#00ffff" 
                size={2} 
                gap={20} 
                style={{ opacity: 0.3 }}
              />
              <Controls 
                style={{
                  background: 'hsl(var(--card) / 0.9)',
                  border: '2px solid hsl(var(--primary) / 0.5)',
                  borderRadius: '0.25rem',
                }}
              />
              <MiniMap 
                style={{
                  background: 'hsl(var(--card) / 0.9)',
                  border: '2px solid hsl(var(--primary) / 0.5)',
                  borderRadius: '0.25rem',
                }}
                nodeColor="#00ffff"
                maskColor="hsl(var(--background) / 0.8)"
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>

      {/* Configuration Panel */}
      {selectedNode && (
        <div className="w-80 border-l-2 border-primary/50 bg-card/90 backdrop-blur-sm p-6 relative z-10 overflow-y-auto">
          <div className="border-b-2 border-accent/50 pb-4 mb-6">
            <h3 className="text-lg font-display font-bold uppercase tracking-wider text-primary retro-glow flex items-center gap-2">
              <Database className="h-4 w-4" />
              NODE CONFIG
            </h3>
            <p className="text-xs font-mono text-muted-foreground mt-2 opacity-80">
              &gt; ID: {selectedNode.id}
            </p>
          </div>
          <NodeConfigPanel
            node={selectedNode as WorkflowNode}
            updateNodeData={updateNodeData}
            onClose={() => setSelectedNode(null)}
          />
        </div>
      )}
    </div>
  )
}
