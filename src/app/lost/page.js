import ItemsList from '@/components/ItemsList';
import ItemForm from '@/components/ItemForm';
import AuthRequiredPage from '@/components/AuthRequiredPage';
import LostFoundToggle from '@/components/LostFoundToggle';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata = { title: 'Lost Items' };

export default async function LostPage() {
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie') || '';

  let userId = null;
  
  try {
    const session = await auth.api.getSession({
      headers: { cookie: cookieHeader },
    });
    userId = session?.user?.id || null;
  } catch (err) {
    console.error('Failed to get session:', err);
  }

  // Show auth required page if not logged in
  if (!userId) {
    return <AuthRequiredPage page="Lost Items" />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Lost Items</h1>
            <span className="text-4xl">🔍</span>
          </div>
          <p className="text-slate-600 text-lg">Help reunite items with their owners</p>
        </header>

        <LostFoundToggle type="lost" userId={userId} formTitle="Report Lost Item" formIcon="📝" />
      </div>
    </main>
  );
}
