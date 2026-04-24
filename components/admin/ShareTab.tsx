"use client";

export default function ShareTab() {
  const websiteUrl = "https://elpuestito.vercel.app"; 
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(websiteUrl)}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "El Puestito Café",
          text: "¡Pedí tu café al paso sin hacer filas!",
          url: websiteUrl,
        });
      } catch (err) {
        console.log("Error al compartir", err);
      }
    } else {
      // Si está en PC, copiamos al portapapeles
      navigator.clipboard.writeText(websiteUrl);
      alert("¡Link copiado al portapapeles!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-700 max-w-sm mx-auto">
      <h2 className="text-2xl font-black mb-6 text-neutral-900 dark:text-white">Código QR</h2>
      
      <div className="bg-white p-4 rounded-2xl shadow-md border-4 border-neutral-100 mb-6">
        <img src={qrUrl} alt="QR Code El Puestito" className="w-48 h-48" />
      </div>

      <p className="text-neutral-500 dark:text-neutral-400 mb-6 text-center text-sm">
        Los clientes pueden escanear este código en el mostrador para ir directo a la web.
      </p>

      <button onClick={handleShare} className="w-full bg-[#009EE3] hover:bg-[#008AC7] text-white font-bold py-4 rounded-xl transition-colors shadow-md">
        📲 Compartir Link
      </button>
    </div>
  );
}