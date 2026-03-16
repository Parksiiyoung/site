'use client';

interface SentencePageFrameProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  mainClassName?: string;
}

function joinClasses(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export function SentencePageFrame({
  children,
  footer,
  header,
  mainClassName,
}: SentencePageFrameProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {header ? (
        <header className="sentence-bar-surface sticky top-0 z-40">
          <div className="site-shell sentence-bar-shell sentence-bar-shell--header">{header}</div>
        </header>
      ) : null}

      <main className={joinClasses('flex-1', mainClassName)}>
        {children}
      </main>

      {footer ? (
        <div className="sentence-bar-surface">
          <div className="site-shell sentence-bar-shell sentence-bar-shell--footer">{footer}</div>
        </div>
      ) : null}
    </div>
  );
}
