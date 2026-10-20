/**
 * Illustrative Google Ads mockups, built in CSS/SVG so they stay sharp at any size, cost no image
 * requests and never imply a real client. Every brand shown is fictional (".example" domains).
 * Pure presentational components: no hooks, rendered on the server.
 */

function Stars() {
  return (
    <span aria-hidden="true" className="tracking-tight text-[#fbbc04]">
      ★★★★★
    </span>
  );
}

/* ---------------------------------------------------------------- 1. Search */
export function SearchAdMock() {
  return (
    <div className="w-full rounded-2xl bg-white p-4 text-[#202124] shadow-2xl shadow-black/20 md:p-6">
      <div className="flex items-center gap-3 rounded-full border border-[#dfe1e5] px-4 py-2.5 shadow-sm">
        <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-[#9aa0a6]" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <span className="truncate text-[13px] md:text-sm">emergency plumber near me</span>
      </div>
      <div className="mt-3 flex gap-4 border-b border-[#ebebeb] text-[11px] text-[#5f6368] md:text-xs">
        <span className="border-b-2 border-[#1a73e8] pb-2 font-medium text-[#1a73e8]">All</span>
        <span className="pb-2">Maps</span>
        <span className="pb-2">Images</span>
        <span className="pb-2">News</span>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-[11px] text-[#202124] md:text-xs">
          <span className="font-bold">Sponsored</span>
          <span className="grid size-5 place-items-center rounded-full bg-[#1a73e8] text-[10px] font-bold text-white">R</span>
          <span className="truncate text-[#5f6368]">rapidrooter.example › emergency</span>
        </div>
        <p className="mt-1 text-[15px] leading-snug text-[#1a0dab] md:text-lg">
          24/7 Emergency Plumber | On Site Within 60 Minutes
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[#4d5156] md:text-[13px]">
          Licensed local plumbers. Upfront pricing and no call-out fee. Book online in 30 seconds or call now.
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#1a0dab]">
          <span>Book online</span>
          <span>Pricing</span>
          <span>Reviews</span>
          <span>Service areas</span>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#dadce0] px-3 py-1.5 text-[12px] font-medium text-[#1a73e8]">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
            <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
          </svg>
          Call now
        </div>
      </div>

      <div className="mt-5 space-y-4 opacity-60">
        <div>
          <p className="text-[11px] text-[#5f6368]">cityplumbers.example › guide</p>
          <p className="text-[14px] text-[#1a0dab]">What to do in a plumbing emergency — City Plumbers</p>
          <div className="mt-1 h-2 w-11/12 rounded bg-[#e8eaed]" />
          <div className="mt-1 h-2 w-7/12 rounded bg-[#e8eaed]" />
        </div>
        <div className="hidden sm:block">
          <p className="text-[11px] text-[#5f6368]">homehelp.example › plumbing</p>
          <p className="text-[14px] text-[#1a0dab]">Find a trusted plumber in your area</p>
          <div className="mt-1 h-2 w-10/12 rounded bg-[#e8eaed]" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- 2. YouTube */
export function YouTubeAdMock() {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#0f0f0f] shadow-2xl shadow-black/30">
      <div className="relative aspect-video overflow-hidden bg-[linear-gradient(135deg,#1c1917_0%,#7c2d12_55%,#f59e0b_120%)]">
        {/* abstract "cookware" scene */}
        <div className="absolute -right-6 bottom-0 h-[78%] w-[55%] rounded-t-full bg-[#1c1917] shadow-[inset_0_8px_30px_rgba(0,0,0,0.5)]" />
        <div className="absolute bottom-[8%] right-[10%] h-[34%] w-[40%] rounded-[50%] bg-[#292524] ring-4 ring-[#44403c]" />
        <div className="absolute right-[24%] top-[18%] size-12 rounded-full bg-[#fbbf24]/80 blur-xl" />
        <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur md:text-xs">
          Ad · 1 of 2 · 0:12
        </span>
        <p className="absolute left-4 top-1/2 max-w-[48%] -translate-y-1/2 font-display text-xl leading-[1.05] text-white md:text-3xl">
          Cast iron,
          <br />
          <em>reimagined.</em>
        </p>
        <span className="absolute bottom-3 right-3 rounded bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white md:text-xs">
          Skip ▸
        </span>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/25">
          <div className="h-full w-[38%] bg-[#fbbf24]" />
        </div>
      </div>
      <div className="flex items-center gap-3 bg-[#212121] px-3 py-3 md:px-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#7c2d12] text-sm font-bold text-white">E</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white">Ember Cookware — Free shipping this week</p>
          <p className="truncate text-[11px] text-white/60">Sponsored · embercook.example</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#3ea6ff] px-3.5 py-1.5 text-[12px] font-semibold text-[#0f0f0f]">Shop now</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- 3. Display */
export function DisplayAdMock() {
  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/20">
        <div className="flex items-center gap-2 border-b border-black/10 bg-[#f1f3f4] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-[10px] text-[#5f6368]">dailyjournal.example/travel</span>
        </div>

        <div className="p-3 md:p-5">
          {/* leaderboard 728x90 */}
          <div className="flex items-center justify-between gap-3 rounded-lg bg-[linear-gradient(90deg,#c8f43a,#34d399)] px-4 py-3 text-[#0b0b0a]">
            <p className="font-display text-base leading-tight md:text-2xl">
              Fly further. <em>Spend less.</em>
            </p>
            <span className="shrink-0 rounded-full bg-[#0b0b0a] px-3 py-1.5 text-[10px] font-semibold text-white md:text-xs">Explore fares</span>
          </div>
          <p className="mt-1 text-right text-[9px] uppercase tracking-wider text-[#9aa0a6]">Ad</p>

          <div className="mt-3 grid gap-4 md:grid-cols-[1fr_44%]">
            <div className="space-y-2.5">
              <div className="h-4 w-10/12 rounded bg-[#202124]" />
              <div className="h-4 w-7/12 rounded bg-[#202124]" />
              <div className="mt-3 aspect-[16/8] rounded-lg bg-[linear-gradient(135deg,#cbd5e1,#e2e8f0)]" />
              <div className="h-2 w-full rounded bg-[#e8eaed]" />
              <div className="h-2 w-11/12 rounded bg-[#e8eaed]" />
              <div className="h-2 w-9/12 rounded bg-[#e8eaed]" />
            </div>
            {/* medium rectangle 300x250 */}
            <div>
              <div className="relative aspect-[6/5] overflow-hidden rounded-lg bg-[linear-gradient(160deg,#0f172a,#1e3a8a)] p-4 text-white">
                <div className="absolute -bottom-8 -right-8 size-32 rounded-full bg-[#c8f43a]/90" />
                <p className="font-display text-xl leading-tight md:text-2xl">
                  Weekend
                  <br />
                  <em>escapes</em>
                </p>
                <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#0f172a] md:text-xs">
                  Book now
                </span>
              </div>
              <p className="mt-1 text-right text-[9px] uppercase tracking-wider text-[#9aa0a6]">Ad</p>
            </div>
          </div>
        </div>
      </div>

      {/* in-app banner 320x50 */}
      <div className="absolute -bottom-6 -right-1 hidden w-[34%] rounded-[1.4rem] border-[5px] border-[#0b0b0a] bg-white p-2 shadow-2xl shadow-black/30 sm:block md:-right-4">
        <div className="mx-auto h-1 w-8 rounded-full bg-black/15" />
        <div className="mt-2 space-y-1.5">
          <div className="h-2 w-8/12 rounded bg-[#202124]" />
          <div className="h-12 rounded bg-[#e2e8f0]" />
          <div className="h-1.5 rounded bg-[#e8eaed]" />
        </div>
        <div className="mt-2 flex items-center justify-between rounded bg-[#c8f43a] px-2 py-1.5 text-[8px] font-bold text-[#0b0b0a]">
          <span>Fly further.</span>
          <span className="rounded-full bg-[#0b0b0a] px-1.5 py-0.5 text-white">Go</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- 4. Shopping */
function ProductArt({ kind }: { kind: "mug" | "bottle" | "lamp" | "tote" }) {
  const common = "h-full w-full";
  switch (kind) {
    case "mug":
      return (
        <svg viewBox="0 0 100 100" className={common} aria-hidden="true">
          <rect x="24" y="30" width="40" height="42" rx="8" fill="#f4a261" />
          <path d="M64 40h8a8 8 0 0 1 0 22h-8" fill="none" stroke="#f4a261" strokeWidth="7" strokeLinecap="round" />
          <rect x="24" y="30" width="40" height="8" rx="4" fill="#e76f51" />
        </svg>
      );
    case "bottle":
      return (
        <svg viewBox="0 0 100 100" className={common} aria-hidden="true">
          <rect x="40" y="14" width="20" height="12" rx="3" fill="#264653" />
          <path d="M38 26h24l4 10v46a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V36z" fill="#2a9d8f" />
          <rect x="38" y="50" width="24" height="16" rx="3" fill="#e9f5f3" opacity=".85" />
        </svg>
      );
    case "lamp":
      return (
        <svg viewBox="0 0 100 100" className={common} aria-hidden="true">
          <path d="M30 22h40l10 34H20z" fill="#e9c46a" />
          <rect x="47" y="56" width="6" height="26" fill="#264653" />
          <ellipse cx="50" cy="84" rx="16" ry="4" fill="#264653" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className={common} aria-hidden="true">
          <path d="M34 36a16 16 0 0 1 32 0" fill="none" stroke="#6d597a" strokeWidth="5" strokeLinecap="round" />
          <path d="M24 38h52l5 44H19z" fill="#b56576" />
          <rect x="40" y="58" width="20" height="8" rx="2" fill="#fff" opacity=".35" />
        </svg>
      );
  }
}

export function ShoppingAdMock() {
  const products = [
    { kind: "mug" as const, price: "$24.00", title: "Stoneware coffee mug, 350 ml", store: "Hearth & Co", bg: "#fdf0e4", badge: "Free shipping" },
    { kind: "bottle" as const, price: "$38.00", title: "Insulated steel bottle, 750 ml", store: "Trailhead", bg: "#e6f4f1", badge: "" },
    { kind: "lamp" as const, price: "$89.00", title: "Brass desk lamp, dimmable", store: "Lumen Home", bg: "#fbf3dc", badge: "Sale" },
    { kind: "tote" as const, price: "$58.00", title: "Canvas weekender tote", store: "Fieldnote", bg: "#f6e6ea", badge: "" },
  ];
  return (
    <div className="w-full rounded-2xl bg-white p-4 text-[#202124] shadow-2xl shadow-black/20 md:p-5">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">Sponsored products</p>
        <p className="text-[11px] text-[#5f6368]">Shopping</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.map((p) => (
          <div key={p.title} className="rounded-xl border border-[#ebebeb] p-2">
            <div className="relative aspect-square rounded-lg p-3" style={{ background: p.bg }}>
              <ProductArt kind={p.kind} />
              {p.badge && (
                <span className="absolute left-1.5 top-1.5 rounded bg-white px-1.5 py-0.5 text-[9px] font-semibold text-[#188038] shadow-sm">
                  {p.badge}
                </span>
              )}
            </div>
            <p className="mt-2 text-[15px] font-semibold leading-none">{p.price}</p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#1a0dab]">{p.title}</p>
            <p className="mt-1 text-[10px] text-[#5f6368]">{p.store}</p>
            <p className="mt-0.5 text-[9px] font-semibold text-[#202124]">Sponsored</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 5. Demand Gen */
export function DemandGenMock() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {/* YouTube feed */}
      <div className="overflow-hidden rounded-2xl bg-[#0f0f0f] text-white shadow-2xl shadow-black/25">
        <p className="px-3 pt-3 text-[9px] font-semibold uppercase tracking-widest text-white/50">YouTube feed</p>
        <div className="relative mx-3 mt-2 aspect-video overflow-hidden rounded-lg bg-[linear-gradient(135deg,#312e81,#be185d_70%,#fb923c)]">
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid size-9 place-items-center rounded-full bg-white/90 text-[#0f0f0f]">▶</span>
          </div>
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-[9px]">0:15</span>
        </div>
        <div className="flex gap-2 p-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#be185d] text-[11px] font-bold">V</span>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold leading-snug">Glow, all day. Meet the new Vela serum.</p>
            <p className="mt-0.5 text-[10px] text-white/60">Sponsored · velabeauty.example</p>
            <span className="mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold">Learn more</span>
          </div>
        </div>
      </div>

      {/* Discover card */}
      <div className="overflow-hidden rounded-2xl bg-white text-[#202124] shadow-2xl shadow-black/25">
        <p className="px-3 pt-3 text-[9px] font-semibold uppercase tracking-widest text-[#5f6368]">Discover</p>
        <div className="mx-3 mt-2 aspect-[4/3] rounded-lg bg-[linear-gradient(160deg,#99f6e4,#0ea5e9_60%,#1e3a8a)]">
          <div className="h-full w-full rounded-lg bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.7),transparent_35%)]" />
        </div>
        <div className="p-3">
          <p className="text-[12px] font-semibold leading-snug">The 5-day coastal route locals actually take</p>
          <p className="mt-1 text-[10px] text-[#5f6368]">
            <span className="font-bold text-[#202124]">Sponsored</span> · wanderco.example
          </p>
          <span className="mt-2 inline-block rounded-full border border-[#dadce0] px-3 py-1 text-[10px] font-semibold text-[#1a73e8]">
            Plan your trip
          </span>
        </div>
      </div>

      {/* Gmail promotions */}
      <div className="overflow-hidden rounded-2xl bg-white text-[#202124] shadow-2xl shadow-black/25">
        <p className="px-3 pt-3 text-[9px] font-semibold uppercase tracking-widest text-[#5f6368]">Gmail · Promotions</p>
        <div className="mt-2 divide-y divide-[#f1f3f4]">
          <div className="flex items-center gap-2 px-3 py-2.5 opacity-50">
            <span className="size-5 rounded-full bg-[#e8eaed]" />
            <div className="flex-1 space-y-1">
              <div className="h-2 w-1/2 rounded bg-[#dadce0]" />
              <div className="h-1.5 w-10/12 rounded bg-[#e8eaed]" />
            </div>
          </div>
          <div className="bg-[#e8f0fe] px-3 py-3">
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#fbbc04] px-1 text-[9px] font-bold text-[#202124]">Ad</span>
              <span className="truncate text-[11px] font-semibold">Northstar Outdoor</span>
            </div>
            <p className="mt-1 text-[12px] font-semibold leading-snug">Autumn gear is here — up to 30% off</p>
            <div className="mt-2 flex gap-2">
              <span className="size-10 shrink-0 rounded bg-[linear-gradient(135deg,#f97316,#be123c)]" />
              <p className="text-[10px] leading-snug text-[#5f6368]">Jackets, boots and packs built for the season ahead. Free returns on every order.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 opacity-50">
            <span className="size-5 rounded-full bg-[#e8eaed]" />
            <div className="flex-1 space-y-1">
              <div className="h-2 w-2/5 rounded bg-[#dadce0]" />
              <div className="h-1.5 w-9/12 rounded bg-[#e8eaed]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- 6. Performance Max */
export function PerformanceMaxMock() {
  const assets = ["Headlines", "Images", "Video", "Product feed"];
  const channels = ["Search", "YouTube", "Display", "Discover", "Gmail", "Maps"];
  const leftY = assets.map((_, i) => ((i + 0.5) / assets.length) * 100);
  const rightY = channels.map((_, i) => ((i + 0.5) / channels.length) * 100);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#0b0b0a] p-4 text-white shadow-2xl shadow-black/30 md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,244,58,0.16),transparent_55%)]" />
      <div className="relative grid h-[22rem] grid-cols-[30%_1fr_30%] md:h-[26rem]">
        {/* connectors sit behind the chips */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {leftY.map((y, i) => (
            <path
              key={`l${i}`}
              d={`M30 ${y} C 38 ${y}, 36 50, 41 50`}
              fill="none"
              stroke="#c8f43a"
              strokeOpacity="0.7"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              className="flow-line"
            />
          ))}
          {rightY.map((y, i) => (
            <path
              key={`r${i}`}
              d={`M59 50 C 64 50, 62 ${y}, 70 ${y}`}
              fill="none"
              stroke="#c8f43a"
              strokeOpacity="0.7"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
              className="flow-line"
            />
          ))}
        </svg>

        <div className="relative grid grid-rows-4 items-center">
          {assets.map((a) => (
            <span key={a} className="mr-2 rounded-lg border border-white/15 bg-white/[0.06] px-2 py-2 text-center text-[11px] font-medium md:text-xs">
              {a}
            </span>
          ))}
        </div>

        <div className="relative grid place-items-center">
          <span className="pulse-ring absolute size-16 rounded-full border border-[#c8f43a] md:size-28" />
          <div className="relative grid size-16 place-items-center rounded-full bg-[#c8f43a] p-1 text-center text-[8px] font-bold leading-tight text-[#0b0b0a] md:size-28 md:text-xs">
            Goals +
            <br />
            audience
            <br />
            signals
          </div>
        </div>

        <div className="relative grid grid-rows-6 items-center">
          {channels.map((c) => (
            <span key={c} className="ml-2 rounded-lg border border-white/15 bg-white/[0.06] px-2 py-1.5 text-center text-[11px] font-medium md:text-xs">
              {c}
            </span>
          ))}
        </div>
      </div>
      <p className="relative mt-3 flex justify-between text-[9px] uppercase tracking-[0.18em] text-white/45">
        <span>Your assets</span>
        <span>Eligible channels</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------- 7. Local/Maps */
export function LocalAdMock() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#e8eef0] shadow-2xl shadow-black/20">
      <svg viewBox="0 0 400 300" className="block h-72 w-full md:h-[22rem]" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="300" fill="#e8eef0" />
        <rect x="250" y="20" width="130" height="90" rx="10" fill="#cfe8cf" />
        <path d="M0 230c60-30 110 10 180-10s120-50 220-30v110H0z" fill="#bfdcf2" />
        <g stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none">
          <path d="M-10 90 410 70" />
          <path d="M120-10 90 310" />
          <path d="M300-10 280 310" />
          <path d="M-10 170 410 160" />
        </g>
        <g stroke="#fde293" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M-10 130 410 120" />
        </g>
        {[[60, 60], [190, 100], [330, 190], [150, 200], [345, 60]].map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <circle r="7" fill="#9aa0a6" />
            <circle r="2.5" fill="#fff" />
          </g>
        ))}
        {/* promoted pin */}
        <g transform="translate(214 142)">
          <path d="M0 0c-10-14-16-21-16-30a16 16 0 0 1 32 0c0 9-6 16-16 30z" fill="#ea4335" />
          <circle cy="-30" r="6" fill="#fff" />
        </g>
        <g transform="translate(228 100)">
          <rect width="26" height="16" rx="4" fill="#fbbc04" />
          <text x="13" y="12" textAnchor="middle" fontSize="10" fontWeight="700" fill="#202124">Ad</text>
        </g>
      </svg>

      <div className="absolute inset-x-3 top-3 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] text-[#202124] shadow-lg">
        <svg viewBox="0 0 24 24" className="size-4 text-[#9aa0a6]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        coffee near me
      </div>

      <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-4 text-[#202124] shadow-2xl">
        <p className="text-[11px] text-[#202124]">
          <span className="font-bold">Sponsored</span> · 0.3 mi
        </p>
        <p className="mt-0.5 text-[15px] font-semibold">Corner Brew Coffee</p>
        <p className="text-[12px] text-[#5f6368]">
          4.8 <Stars /> (312) · Coffee shop · Open until 9 pm
        </p>
        <div className="mt-3 flex gap-2 text-[12px] font-semibold">
          <span className="rounded-full bg-[#1a73e8] px-4 py-1.5 text-white">Directions</span>
          <span className="rounded-full border border-[#dadce0] px-4 py-1.5 text-[#1a73e8]">Call</span>
          <span className="hidden rounded-full border border-[#dadce0] px-4 py-1.5 text-[#1a73e8] sm:inline">Website</span>
        </div>
      </div>
    </div>
  );
}
