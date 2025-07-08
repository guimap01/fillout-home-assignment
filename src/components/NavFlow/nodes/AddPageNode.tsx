import { Handle, Position } from '@xyflow/react';
import { PlusIcon } from 'lucide-react';
import { AddPageMenu } from '../shared/AddPageMenu';

export function AddPageNode() {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        // Style it to be invisible, as it's a logical connection point
        style={{ background: 'transparent', border: 'none' }}
        isConnectable={false}
      />
      <AddPageMenu>
        <div
          className="flex items-center justify-center
        px-2.5 py-1.5 gap-1.5
        rounded-md cursor-pointer
        transition-all duration-200
        border border-fillout-gray100
        "
        >
          <PlusIcon size={16} />
          <span className="text-sm font-medium text-gray-700">Add page</span>
        </div>
      </AddPageMenu>
    </>
  );
}
