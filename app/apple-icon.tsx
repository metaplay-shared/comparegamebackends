import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Apple touch icon — the comparison-bars mark on a dark rounded tile.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 14,
          paddingBottom: 46,
          background: '#0f0f0f',
        }}
      >
        <div style={{ width: 26, height: 46, borderRadius: 6, background: '#22c55e' }} />
        <div style={{ width: 26, height: 76, borderRadius: 6, background: '#4ade80' }} />
        <div style={{ width: 26, height: 104, borderRadius: 6, background: '#86efac' }} />
      </div>
    ),
    { ...size }
  );
}
