import { JSX } from 'react';
import { AddPageNode } from './AddPageNode';
import { PageNode } from './PageNode';
import { Node, Position } from '@xyflow/react';

export enum NodeTypes {
  addPageNode = 'addPage',
  page = 'page',
  ending = 'ending',
  cover = 'cover',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nodeTypes: Record<NodeTypes, (props: any) => JSX.Element> = {
  [NodeTypes.addPageNode]: AddPageNode,
  [NodeTypes.page]: PageNode,
  [NodeTypes.cover]: PageNode,
  [NodeTypes.ending]: PageNode,
};

const NODE_WIDTH = 110;
const HORIZONTAL_PADDING = 20;
export const DEFAULT_MAX_PAGES = 10;

export function layoutNodes(nodes: Node[]) {
  const addPageNode = nodes.find((node) => node.type === NodeTypes.addPageNode);
  return nodes.map((node, index) => {
    const newX = index * (NODE_WIDTH + HORIZONTAL_PADDING);

    return {
      ...node,
      position: { x: newX, y: addPageNode?.position.y ?? node.position.y },
    };
  });
}

export const addPageNode: Node = {
  id: crypto.randomUUID(),
  data: { label: '' },
  // Note: Adjust the Y value below to vertically center the node.
  // Formula: (container height - node height) / 2
  position: { x: 0, y: 7 },
  style: { width: NODE_WIDTH },
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  draggable: false,
  type: NodeTypes.addPageNode,
};
