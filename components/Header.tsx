export default function Header() {
  return (
    <header className="bg-white px-5 pt-16 pb-12 mb-10 rounded-b-[32px] shadow-sm border-b border-neutral-100 animate-fade-in-up">
      <div className="max-w-md mx-auto text-center relative flex flex-col items-center">
        
        {/* Logo principal */}
        <div className="mb-6">
          <img 
            src="/logo-uno.png" 
            alt="Logo de Punto Café" 
            className="w-40 h-40 object-contain drop-shadow-sm" 
          />
        </div>
        
        {/* Descripción / Subtítulo */}
        <p className="text-neutral-600 text-lg leading-relaxed max-w-[280px] font-medium">
          Haceme tu pedido por WhatsApp y te lo preparo al instante.
        </p>

      </div>
    </header>
  );
}