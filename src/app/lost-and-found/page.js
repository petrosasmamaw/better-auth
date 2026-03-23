export const metadata = {
  title: "Lost & Found",
  description: "Report or find lost materials around campus",
};

export default function LostAndFoundPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Lost & Found</h1>
              <p className="mt-1 text-slate-600 dark:text-slate-300">Report lost items or browse recently found materials across campus.</p>
            </div>

            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <input type="search" placeholder="Search items, locations, tags..." className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100" />
                <button className="px-4 py-2 rounded-lg bg-slate-900 text-white">Search</button>
              </div>
            </div>
          </header>

          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800">
                <h2 className="font-semibold text-lg">How to report a lost item</h2>
                <ol className="pl-5 list-decimal text-slate-700 dark:text-slate-300 mt-2 space-y-2">
                  <li>Describe the item and where you last saw it.</li>
                  <li>Provide a contact method (phone or email).</li>
                  <li>Optional: attach a photo and any distinguishing marks.</li>
                </ol>
                <button className="mt-4 inline-block px-4 py-2 rounded-lg bg-emerald-600 text-white">Report an Item</button>
              </div>

              <div className="p-4 border rounded-lg bg-white dark:bg-slate-800">
                <h2 className="font-semibold text-lg">Tips for finding items</h2>
                <ul className="mt-2 text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Retrace your steps and check common areas.</li>
                  <li>Ask staff at the helpdesk — many items are handed in there.</li>
                  <li>Post clear descriptions so others can identify your item.</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-3 text-slate-800 dark:text-slate-200">Recently found items</h3>
              <div className="space-y-3">
                <article className="p-4 rounded-lg border bg-white dark:bg-slate-800 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600">📓</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 dark:text-slate-100">Blue notebook</strong>
                      <span className="text-sm text-slate-500">Library A · 2 days ago</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Small spiral notebook with a red sticker on the cover.</p>
                    <div className="mt-3">
                      <button className="px-3 py-1 rounded-md bg-sky-600 text-white text-sm">Claim</button>
                    </div>
                  </div>
                </article>

                <article className="p-4 rounded-lg border bg-white dark:bg-slate-800 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600">🆔</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 dark:text-slate-100">Student ID (Smith)</strong>
                      <span className="text-sm text-slate-500">Cafeteria · 1 day ago</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Unlaminated student ID — claim at the helpdesk.</p>
                    <div className="mt-3">
                      <button className="px-3 py-1 rounded-md bg-sky-600 text-white text-sm">Claim</button>
                    </div>
                  </div>
                </article>

                <article className="p-4 rounded-lg border bg-white dark:bg-slate-800 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600">🔌</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 dark:text-slate-100">USB drive</strong>
                      <span className="text-sm text-slate-500">Lecture Hall 3 · 5 days ago</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Black USB stick labelled 'Lecture notes'.</p>
                    <div className="mt-3">
                      <button className="px-3 py-1 rounded-md bg-sky-600 text-white text-sm">Claim</button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
