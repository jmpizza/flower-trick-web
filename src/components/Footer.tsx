import githubIcon from "../assets/icons/github-icon.svg";
import linkedinIcon from "../assets/icons/linkedin-icon.svg";

export function Footer() {
  return (
    <footer className="mt-20">
        <div className="bg-slate-50 border-t border-slate-200 p-10 text-center space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm font-medium text-slate-500 italic">
              This app is posible thanks to PokéAPI
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Created by Juan Espitia
              </p>
              <div className="flex gap-5">
                <a href="https://github.com/jmpizza/" className="hover:opacity-70 transition-opacity">
                  <img src={githubIcon} className="w-6 h-6" alt="GitHub" />
                </a>
                <a href="https://www.linkedin.com/in/jmpizza/" className="hover:opacity-70 transition-opacity">
                  <img src={linkedinIcon} className="w-6 h-6" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 max-w-xs mx-auto leading-tight uppercase font-semibold">
            All Pokémon and Pokémon characters names are trademark of Nintendo
          </div>
        </div>
    </footer>
  )
}