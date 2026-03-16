import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white text-[#111]">
        <div className="text-center">
          <p
            className="sentence-nav text-[var(--color-text-muted)]"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.6,
            }}
          >
            we looked everywhere, but this page doesn&apos;t exist.{' '}
            <Link href="/en" className="underline transition-colors hover:text-[#111]">
              go back home
            </Link>
            ?
          </p>
        </div>
      </body>
    </html>
  );
}
