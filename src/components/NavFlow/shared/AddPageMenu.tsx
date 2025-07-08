'use client';

import { ReactNode, useCallback, useMemo } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/DropdownMenu';
import { DEFAULT_MAX_PAGES, layoutNodes, NodeTypes } from '../nodes/utils';
import { nodeFactory } from '../nodes/nodeFactory';
import { createEdges } from '../edges/utils';
import { useNavFlow } from '../NavFlowProvider';
import { FileText } from 'lucide-react';

interface AddPageMenuProps {
  children: ReactNode;
  sourceId?: string;
}

export function AddPageMenu({ children, sourceId }: AddPageMenuProps) {
  const addMenuOptions: MenuItemProps[] = useMemo(
    () => [
      {
        icon: (
          <IconContainer>
            <FileText className="size-7 stroke-fillout-orange100" />
          </IconContainer>
        ),
        title: 'Form',
        description: 'Page to collect user input',
        type: NodeTypes.page,
      },
      {
        icon: (
          <IconContainer>
            <FileText className="size-7 stroke-fillout-orange100" />
          </IconContainer>
        ),
        title: 'Cover',
        description: 'Welcome users to your form',
        type: NodeTypes.cover,
      },
      {
        icon: (
          <IconContainer>
            <FileText className="size-7 stroke-fillout-orange100" />
          </IconContainer>
        ),
        title: 'Ending',
        description: 'Show a thank you page or redirect users',
        type: NodeTypes.ending,
      },
      {
        icon: (
          <IconContainer>
            <FileText className="size-7 stroke-fillout-orange100" />
          </IconContainer>
        ),
        title: 'Review',
        description: 'Let users review their submission',
        type: NodeTypes.page,
      },
      {
        icon: (
          <IconContainer>
            <FileText className="size-7 stroke-fillout-orange100" />
          </IconContainer>
        ),
        title: 'Payment',
        description: 'Collect payments with Stripe',
        type: NodeTypes.page,
      },
      {
        icon: (
          <IconContainer>
            <FileText className="size-7 stroke-fillout-orange100" />
          </IconContainer>
        ),
        title: 'Login',
        description: 'Let users login with email, password or SSO',
        type: NodeTypes.page,
      },
      {
        icon: (
          <IconContainer>
            <FileText className="size-7 stroke-fillout-orange100" />
          </IconContainer>
        ),
        title: 'Scheduling',
        description: 'Book meetings on your calendar',
        type: NodeTypes.page,
      },
    ],
    []
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="top" sideOffset={9}>
        <DropdownMenuLabel>Choose a page type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {addMenuOptions.map(({ title, icon, description, type }) => (
          <MenuItem
            key={title}
            icon={icon}
            title={title}
            description={description}
            type={type}
            sourceId={sourceId}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface MenuItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  type: NodeTypes;
  sourceId?: string;
}
function MenuItem({ icon, title, description, type, sourceId }: MenuItemProps) {
  const { setNodes, nodes, setEdges } = useNavFlow();

  const handleClick = useCallback(() => {
    if (nodes.length === DEFAULT_MAX_PAGES) {
      return;
    }
    const newNode = nodeFactory(type);
    const newNodes = [...nodes];
    const addPageNode = newNodes.pop();
    if (sourceId) {
      const sourceIndex = newNodes.findIndex((node) => node.id === sourceId);
      newNodes.splice(sourceIndex + 1, 0, newNode);
    } else {
      newNodes.push(newNode);
    }
    if (addPageNode) {
      newNodes.push(addPageNode);
    }

    const layoutedNodes = layoutNodes(newNodes);

    const newEdges = createEdges(layoutedNodes);
    setNodes(layoutedNodes);
    setEdges(newEdges);
  }, [nodes, setEdges, setNodes, sourceId, type]);

  return (
    <DropdownMenuItem
      className="flex items-center gap-2 pl-5"
      onClick={handleClick}
    >
      <div>{icon}</div>
      <div>
        <h4 className="text-black font-medium">{title}</h4>
        <p className="text-gray-500">{description}</p>
      </div>
    </DropdownMenuItem>
  );
}

interface IconContainerProps {
  children: ReactNode;
}
function IconContainer({ children }: IconContainerProps) {
  return <div className="p-1 border-amber-600 bg-amber-100">{children}</div>;
}
