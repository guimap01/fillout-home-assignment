'use client';

import { NodeChange, applyNodeChanges, ReactFlow, Node } from '@xyflow/react';
import { useCallback } from 'react';
import { addPageNode, layoutNodes, nodeTypes } from './nodes/utils';
import { createEdges, edgeTypes } from './edges/utils';
import { NavFlowProvider, useNavFlow } from './NavFlowProvider';
import '@xyflow/react/dist/style.css';

function NavFlowImpl() {
  const { edges, nodes, setEdges, setNodes } = useNavFlow();

  const onNodeChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => {
        const updatedChanges = changes.map((change) => {
          if (
            change.type === 'position' &&
            change.dragging &&
            change.position
          ) {
            const node = nodes.find((n) => n.id === change.id);
            if (node) {
              // Lock y-axis
              change.position.y = node.position.y;
            }
          }
          return change;
        });
        return applyNodeChanges(updatedChanges, nds);
      }),
    [nodes, setNodes]
  );

  const onNodeDragStop = useCallback(
    // @ts-expect-error We don't care about the event
    (_, draggedNode: Node) => {
      const addPageNode = nodes.pop();
      const nodesWithFinalPosition = nodes
        .map((node) => (node.id === draggedNode.id ? draggedNode : node))
        .sort((a, b) => a.position.x - b.position.x);

      // addPageNode is the last node, so we need to ensure it is always at the end
      if (addPageNode) {
        nodesWithFinalPosition.push(addPageNode);
      }

      const layoutedNodes = layoutNodes(nodesWithFinalPosition);

      const newEdges = createEdges(layoutedNodes);
      setNodes(layoutedNodes);
      setEdges(newEdges);
    },
    [nodes, setEdges, setNodes]
  );

  return (
    <div className="w-full h-dvh flex justify-center items-center bg-gray-400">
      <div className="w-full h-12 bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodeChange}
          onNodeDragStop={onNodeDragStop}
          autoPanOnNodeDrag={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          nodesConnectable={false}
          minZoom={1}
          maxZoom={1}
        />
      </div>
    </div>
  );
}

export function NavFlow() {
  return (
    <NavFlowProvider initialNodes={[addPageNode]}>
      <NavFlowImpl />
    </NavFlowProvider>
  );
}
