import Link from 'next/link';

export default function AuthRequiredPage({ page = 'page' }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-3xl flex items-center justify-center text-5xl shadow-lg">
              🔐
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Access Restricted
            </h1>
            <p className="text-xl text-slate-600">
              You need to sign in to access this {page}
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-500 text-lg leading-relaxed">
            Create an account or sign in to report lost items, browse found items, manage your listings, and connect with other users in your community.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="space-y-2 p-4 bg-blue-50 rounded-2xl">
              <div className="text-3xl">📋</div>
              <p className="font-semibold text-slate-900">Report Items</p>
              <p className="text-sm text-slate-600">Post lost or found items</p>
            </div>
            <div className="space-y-2 p-4 bg-emerald-50 rounded-2xl">
              <div className="text-3xl">💬</div>
              <p className="font-semibold text-slate-900">Connect</p>
              <p className="text-sm text-slate-600">Message other users</p>
            </div>
            <div className="space-y-2 p-4 bg-purple-50 rounded-2xl">
              <div className="text-3xl">📊</div>
              <p className="font-semibold text-slate-900">Manage</p>
              <p className="text-sm text-slate-600">View your dashboard</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/auth/login"
              className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg text-lg"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="flex-1 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg text-lg"
            >
              Create Account
            </Link>
          </div>

          {/* Footer */}
          <p className="text-sm text-slate-500 pt-4 border-t border-slate-200">
            Don't have an account? <Link href="/auth/register" className="text-emerald-600 font-semibold hover:underline">Register now</Link> to get started
          </p>
        </div>
      </div>
    </main>
  );
}
