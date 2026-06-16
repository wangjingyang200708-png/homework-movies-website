import "./globals.css";

export const metadata = {
  title: "Classic Film Archive",
  description: "A treasury of cinematic masterpieces",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <header className="sticky top-0 z-50 border-b backdrop-blur-sm"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "rgba(26, 20, 16, 0.85)"
          }}>
          <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
            <a href="/" className="group flex items-center gap-3 no-underline">
              <span className="text-2xl opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-gold)" }}>◆</span>
              <h1 className="text-xl tracking-[0.15em] font-cinzel font-semibold"
                style={{ color: "var(--color-gold)" }}>
                CLASSIC FILMS
              </h1>
            </a>
            <p className="text-sm tracking-wider italic opacity-60 max-sm:hidden"
              style={{ color: "var(--color-text-muted)" }}>
              "Every frame a painting, every film a legacy"
            </p>
          </div>
        </header>
        {children}
        <footer className="mt-auto border-t py-8 text-center"
          style={{ borderColor: "var(--color-border)" }}>
          <p className="text-sm tracking-wider opacity-40" style={{ color: "var(--color-text-muted)" }}>
            ❦ Classic Film Archive ❦ A Treasury of Cinematic Art ❦
          </p>
        </footer>
      </body>
    </html>
  );
}
