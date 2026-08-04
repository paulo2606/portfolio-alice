// posicoes aproximadas (% da altura total da pagina) para cair perto de
// Sobre mim, O que faço, Diferenciais e Contato — nessa ordem
const CLUSTER_POSITIONS = ["20%", "42%", "63%", "84%"];

function BlobCluster({ top }: { top: string }) {
  return (
    <div className="absolute left-1/2 w-screen -translate-x-1/2" style={{ top }}>
      <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,var(--color-rose-soft),var(--color-blush-soft),var(--color-rose),var(--color-blush-soft),var(--color-rose-soft))] opacity-40 blur-3xl" />
      <div className="absolute -right-[140px] -top-[160px] h-[380px] w-[380px] rounded-full bg-[rgba(219,112,147,0.28)] blur-[10px] [mask-image:radial-gradient(circle,black_35%,transparent_70%)]" />
      <div className="absolute -bottom-[140px] -left-[120px] h-[320px] w-[320px] rounded-full bg-[rgba(219,112,147,0.28)] opacity-80 blur-[10px] [mask-image:radial-gradient(circle,black_35%,transparent_70%)]" />
      <span className="absolute left-[8%] top-[12%] text-[22px] text-[#d2577a] opacity-55">✦</span>
      <span className="absolute right-[10%] top-[22%] text-sm text-[#d2577a] opacity-55">✦</span>
      <span className="absolute bottom-[14%] right-[14%] text-lg text-[#d2577a] opacity-55">✦</span>
    </div>
  );
}

export function PageBlobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {CLUSTER_POSITIONS.map((top) => (
        <BlobCluster key={top} top={top} />
      ))}
    </div>
  );
}
