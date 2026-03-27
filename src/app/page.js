import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-20 pb-10 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200 to-transparent rounded-full blur-3xl opacity-40 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-200 to-transparent rounded-full blur-3xl opacity-40 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Welcome to UniFind</p>
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900">
                  Never Lose Track of What Matters
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  UniFind is your campus's trusted community hub for lost and found items. Report what you've lost, discover what others have found, and reconnect with your belongings quickly and easily.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/lost" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 text-center">
                  📌 Report Lost Item
                </Link>
                <Link href="/found" className="px-8 py-4 rounded-full bg-white border-2 border-slate-200 text-slate-900 font-bold text-lg hover:border-blue-600 hover:shadow-lg transition-all duration-300 text-center">
                  🔍 Browse Found Items
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
                <div>
                  <p className="text-3xl font-bold text-slate-900">1000+</p>
                  <p className="text-sm text-slate-600">Items Listed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">500+</p>
                  <p className="text-sm text-slate-600">Reunited</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">100%</p>
                  <p className="text-sm text-slate-600">Community Driven</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 lg:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-pink-100 rounded-3xl opacity-50"></div>
              <div className="relative z-10 text-center space-y-4">
                <div className="text-8xl">📦</div>
                <p className="text-slate-600 font-semibold">Smart Item Management</p>
                <p className="text-sm text-slate-500">Post, track, and find items in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              How UniFind Works
            </h2>
            <p className="text-lg text-slate-600">Simple, fast, and effective lost & found management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Search & Browse</h3>
              <p className="text-slate-600">
                Easily browse through recently found items or search for your lost belongings across campus
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Report Instantly</h3>
              <p className="text-slate-600">
                Post your lost or found items with photos and descriptions within minutes
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-lg transition-all duration-300">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Connect & Chat</h3>
              <p className="text-slate-600">
                Message other users directly to verify items and arrange quick handovers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white">
            Ready to Find Your Lost Items?
          </h2>
          <p className="text-xl text-blue-50">
            Join our community and reunite with your belongings today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lost" className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold text-lg hover:shadow-lg transition-all duration-300">
              Report Lost Item
            </Link>
            <Link href="/found" className="px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all duration-300">
              Check Found Items
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">📦 For Lost Items</h3>
              <p className="text-slate-600">
                Post details about your missing items including photos, descriptions, and location to help others identify and return them
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">🔍 For Found Items</h3>
              <p className="text-slate-600">
                Browse through found items posted by community members and help reunite owners with their belongings
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">💬 Stay Connected</h3>
              <p className="text-slate-600">
                Use our built-in chat feature to communicate with other users and successfully transfer items
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
