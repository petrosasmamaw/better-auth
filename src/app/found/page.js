import ItemsList from '@/components/ItemsList';
import ItemForm from '@/components/ItemForm';
import AuthRequiredPage from '@/components/AuthRequiredPage';
import LostFoundToggle from '@/components/LostFoundToggle';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata = { title: 'Found Items' };

export default async function FoundPage() {
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
    return <AuthRequiredPage page="Found Items" />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Found Items</h1>
            <span className="text-4xl">✨</span>
          </div>
          <p className="text-slate-600 text-lg">Items waiting for their owners</p>
        </header>

        <LostFoundToggle type="found" userId={userId} formTitle="Report Found Item" formIcon="📝" />
      </div>
    </main>
  );
}
