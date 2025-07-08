'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ReactFlowProvider,
} from '@xyflow/react';

type NavFlowContextType = {
  nodes: Node[];
  setNodes: ReturnType<typeof useNodesState>[1];
  edges: Edge[];
  setEdges: ReturnType<typeof useEdgesState>[1];
};

const NavFlowContext = createContext<NavFlowContextType | undefined>(undefined);

type NavFlowProviderProps = {
  initialNodes: Node[];
  children: ReactNode;
};

export const NavFlowProvider: React.FC<NavFlowProviderProps> = ({
  initialNodes,
  children,
}) => {
  const [nodes, setNodes] = useNodesState([] as Node[]);
  const [edges, setEdges] = useEdgesState([] as Edge[]);

  useEffect(() => {
    // Setting here so we will always have the initial node on client side
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  return (
    <ReactFlowProvider>
      <NavFlowContext.Provider value={{ nodes, setNodes, edges, setEdges }}>
        {children}
      </NavFlowContext.Provider>
    </ReactFlowProvider>
  );
};

export const useNavFlow = () => {
  const context = useContext(NavFlowContext);
  if (!context) {
    throw new Error('useNavFlow must be used within a NavFlowProvider');
  }
  return context;
};
