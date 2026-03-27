import ItemsList from '@/components/ItemsList';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie') || '';

  let userId = null;
  let userName = null;
  
  try {
    const session = await auth.api.getSession({
      headers: { cookie: cookieHeader },
    });

    if (session?.user?.id) {
      userId = session.user.id;
      userName = session.user?.name || session.user?.email;
    }
  } catch (err) {
    console.error('Failed to get session:', err);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Dashboard</h1>
            {userName && <p className="text-sm text-slate-600 mt-1">Welcome, {userName}</p>}
          </div>
        </header>

        <section>
          <h2 className="font-semibold mb-3">My Items</h2>
          {userId ? (
            <ItemsList userId={userId} />
          ) : (
            <div className="p-4 text-center text-slate-500 border border-dashed rounded">
              Please log in to see your items
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
