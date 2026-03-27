export const metadata = {
  title: "Lost & Found",
  description: "Report or find lost materials around campus",
};

export default function LostAndFoundPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-black py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur rounded-3xl shadow-xl p-8">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Lost & Found</h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-lg">Quickly report lost items, browse found goods, and connect with owners across campus.</p>
              <div className="mt-4 flex items-center gap-3">
                <a href="/lost" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 border border-red-100 shadow-sm">🔻 Lost</a>
                <a href="/found" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-100 shadow-sm">🔺 Found</a>
                <a href="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-800 border shadow-sm">📁 Dashboard</a>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="flex items-center bg-white border rounded-full p-2 shadow-sm">
                <input type="search" placeholder="Search items, locations, tags..." className="flex-1 px-4 py-2 rounded-full outline-none" />
                <button className="ml-2 px-4 py-2 rounded-full bg-slate-900 text-white">Search</button>
              </div>
            </div>
          </header>

          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <aside className="lg:col-span-1 space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border">
                <h3 className="font-semibold">How it works</h3>
                <ol className="pl-5 list-decimal text-slate-700 dark:text-slate-300 mt-2 space-y-2">
                  <li>Upload a photo and details about the item.</li>
                  <li>The owner or finder can message you from the item's page.</li>
                  <li>Claim and coordinate safely with other users.</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border">
                <h4 className="font-semibold mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 rounded bg-slate-100 text-slate-700">Electronics</button>
                  <button className="px-3 py-1 rounded bg-slate-100 text-slate-700">Documents</button>
                  <button className="px-3 py-1 rounded bg-slate-100 text-slate-700">Clothing</button>
                  <button className="px-3 py-1 rounded bg-slate-100 text-slate-700">Accessories</button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Recent Items</h3>
              <div className="space-y-4">
                {/* Placeholder for items list component (client-side) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border bg-white dark:bg-slate-800"> {/* card */}
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-slate-100 rounded overflow-hidden"> <img src="/next.svg" alt="" /></div>
                      <div className="flex-1">
                        <h4 className="font-semibold">Blue notebook</h4>
                        <p className="text-sm text-slate-600 mt-1">Library A · 2 days ago</p>
                        <p className="mt-2 text-sm text-slate-700">Small spiral notebook with a red sticker on the cover.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border bg-white dark:bg-slate-800"> {/* card */}
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-slate-100 rounded overflow-hidden"> <img src="/next.svg" alt="" /></div>
                      <div className="flex-1">
                        <h4 className="font-semibold">Student ID (Smith)</h4>
                        <p className="text-sm text-slate-600 mt-1">Cafeteria · 1 day ago</p>
                        <p className="mt-2 text-sm text-slate-700">Unlaminated student ID — claim at the helpdesk.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
