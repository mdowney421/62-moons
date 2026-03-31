export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-900 py-8 px-4 text-center text-gray-500 text-sm">
      <p className="mb-2 uppercase tracking-widest font-bold">
        62 Moons © 2026 | Chicago, IL
      </p>
      <p>
        Designed and built by{" "}
        <a
          href="https://mattdowneydev.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-500 underline"
        >
          Matt Downey
        </a>
      </p>
    </footer>
  );
}
