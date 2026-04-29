"use client";

import { useState } from "react";

interface LoginFormProps {
  onLogin: (pin: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [pin, setPin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(pin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4 transition-colors">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center border border-neutral-100 dark:border-neutral-700">
        <h1 className="text-2xl font-black mb-2 text-neutral-900 dark:text-white">Acceso Restringido</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6">Solo personal autorizado</p>
        <input 
          type="password" 
          placeholder="Ingresa tu PIN" 
          value={pin} 
          onChange={(e) => setPin(e.target.value)} 
          className="w-full border-2 border-neutral-200 dark:border-neutral-600 p-4 rounded-xl mb-6 text-center text-2xl tracking-widest text-black dark:text-white bg-transparent focus:outline-none focus:border-[#009EE3] transition-colors" 
        />
        <button type="submit" className="w-full bg-neutral-900 dark:bg-white dark:text-black hover:bg-black text-white font-bold py-4 rounded-xl transition-colors shadow-md">
          Entrar al Panel
        </button>
      </form>
    </div>
  );
}