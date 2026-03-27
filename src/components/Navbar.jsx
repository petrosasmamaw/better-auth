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
    <header className="w-full py-1 sm:py-3 md:py-4 bg-white overflow-x-auto">
      <div className="flex justify-center px-1 sm:px-4">
        <div className="w-full max-w-6xl rounded-2xl sm:rounded-3xl bg-white shadow-lg p-1.5 sm:p-3 md:p-4 border border-gray-100">
          <div className="flex items-center justify-between gap-1 sm:gap-3 md:gap-6 flex-nowrap">
            
            {/* Logo Section */}
            <div className="flex items-center gap-0.5 sm:gap-2 min-w-fit">
              <div className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-blue-900 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                <span>📚</span>
              </div>
              <div className="hidden xs:block sm:block">
                <div className="text-blue-900 font-bold text-[10px] sm:text-sm md:text-lg leading-tight">UNIVERSITY</div>
                <div className="text-blue-900 font-bold text-[10px] sm:text-sm md:text-lg leading-tight">
                  BIT
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-0.5 sm:gap-2 md:gap-3 flex-1 justify-center flex-nowrap overflow-x-auto">
              <Link href="/" className="px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm md:text-base text-gray-700 hover:bg-gray-100 transition-colors font-medium whitespace-nowrap flex-shrink-0">
                Home
              </Link>

              {session?.user ? (
                <>
                  <Link href="/lost" className="px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm md:text-base bg-blue-900 text-white font-semibold transition-colors whitespace-nowrap flex-shrink-0">
                    Lost Items
                  </Link>
                  <Link href="/found" className="px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm md:text-base text-gray-700 hover:bg-gray-100 transition-colors font-medium whitespace-nowrap flex-shrink-0">
                    Found Items
                  </Link>
                  <Link href="/dashboard" className="px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm md:text-base text-gray-700 hover:bg-gray-100 transition-colors font-medium flex items-center gap-0.5 whitespace-nowrap flex-shrink-0">
                    <span>⊞</span> <span>Dashboard</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/lost-and-found" className="px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm md:text-base bg-blue-900 text-white font-semibold transition-colors whitespace-nowrap flex-shrink-0">
                    Lost &amp; Found
                  </Link>
                </>
              )}
            </nav>

            {/* User Section */}
            <div className="flex items-center gap-0.5 sm:gap-2 md:gap-4 min-w-fit flex-shrink-0">
              {!session?.user ? (
                <>
                  <Link href="/auth/login" className="px-1.5 sm:px-3 md:px-4 py-1 sm:py-2 text-[10px] sm:text-sm md:text-base text-gray-700 font-medium hover:bg-gray-100 rounded-full transition-colors whitespace-nowrap">
                    Sign in
                  </Link>
                  <Link href="/auth/register" className="px-2 sm:px-4 md:px-5 py-1 sm:py-2 text-[10px] sm:text-sm md:text-base bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors whitespace-nowrap">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1 sm:gap-3 border-l border-gray-200 pl-1 sm:pl-2 md:pl-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-[9px] sm:text-sm flex-shrink-0">
                      {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
                    </div>
                    <div className="hidden md:block whitespace-nowrap">
                      <div className="text-gray-900 font-semibold text-[10px] md:text-sm">
                        {session.user?.name || session.user?.email}
                      </div>
                    </div>
                  </div>
                  <form action={signOutAction} className="flex-shrink-0">
                    <button
                      type="submit"
                      className="text-[10px] sm:text-sm md:text-base text-red-600 font-medium hover:text-red-700 transition-colors whitespace-nowrap"
                    >
                      Sign Out
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