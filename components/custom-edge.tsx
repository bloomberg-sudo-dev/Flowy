"use client"

import type React from "react"

import { useCallback } from "react"
import { BaseEdge, EdgeLabelRenderer, type EdgeProps, getBezierPath, useReactFlow } from "reactflow"

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const { setEdges } = useReactFlow()

  const onEdgeClick = useCallback(
    (evt: React.MouseEvent<SVGGElement, MouseEvent>, id: string) => {
      evt.stopPropagation()
      setEdges((edges) => edges.filter((edge) => edge.id !== id))
    },
    [setEdges],
  )

  const retroStyle = {
    stroke: '#00ffff',
    strokeWidth: 2,
    filter: 'drop-shadow(0 0 3px #00ffff)',
    ...style,
  }

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={retroStyle}
      />
      <EdgeLabelRenderer>
        {data?.label && (
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <div className="bg-card/90 backdrop-blur-sm border-2 border-primary/50 rounded-sm px-3 py-1 shadow-terminal">
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                {data.label}
              </span>
            </div>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  )
}
