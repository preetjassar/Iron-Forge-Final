import { Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa";

export default function NotFound() {
    return (
        <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
            <FaDumbbell className="text-orange-500 text-5xl mb-6" />
            <h1 className="font-display text-8xl text-orange-500">404</h1>
            <p className="text-2xl font-semibold mt-4">Looks like you skipped leg day on this page</p>
            <p className="text-gray-400 mt-2 mb-8">
                The page you're looking for doesn't exist or has moved.
            </p>
            <Link
                to="/"
                className="bg-orange-500 hover:bg-orange-400 text-black font-bold px-6 py-3 rounded-full transition"
            >
                Back to Home
            </Link>
        </section>
    );
}
