import Image from "next/image";

export function AboutMe() {
  return (
    <section id="sobre-mim" className="relative py-24">
      <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="flex h-full items-center justify-center">
          <Image
            src="/images/alice-foto.png"
            alt="Foto de Alice Santos"
            width={720}
            height={720}
            className="h-[28rem] w-full animate-blob object-cover object-[center_15%] shadow-[0_30px_60px_-30px_rgba(36,20,23,0.45)] sm:h-[34rem]"
            priority
          />
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-rose-soft">
            <span className="block h-1.5 w-1.5 rounded-full bg-rose" />
            Sobre mim
          </div>
          <h2 className="font-display text-4xl italic text-rose sm:text-5xl">
            Histórias visuais com alma e personalidade
          </h2>
          <p className="max-w-prose font-body text-base leading-8 text-ink/80 sm:text-lg">
            Sou criadora de conteúdo que une estética autoral e estratégia de
            storytelling. A cada foto, story e vídeo, trabalho para que a
            mensagem venha com sentimento, ritmo e presença reconhecível.
          </p>
          <p className="max-w-prose font-body text-base leading-8 text-ink/80 sm:text-lg">
            Meu processo envolve direção de arte, edição criativa e atenção
            ao estilo que faz a marca se destacar sem perder naturalidade.
            Aqui, cada projeto nasce pensado para encantar e conectar.
          </p>
        </div>
      </div>
    </section>
  );
}
