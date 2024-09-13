import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';

export const metadata: Metadata = {
    title: 'Smacznej Kawusi',
    description: 'Polska gra w zgadywanie imion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl">
            <body className="bg-gray-100 text-gray-900">
                <Navigation />
                <main className="container mx-auto p-4">{children}</main>
            </body>
        </html>
    );
}
