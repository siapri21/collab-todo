export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full py-6 text-center bg-blue-700 text-white text-3xl font-bold">
        Todo Collab
      </header>
      <main className="w-full max-w-md mx-auto mt-8">
        {children}
      </main>
    </div>
  );
}