import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gradient-to-b from-slate-50 to-blue-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white text-lg font-bold">
                📚
              </div>
              <div>
                <h3 className="text-blue-900 font-bold text-lg leading-tight">UniFind</h3>
                <p className="text-xs text-slate-600">Lost & Found</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Helping university students reunite with their lost belongings through community support and smart matching.
            </p>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-blue-900 font-bold text-sm mb-4 uppercase tracking-wide">Contact Us</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-600 mb-1">Email:</p>
                <a href="mailto:hello@unifind.com" className="text-blue-600 hover:text-blue-900 transition-colors text-sm font-medium">
                  hello@unifind.com
                </a>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-600 mb-2">Follow us:</p>
                <div className="flex gap-3">
                  <a href="#twitter" className="text-xl hover:scale-110 transition-transform">🐦</a>
                  <a href="#facebook" className="text-xl hover:scale-110 transition-transform">📘</a>
                  <a href="#instagram" className="text-xl hover:scale-110 transition-transform">📷</a>
                  <a href="#linkedin" className="text-xl hover:scale-110 transition-transform">💼</a>
                </div>
              </div>
            </div>
          </div>

          {/* Created By Section */}
          <div className="md:col-span-1">
            <h4 className="text-blue-900 font-bold text-sm mb-4 uppercase tracking-wide">Crafted With Care</h4>
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-200 text-center">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-sm font-semibold text-blue-900 mb-2">Created for UniFind</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Built with passion to help students reconnect with their belongings and foster community on campus.
              </p>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-slate-600">
                  <span className="text-xl">💡</span> Smart. Simple. Community-Driven.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600 text-center md:text-left">
            © {currentYear} <span className="font-semibold text-blue-900">UniFind</span>. All rights reserved. BY NEHEMIAH00
          </p>
          
          <div className="flex items-center gap-3">
            <a href="#terms" className="text-xs text-slate-600 hover:text-blue-900 transition-colors font-medium">
              Terms
            </a>
            <span className="text-slate-300">•</span>
            <a href="#privacy" className="text-xs text-slate-600 hover:text-blue-900 transition-colors font-medium">
              Privacy
            </a>
            <span className="text-slate-300">•</span>
            <a href="#cookies" className="text-xs text-slate-600 hover:text-blue-900 transition-colors font-medium">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600"></div>
    </footer>
  );
}
