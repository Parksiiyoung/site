import Link from 'next/link';

const messages = {
  ko: { text: '아무리 찾아봐도 이 페이지는 없어요.', link: '홈으로 돌아가기' },
  en: { text: "we looked everywhere, but this page doesn't exist.", link: 'go back home' },
  ja: { text: 'どこを探してもこのページはありません。', link: 'ホームに戻る' },
};

export default function LocaleNotFound() {
  const locale = 'en';
  const msg = messages[locale as keyof typeof messages] || messages.en;

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="sentence-nav text-center text-[var(--color-text-muted)]">
        {msg.text}{' '}
        <Link
          href={`/${locale}`}
          className="underline transition-colors hover:text-[var(--color-text)]"
        >
          {msg.link}
        </Link>
        ?
      </p>
    </div>
  );
}
