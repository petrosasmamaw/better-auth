import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-black">
      <main className="w-full max-w-4xl px-6 py-24">
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-2xl p-10 shadow-lg">
          <div className="flex items-center gap-6">
            <Image src="/next.svg" alt="logo" width={64} height={64} className="dark:invert" />
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">UniFind — Lost & Found</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
                A community space to report lost items, browse recently found
                materials, and reconnect with your belongings across campus.
                Start by searching items or reporting what you lost.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/lost" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800">lost items</Link>

            <Link href="/found" className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-gray-200 text-slate-700 dark:text-slate-300 hover:bg-gray-50">found items</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
