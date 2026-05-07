export function Navbar() {
  return (
    <header className="flex items-center justify-between px-10 h-16 text-xl font-bold bg-gray-200 border-b border-slate-100 shadow-sm">
      <a className="text-2xl tracking-tighter text-slate-900" href="/">
        Flower <span className="text-emerald-500">Trick</span>
      </a>

      <nav className="flex gap-8 items-center text-base font-semibold text-slate-600">
        <a className="hover:text-emerald-500 transition-colors" href="/">
          Home
        </a>
        <a className="hover:text-emerald-500 transition-colors" href="/pokemon">
          Pokémon
        </a>
        <a className="hover:text-emerald-500 transition-colors" href="/ability">
          Abilities
        </a>
        <a className="hover:text-emerald-500 transition-colors" href="/move">
          Moves
        </a>
        <a className="hover:text-emerald-500 transition-colors" href="/type">
          Types
        </a>
        <a
          className="hover:text-emerald-500 transition-colors"
          href="/pokemon-habitat"
        >
          Habitats
        </a>
        <a className="hover:text-emerald-500 transition-colors" href="/pokemon-color">
          Colors
        </a>
        <a className="hover:text-emerald-500 transition-colors" href="/pokemon-shape">
          Shapes
        </a>
      </nav>
    </header>
  );
}