import Link from 'next/link';

export default function Home() {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Witaj w Smacznej Kawusi</h1>
            <p className="mb-4">Wybierz tryb gry:</p>
            <div className="flex flex-wrap justify-center gap-4">
                {[4, 5, 6, 7, 8].map((length) => (
                    <Link
                        key={length}
                        href={`/game/${length}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {length} Liter
                    </Link>
                ))}
            </div>
        </div>
    );
}
