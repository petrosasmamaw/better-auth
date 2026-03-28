import ClientProvider from '../../components/ClientProvider';

export default function ChatLayout({ children }) {
  return (
    <ClientProvider>
      {children}
    </ClientProvider>
  );
}
