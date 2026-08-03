export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-ink text-paper">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero.mp4"
        poster="/video/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />
      <div className="relative z-10 flex w-full flex-col gap-6 px-6 pb-16 sm:px-12 sm:pb-24">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-rose-soft">
          storymaker
        </p>
        <h1 className="font-display text-5xl italic leading-tight sm:text-7xl">
          Alice Santos
        </h1>
        <a
          href="#o-que-eu-faco"
          className="mt-4 inline-flex w-fit items-center gap-2 border-b border-rose-soft pb-1 font-body text-base transition-colors hover:text-rose focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
        >
          Conhecer o trabalho
        </a>
      </div>
    </section>
  );
}
