import { Handle, NodeProps, Position } from '@xyflow/react';
import { NodeBaseContainer } from './NodeBaseContainer';
import { EllipsisVertical, FileText } from 'lucide-react';
import { NodeContextMenu } from './NodeContextMenu';

interface PageNodeProps extends NodeProps {
  data: {
    label: string;
  };
}

export function PageNode({ selected, data, id }: PageNodeProps) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'transparent', border: 'none' }}
        isConnectable={false}
      />

      <NodeContextMenu disabled={!selected} nodeId={id}>
        <NodeBaseContainer selected={selected}>
          <FileText size={20} />
          <span
            className={`text-sm font-medium ${
              selected ? 'text-fillout-black' : 'text-fillout-default-text'
            }`}
          >
            {data.label}
          </span>
          {selected && (
            <EllipsisVertical size={16} className="text-fillout-gray150" />
          )}
        </NodeBaseContainer>
      </NodeContextMenu>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: 'transparent', border: 'none' }}
        isConnectable={false}
      />
    </>
  );
}
