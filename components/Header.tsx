export default function Header() {
  return (
    <header className="bg-white px-5 pt-16 pb-12 mb-10 rounded-b-[32px] shadow-sm border-b border-neutral-100 animate-fade-in-up">
      <div className="max-w-md mx-auto text-center relative flex flex-col items-center">
        
        {/* Emoji animado */}
        <div className="text-5xl mb-3 animate-subtle-pulse select-none">
          ☕
        </div>

        {/* Título principal */}
        <h1 className="text-4xl font-extrabold text-neutral-800 mb-4 tracking-tighter leading-none">
          El Puestito <span className="text-neutral-400">Café</span>
        </h1>
        
        {/* Descripción */}
        <p className="text-neutral-600 text-lg leading-relaxed max-w-[280px]">
          Haceme tu pedido por WhatsApp y te lo preparo al instante.
        </p>

      </div>
    </header>
  );
}