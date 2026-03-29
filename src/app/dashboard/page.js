import ItemsList from '@/components/ItemsList';
import AuthRequiredPage from '@/components/AuthRequiredPage';
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

  // Show auth required page if not logged in
  if (!userId) {
    return <AuthRequiredPage page="Dashboard" />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-purple-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">My Dashboard</h1>
              {userName && <p className="text-slate-600 text-lg mt-2">Welcome back, <span className="font-semibold text-slate-900">{userName}</span></p>}
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span>📦</span> My Items
          </h2>
          <ItemsList userId={userId} gridLayout={true} isDashboard={true} />
        </section>
      </div>
    </main>
  );
}
