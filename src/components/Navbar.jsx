import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Navbar() {
  const headersList = await headers(); // ✅ FIX
  const cookieHeader = headersList.get("cookie") || "";

  const session = await auth.api.getSession({
    headers: { cookie: cookieHeader },
  });

  async function signOutAction(formData) {
    "use server";

    const headersList = await headers(); // ✅ FIX
    const signOutCookie = headersList.get("cookie") || "";

    await auth.api.signOut({
      headers: { cookie: signOutCookie },
    });

    redirect("/");
  }

  return (
    <header className="w-full py-6 "
    style={{
            backgroundImage: "url('https://i.pinimg.com/1200x/17/7f/b6/177fb6426b63749fcaf9dab67789aed9.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
      <div className="flex justify-center">
        <div
          className="relative rounded-full px-4 py-3 shadow-2xl"
          style={{
            backgroundImage: "url('https://i.pinimg.com/1200x/90/88/40/908840612a991abe3cac0cc9c5458b9a.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-white/6 backdrop-blur-sm border border-white/10">
            
            {/* left icon circle */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 shadow-inner">
              <span className="text-white text-xl">🍃</span>
            </div>

            {/* centered nav buttons */}
            <nav className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 text-white/90 hover:bg-white/30 transition-shadow">
                🏠 <span className="hidden sm:inline">Home</span>
              </Link>

              <Link href="/lost-and-found" className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-emerald-700 font-semibold shadow-sm">
                🔎 <span className="hidden sm:inline">Lost &amp; Found</span>
              </Link>

              <Link href="/about" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 text-white/90 hover:bg-white/30 transition-shadow">
                ℹ️ <span className="hidden sm:inline">About</span>
              </Link>
            </nav>

            {/* right: auth actions */}
            <div className="ml-4 hidden sm:flex items-center gap-3">
              {!session?.user ? (
                <>
                  <Link href="/auth/login" className="px-4 py-2 rounded-full bg-white/20 text-white/90 hover:bg-white/30">
                    Sign in
                  </Link>
                  <Link href="/auth/register" className="px-4 py-2 rounded-full bg-white text-emerald-700 font-semibold">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-white/90 px-3">
                    {session.user?.name || session.user?.email}
                  </span>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-white/20 text-white/90 hover:bg-white/30"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}