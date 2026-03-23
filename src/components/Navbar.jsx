import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full py-6 bg-transparent">
      <div className="flex justify-center">
        <div className="relative rounded-full px-4 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-2xl">
          <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-white/6 backdrop-blur-sm border border-white/10">
            {/* left icon circle */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 shadow-inner">
              <span className="text-white text-xl">🍃</span>
            </div>

            {/* centered nav buttons */}
            <nav className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 text-white/90 hover:bg-white/30 transition-shadow">🏠 <span className="hidden sm:inline">Home</span></Link>

              <Link href="/lost-and-found" className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-emerald-700 font-semibold shadow-sm">🔎 <span className="hidden sm:inline">Lost &amp; Found</span></Link>

              <Link href="/about" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 text-white/90 hover:bg-white/30 transition-shadow">ℹ️ <span className="hidden sm:inline">About</span></Link>
            </nav>

            {/* right placeholder or actions */}
            <div className="ml-4 hidden sm:flex items-center">
              <button className="w-10 h-10 rounded-full bg-white/10 text-white/90 flex items-center justify-center">⋯</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
