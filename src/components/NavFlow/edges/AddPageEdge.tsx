import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from '@xyflow/react';

import { AddPageMenu } from '../shared/AddPageMenu';
import { PlusIcon } from 'lucide-react';

export function AddPageEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  source,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ ...style, strokeWidth: 2 }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            // This is crucial to make the div interactive
            pointerEvents: 'all',
          }}
          className="nodrag nopan group"
        >
          <AddPageMenu sourceId={source}>
            <div className="invisible group-hover:visible w-4 h-4 bg-white rounded-full flex items-center justify-center cursor-pointer border border-gray-300">
              <PlusIcon size={8} />
            </div>
          </AddPageMenu>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
