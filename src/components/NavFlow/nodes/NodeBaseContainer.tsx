import { ReactNode } from 'react';

interface NodeBaseContainerProps {
  children: ReactNode;
  selected?: boolean;
}

export function NodeBaseContainer({
  children,
  selected,
}: NodeBaseContainerProps) {
  return (
    <div
      className={`
        flex items-center justify-center
        px-2.5 py-1.5 gap-1.5
        rounded-md cursor-pointer
        transition-all duration-200
        
        ${
          selected
            ? 'bg-white border border-fillout-gray100 shadow-sm text-fillout-orange100' // Active state
            : 'bg-fillout-gray150/15 text-fillout-default-icon border border-transparent' // Default state
        }

        hover:bg-fillout-gray150/35
        
        focus:outline-none focus:ring-1  focus:ring-fillout-blue100/25 focus:border focus:border-fillout-blue100 
      `}
      tabIndex={0} // Makes the div focusable
    >
      {children}
    </div>
  );
}
