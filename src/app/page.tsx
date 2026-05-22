import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
      <p className="mt-2 text-gray-600">You are logged in as {session.user.role}.</p>
      <div className="mt-4 flex gap-4">
        <Link href="/admin" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Go to Admin
        </Link>
        <Link href="/api/auth/signout" className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
          Sign Out
        </Link>
      </div>
    </div>
  );
}
