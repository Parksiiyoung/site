import type { ShareTarget } from '@/types';

interface ShareData {
  url: string;
  text: string;
  image: string;
}

const enc = encodeURIComponent;

const SHARE_URLS: Record<Exclude<ShareTarget, 'kakaotalk' | 'copy' | 'instagram'>, (data: ShareData) => string> = {
  twitter: (d) => `https://twitter.com/intent/tweet?url=${enc(d.url)}&text=${enc(d.text)}`,
  threads: (d) => `https://www.threads.net/intent/post?text=${enc(d.text + ' ' + d.url)}`,
  facebook: (d) => `https://www.facebook.com/sharer/sharer.php?u=${enc(d.url)}`,
  pinterest: (d) => `https://pinterest.com/pin/create/button/?url=${enc(d.url)}&media=${enc(d.image)}&description=${enc(d.text)}`,
  reddit: (d) => `https://reddit.com/submit?url=${enc(d.url)}&title=${enc(d.text)}`,
};

export async function share(target: ShareTarget, data: ShareData): Promise<void> {
  if (target === 'copy') {
    await navigator.clipboard.writeText(data.url);
    return;
  }

  if (target === 'instagram') {
    // Mobile deep link for Instagram Stories
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title: data.text, url: data.url });
    }
    return;
  }

  if (target === 'kakaotalk') {
    // KakaoTalk requires SDK — skip for now
    await navigator.clipboard.writeText(data.url);
    return;
  }

  const urlBuilder = SHARE_URLS[target];
  if (urlBuilder) {
    window.open(urlBuilder(data), '_blank', 'noopener,noreferrer,width=600,height=400');
  }
}
