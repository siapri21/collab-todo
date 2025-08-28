export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Todo Collab</span>
        <a href="#" className="hover:underline">Confidentialité</a>
      </div>
    </footer>
  );
}
