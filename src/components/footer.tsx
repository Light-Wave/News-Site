const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E`;

export default function Footer() {
  return (
    <footer className="relative mt-12" aria-label="Site Footer">
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-700/60 to-transparent" />

      {/* Main footer body */}
      <div className="relative overflow-hidden border-t-2 border-amber-800/40 bg-gradient-to-br from-[#f4e4bc] via-[#f8f0dc] to-[#e8d5a3]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: `url("${noiseSvg}")` }}
        />
        {/* Decorative edges */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-amber-900/5 via-transparent to-amber-900/10" />

        {/* Decorative inset border */}
        <div className="absolute inset-3 border border-amber-700/15 rounded pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 sm:px-8">
          {/* Sections grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:max-w-3xl md:mx-auto">
            <div>
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-amber-900 mb-4">
                <span className="border-b-2 border-amber-700/40 pb-1">
                  The Quill &amp; Scroll
                </span>
              </h3>

              <p className="text-sm text-amber-900/80 leading-relaxed">
                An independent fellowship of scholars and scribes, dedicated to
                unearthing arcane truths and delivering enchanted dispatches from
                every corner of the realm.
              </p>

              <p className="mt-3 text-sm text-amber-900/80">
                <span className="font-semibold text-amber-900">
                  🐦‍⬛ Send a Raven:
                </span>{" "}
                <a
                  href="mailto:contact@bibliomancers-brief.realm"
                  className="hover:text-amber-700 underline decoration-amber-700/30 transition-colors"
                >
                  contact@bibliomancers-brief.realm
                </a>
              </p>

              <p className="mt-1 text-sm text-amber-900/80">
                <span className="font-semibold text-amber-900">
                  Tower Location:
                </span>{" "}
                Stockholm, Sweden
              </p>
            </div>

            <div>
              <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-amber-900 mb-4">
                <span className="border-b-2 border-amber-700/40 pb-1">
                  Join the Order
                </span>
              </h3>

              <p className="text-sm text-amber-900/80 leading-relaxed">
                Seekers of truth, wielders of quills, and architects of arcane
                contraptions — the Order welcomes those who believe in the power
                of enchanted storytelling.
              </p>

              <p className="mt-3 text-sm text-amber-900/70 italic">
                &ldquo;The pen is mightier than the wand.&rdquo;
                <span className="block text-xs mt-1 not-italic text-amber-800/50">
                  — Grand Scribe Aldric the Verbose
                </span>
              </p>
            </div>
          </div>

          {/* Decorative separator */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-700/40" />
            <span className="text-amber-700/50 text-lg">⚜</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-700/40" />
          </div>

          {/* Bottom bar */}
          <div className="text-center">
            <p className="font-cinzel text-xs text-amber-900/60 tracking-wide">
              © {new Date().getFullYear()} The Bibliomancer&apos;s Brief. All
              rights reserved under the Arcane Accords.
            </p>
            <p className="text-xs text-amber-800/40 mt-1 italic">
              Enchanted with care in the Frozen Northlands
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

