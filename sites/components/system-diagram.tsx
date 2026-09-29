import type { ArchitectureNode } from '@/content/site';

export function SystemDiagram({
  nodes,
  label = 'System flow',
}: {
  nodes: ArchitectureNode[];
  label?: string;
}) {
  return (
    <figure className="system-diagram" aria-label={label}>
      <div className="diagram-axis" aria-hidden="true" />
      {nodes.map((node, index) => (
        <div className="diagram-node" key={`${node.label}-${index}`}>
          <span className="diagram-index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <strong>{node.label}</strong>
            <span>{node.detail}</span>
          </div>
          {index < nodes.length - 1 ? <span className="diagram-pulse" aria-hidden="true" /> : null}
        </div>
      ))}
    </figure>
  );
}
