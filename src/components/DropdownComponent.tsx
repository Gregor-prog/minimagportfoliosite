import { useId } from 'react';
import { HiChevronDown } from 'react-icons/hi';

interface DropdownProps {
  title: string;
  content: string[];
  isActive: boolean;
  onToggle: () => void;
}

export default function DropdownComponent({ title, content, isActive, onToggle }: DropdownProps) {
  const panelId = useId();

  return (
    <div className="surface-card">
      <h2>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-serif text-lg text-navy"
          aria-expanded={isActive}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {title}
          <HiChevronDown aria-hidden="true" className={isActive ? 'shrink-0 rotate-180 text-accent-strong' : 'shrink-0 text-accent-strong'} />
        </button>
      </h2>
      <div id={panelId} hidden={!isActive} className="space-y-2 border-t border-line px-5 py-4 text-muted">
        {content.map((detail, index) => <p key={index} className="whitespace-pre-line">{detail}</p>)}
      </div>
    </div>
  );
}
