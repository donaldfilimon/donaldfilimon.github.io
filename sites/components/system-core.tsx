import {
  BrainCircuit,
  Braces,
  CircleCheck,
  Cpu,
  DatabaseZap,
  Fingerprint,
} from 'lucide-react';

const coreNodes = [
  {
    className: 'core-node-abi',
    icon: BrainCircuit,
    label: 'ABI',
    detail: 'Governed runtime',
  },
  {
    className: 'core-node-memory',
    icon: DatabaseZap,
    label: 'WDBX',
    detail: 'Causal memory',
  },
  {
    className: 'core-node-native',
    icon: Cpu,
    label: 'Native',
    detail: 'Swift systems',
  },
  {
    className: 'core-node-compiler',
    icon: Braces,
    label: 'Compiler',
    detail: 'LLVM · MLIR',
  },
];

export function SystemCore() {
  return (
    <figure className="system-core" aria-labelledby="system-core-caption">
      <div className="core-toolbar">
        <span>
          <i aria-hidden="true" /> System architecture
        </span>
        <span>Local / controlled</span>
      </div>

      <div className="core-stage">
        <div className="core-coordinate coordinate-x" aria-hidden="true" />
        <div className="core-coordinate coordinate-y" aria-hidden="true" />
        <div className="core-ring core-ring-outer" aria-hidden="true" />
        <div className="core-ring core-ring-inner" aria-hidden="true" />
        <div className="core-sweep" aria-hidden="true" />

        <div className="core-center">
          <Fingerprint aria-hidden="true" />
          <small>System core</small>
          <strong>DF / 01</strong>
          <span>Intent → evidence</span>
        </div>

        {coreNodes.map(({ className, icon: Icon, label, detail }, index) => (
          <div className={`core-node ${className}`} key={label}>
            <span className="core-node-index">0{index + 1}</span>
            <Icon aria-hidden="true" />
            <span>
              <strong>{label}</strong>
              <small>{detail}</small>
            </span>
          </div>
        ))}
      </div>

      <figcaption className="core-readout" id="system-core-caption">
        <span>
          <CircleCheck aria-hidden="true" /> Authority boundaries explicit
        </span>
        <span>Evidence attached</span>
      </figcaption>
    </figure>
  );
}
