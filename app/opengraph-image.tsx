import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/seo';

export const alt = `${SITE_NAME} — open comparison of game backend platforms`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default social-share card. Neutral by design: no platform is named or ranked.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0f0f0f',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
          <div style={{ width: 36, height: 56, borderRadius: 8, background: '#22c55e' }} />
          <div style={{ width: 36, height: 96, borderRadius: 8, background: '#4ade80' }} />
          <div style={{ width: 36, height: 136, borderRadius: 8, background: '#86efac' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            Compare Game Backends
          </div>
          <div style={{ fontSize: 34, color: '#a3a3a3', maxWidth: 920, lineHeight: 1.3 }}>
            An open, source-backed comparison of game backend platforms for live service games.
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#22c55e' }}>comparegamebackends.com</div>
      </div>
    ),
    { ...size }
  );
}
