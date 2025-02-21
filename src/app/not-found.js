import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
        Go Back Home
      </Link>
    </div>
  );
}
