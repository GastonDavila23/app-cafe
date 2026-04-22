export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-100 py-10 px-4">
      <div className="max-w-md mx-auto text-center mb-10 animate-pulse">
        <div className="h-10 bg-neutral-300 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-neutral-300 rounded w-1/2 mx-auto"></div>
      </div>
      <div className="max-w-md mx-auto grid grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-2">
        {/* Mostramos 4 tarjetas grises parpadeantes */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md h-96 animate-pulse p-4 flex flex-col">
            <div className="bg-neutral-300 h-48 w-full rounded-xl mb-4"></div>
            <div className="bg-neutral-300 h-6 w-3/4 mb-2 rounded"></div>
            <div className="bg-neutral-300 h-4 w-full mb-4 rounded flex-grow"></div>
            <div className="bg-neutral-300 h-12 w-full rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}