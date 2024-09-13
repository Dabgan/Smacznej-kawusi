import Link from 'next/link';

export default function Navigation() {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Smacznej Kawusi</h1>
                <Link href="/" className="hover:underline">
                    Strona główna
                </Link>
            </div>
        </nav>
    );
}
