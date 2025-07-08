import { JSX } from 'react';
import { AddPageEdge } from './AddPageEdge';
import { addEdge, Edge, EdgeProps, Node } from '@xyflow/react';

export enum EdgeTypes {
  AddPageEdge = 'AddPageEdge',
}

export const edgeTypes: Record<EdgeTypes, (props: EdgeProps) => JSX.Element> = {
  [EdgeTypes.AddPageEdge]: AddPageEdge,
};

export function createEdges(nodes: Node[]) {
  let newEdges: Edge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const sourceNode = nodes[i];
    const targetNode = nodes[i + 1];

    const newEdge: Edge = {
      id: `e${sourceNode.id}-${targetNode.id}`,
      source: sourceNode.id,
      target: targetNode.id,
      sourceHandle: null,
      targetHandle: null,
      animated: true,
      type: EdgeTypes.AddPageEdge,
    };
    newEdges = addEdge(newEdge, newEdges);
  }

  return newEdges;
}
