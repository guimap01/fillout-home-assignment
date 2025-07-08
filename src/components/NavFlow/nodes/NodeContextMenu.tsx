import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
import {
  ClipboardIcon,
  Copy,
  FlagIcon,
  PencilLine,
  Trash2,
} from 'lucide-react';
import { ReactNode } from 'react';
import { useNavFlow } from '../NavFlowProvider';
import { layoutNodes } from './utils';
import { createEdges } from '../edges/utils';
import { Node } from '@xyflow/react';

interface NodeContextMenuProps {
  children: ReactNode;
  disabled?: boolean;
  nodeId: string;
}

export function NodeContextMenu({
  children,
  disabled,
  nodeId,
}: NodeContextMenuProps) {
  const { setNodes, nodes, setEdges } = useNavFlow();
  function handleContextMenu(event: React.MouseEvent) {
    if (disabled) {
      event.preventDefault();
    }
  }

  function updateNodesAndEdges(nodes: Node[]) {
    const layoutedNodes = layoutNodes(nodes);
    const newEdges = createEdges(layoutedNodes);
    setNodes(layoutedNodes);
    setEdges(newEdges);
  }

  function handleFirstPage() {
    // move selected to the first position logic here
    const selectedNode = nodes.find((node) => node.id === nodeId);
    if (!selectedNode) return;
    const filteredNodes = nodes.filter((node) => node.id !== nodeId);
    updateNodesAndEdges([selectedNode, ...filteredNodes]);
  }

  function handleDelete() {
    const filteredNodes = nodes.filter((node) => node.id !== nodeId);
    updateNodesAndEdges(filteredNodes);
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild onContextMenu={handleContextMenu}>
        <div>{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent avoidCollisions data-side="top">
        <ContextMenuLabel>Settings</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="flex items-center gap-1.5"
          onClick={handleFirstPage}
        >
          <FlagIcon
            size={16}
            className="fill-fillout-blue100 stroke-fillout-blue100"
          />
          <p>Set as first page</p>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-1.5">
          <PencilLine size={16} />
          <p>Rename</p>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-1.5">
          <ClipboardIcon size={16} />
          <p>Copy</p>
        </ContextMenuItem>
        <ContextMenuItem className="flex items-center gap-1.5">
          <Copy size={16} />
          <p>Duplicate</p>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDelete}>
          <Trash2 size={16} className="text-fillout-red100" />
          <p className="text-fillout-red100">Delete</p>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
