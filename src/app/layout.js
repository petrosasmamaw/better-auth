import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../components/NavbarWrapper";
import ClientProvider from '../components/ClientProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UniFind - University Lost & Found",
  description: "A community platform to report lost items, browse found materials, and reconnect with your belongings across campus.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClientProvider>
          <NavbarWrapper />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
