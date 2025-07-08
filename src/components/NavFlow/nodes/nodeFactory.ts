import { FileText } from 'lucide-react';
import { NodeTypes } from './utils';
import { Node, Position } from '@xyflow/react';

export function nodeFactory(nodeType: NodeTypes): Node {
  switch (nodeType) {
    case NodeTypes.page:
      return createPageNode();
    case NodeTypes.cover:
      return createCoverNode();
    case NodeTypes.ending:
      return createEndingNode();
    default:
      return createPageNode();
  }
}

function createPageNode() {
  return {
    id: crypto.randomUUID(),
    position: { x: 0, y: 0 },
    data: {
      label: 'Page',
      icon: FileText,
    },
    type: NodeTypes.page,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
}

function createCoverNode() {
  return {
    id: crypto.randomUUID(),
    // We can return position with x and y as 0 because this will be updated after
    position: { x: 0, y: 0 },
    data: {
      label: 'Cover',
      icon: FileText,
    },
    type: NodeTypes.page,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
}

function createEndingNode() {
  return {
    id: crypto.randomUUID(),
    position: { x: 0, y: 0 },
    data: {
      label: 'Ending',
      icon: FileText,
    },
    type: NodeTypes.page,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
}
