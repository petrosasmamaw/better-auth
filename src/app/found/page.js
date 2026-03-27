import ItemsList from '@/components/ItemsList';
import ItemForm from '@/components/ItemForm';
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

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Found Items</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ItemsList type="found" userId={userId} />
          </div>
          <aside className="md:col-span-1 p-4 border rounded">
            <h3 className="font-semibold mb-3">Report Found Item</h3>
            <ItemForm defaultType="found" />
          </aside>
        </section>
      </div>
    </main>
  );
}
