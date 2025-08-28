import NavBar from "./NavBar.jsx";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen w-full relative bg-white">
      <NavBar />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top center,
              rgba(255, 140, 60, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
