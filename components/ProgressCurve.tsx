/**
 * Signature motif: "đường cong tiến bộ trên lưới toạ độ" (spec §4).
 * Dùng tối đa 1-2 lần/trang (hero + 1 dải chia mục) — không rải khắp nơi.
 */
export function ProgressCurve({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* lưới toạ độ mờ */}
      <g stroke="var(--color-sky)" strokeOpacity="0.18" strokeWidth="1">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 48 + 8} x2={600} y2={i * 48 + 8} />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 48} y1={0} x2={i * 48} y2={320} />
        ))}
      </g>

      {/* trục chính */}
      <line x1="0" y1="296" x2="600" y2="296" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* đường cong tiến bộ, cảm giác vẽ tay */}
      <path
        d="M 12 268 C 90 260, 130 232, 170 214 S 260 176, 300 158 S 400 108, 440 84 S 540 42, 588 24"
        stroke="var(--color-gold)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* điểm mốc dữ liệu */}
      {[
        [12, 268],
        [170, 214],
        [300, 158],
        [440, 84],
        [588, 24],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="var(--color-paper)" stroke="var(--color-gold)" strokeWidth="3" />
      ))}
    </svg>
  );
}
