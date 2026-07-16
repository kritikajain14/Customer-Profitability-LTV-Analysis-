import React, { useEffect, useState } from "react";

/* -----------------------------------------------------------
   Scroll-reveal: adds "is-visible" once an element enters view
------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .ltv-tab");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* -----------------------------------------------------------
   Content — GlowNest is a fictional D2C skincare brand and every
   record in this dataset is synthetically generated (no real
   customer or company data). That's called out explicitly in the
   hero and footer so a reviewer never has to wonder.
------------------------------------------------------------ */
const METHOD_STEPS = [
  { num: "01", title: "Data Prep", body: "Generated & structured 10,000 synthetic customer records across 4 Excel sheets for Power BI ingestion." },
  { num: "02", title: "EDA", body: "Explored LTV, CAC, order count and discount distributions per acquisition channel in Python." },
  { num: "03", title: "KPI Design", body: "Defined Net LTV = Revenue − Discounts − CAC as a DAX calculated column, not just a revenue total." },
  { num: "04", title: "Dashboard", body: "Built a 5-page Power BI report: overview, channel LTV, retention, channel performance, segment mix." },
  { num: "05", title: "Segmentation", body: "Tagged every customer: True Loyalist, Occasional, Discount Hunter, or One-Timer." },
];

const KEY_METRICS = [
  { label: "Best channel LTV", value: "₹4,187", sub: "Organic" },
  { label: "Worst channel LTV", value: "₹741", sub: "Coupon site" },
  { label: "LTV gap, best vs. worst", value: "5.6×", sub: "Organic vs. coupon site" },
  { label: "True Loyalists", value: "57.3%", sub: "5,730 of 10,000 customers" },
  { label: "True Loyalist avg LTV", value: "₹3,599", sub: "95% from 4 channels" },
  { label: "Instagram LTV : CAC", value: "2.2×", sub: "₹2,628 vs ₹1,203" },
];

const QUICK_LINKS = [
  { href: "#problem", label: "Business Question" },
  { href: "#deep-dive", label: "Deep-Dive Analysis" },
  { href: "#dashboard", label: "Power BI Dashboard" },
  // { href: "#ab-test", label: "A/B Test" },
  { href: "#insights", label: "Key Insights" },
  { href: "#recommendations", label: "Recommendations" },
  { href: "#projects", label: "Project Links" },
];

const TABS = ["Objective", "My Analysis", "Methodology", "Key Result"];

const ANALYSIS_DONE = [
  { title: "Exploratory data analysis", body: "Explored the distribution of revenue, CAC, discounts and order count per channel to spot outliers and skew before calculating anything." },
  { title: "Net LTV modeling", body: "Designed and built Net LTV (Revenue − Discounts − CAC) as a DAX calculated column, so every chart reflects profit, not raw revenue." },
  { title: "Customer segmentation", body: "Wrote rule-based logic to tag every customer as a True Loyalist, Occasional, Discount Hunter or One-Timer based on order frequency and discount usage." },
  { title: "Cohort retention analysis", body: "Tracked month-over-month retention per channel (Month 0 → Month 6) to find exactly where each channel's customers drop off." },
  { title: "Channel comparison", body: "Compared all five channels side by side on LTV, CAC, discount cost and retention to rank them by true profitability, not volume." },
];

const AB_TEST = {
  status: "Suggested experiment — not yet run",
  hypothesis: "Suppressing the discount pop-up for returning customers (instead of showing it to everyone) will reduce discount leakage without hurting repeat-purchase rate.",
  control: { label: "Control", desc: "Returning customers still see the standard discount pop-up", metric: "Repeat purchase rate", value: "—" },
  variant: { label: "Variant B", desc: "Returning customers see a loyalty message instead of a discount code", metric: "Repeat purchase rate", value: "—" },
};

const DASHBOARD_FIGURES = [
  {
    label: "LTV by acquisition channel",
    caption: "Fig 1 — Overview page",
    img: "/images/dashboard/LTV By Channel.png",
    explain: "A bar chart ranking all 5 channels by average Net LTV, highest to lowest. It's the fastest way to see the headline finding — organic and instagram sit far above coupon site, which is where the 5.6× gap comes from.",
  },
  {
    label: "Revenue vs. Discounts vs. CAC",
    caption: "Fig 2 — Channel performance",
    img: "/images/dashboard/Channel Performance.png",
    explain: "A clustered bar chart breaking each channel's revenue apart into what it actually cost — CAC and discounts sit next to gross revenue. This is what shows coupon site looking fine on revenue alone, but weak once cost is subtracted.",
  },
  {
    label: "Retention by month",
    caption: "Fig 3 — Cohort retention, per channel",
    img: "/images/dashboard/Cohort Retention Analysis.png",
    explain: "A line chart tracking what % of each channel's customers are still active from Month 0 through Month 6. Coupon site's line collapses by Month 2; every other channel holds a much flatter curve.",
  },
  {
    label: "Segment mix by channel",
    caption: "Fig 4 — Segment distribution",
    img: "/images/dashboard/Customer segmentation.png",
    explain: "A stacked bar showing what share of each channel's customers are True Loyalists vs. Occasional vs. Discount Hunters vs. One-Timers. It's what proves segment quality — not just customer count — differs sharply by channel.",
  },
];

const PROJECT_LINKS = [
  { icon: "📓", label: "GitHub Repository", desc: "Full code — data prep, DAX measures, segmentation logic", href: "https://github.com/kritikajain14/D2C-customer-profitability" },
  { icon: "📊", label: "Power BI Dashboard", desc: "The live 5-page report shown on this page", href: "https://drive.google.com/drive/folders/1OL8Pcs70FsSHl-g3dD4Al4lORR7m_NVZ?usp=drive_link" },
  { icon: "📁", label: "Dataset (synthetic)", desc: "The 10,000-row synthetic customer dataset used in this analysis", href: "https://drive.google.com/drive/folders/1kbEcbHfcSqhL5o3fSAoEBXtykRqmi8zc?usp=drive_link" },
  { icon: "📄", label: "Written Report", desc: "The full write-up this page is based on", href: "https://drive.google.com/file/d/1uCQPq0yQ4oP3mZdvPFr960Hfht18O9wn/view?usp=sharing" },
];

const PROBLEM_POINTS = [
  "Repeat purchase rate was climbing, but gross margin was quietly declining alongside it",
  "Marketing spend was allocated by channel volume, not by what a channel's customers were actually worth over time",
  "No one could say whether a customer acquired through a 30%+ discount was profitable, or just cheap to acquire and expensive to keep",
  "There was no single number — like a Net LTV — that combined revenue, discounting and acquisition cost per channel",
];

const APPROACH_POINTS = [
  "Generated a realistic synthetic dataset — 10,000 customers across 5 channels — since GlowNest is a fictional brand built for this case study",
  "Modeled acquisition cost, discount rate, order history and churn behavior per channel so the data reflects real D2C patterns, not random noise",
  "Calculated a Net LTV (Revenue − Discounts − CAC) as a DAX measure so every chart in the dashboard reflects profit, not just revenue",
  "Segmented all 10,000 customers into behavioral tiers — True Loyalist, Occasional, Discount Hunter, One-Timer — to separate volume from value",
  "Built a 5-page Power BI dashboard so the findings could be explored by channel, segment and month, not just read as a static report",
];

const DEEP_DIVE = [
  {
    tint: "bg-green-deep",
    title: "High-LTV channels",
    body: "Organic customers average ₹4,187 LTV on roughly ₹200 CAC — a 99.7% margin segment. Instagram returns 2.2× LTV-to-CAC and produces the largest volume of True Loyalists (1,817 customers).",
  },
  {
    tint: "bg-green-bright",
    title: "Churn & retention",
    body: "Coupon-site customers fall to 23.6% retention by Month 1 and 10.9% by Month 2. Every other channel holds 40–70% retention through Month 3.",
  },
  {
    tint: "bg-gold",
    title: "Discount leakage",
    body: "837 of 941 discount hunters (89%) came from the coupon site, averaging ₹478 in discounts each. Once CAC and discounts are netted out, this channel is worth ₹741 in LTV.",
  },
  {
    tint: "bg-sage",
    title: "Segment quality",
    body: "57.3% of all customers are True Loyalists worth ₹3,599 avg LTV — but 95% of them are concentrated in just four channels: Instagram, Google, Organic and Referral.",
  },
];

const INSIGHTS = [
  { tag: "LTV", title: "Organic channel delivers 5.6× higher LTV than coupon site", body: "Organic customers average ₹4,187 LTV with only ~₹200 CAC — a 99.7% margin segment and the brand's highest-value cohort." },
  { tag: "ROI", title: "Instagram delivers 2.2× LTV-to-CAC despite a higher acquisition cost", body: "Instagram LTV is ₹2,628 against ₹1,203 CAC. It drives the largest count of True Loyalists (1,817) — the highest-volume high-quality channel." },
  { tag: "Churn", title: "Coupon-site customers are effectively gone by Month 2", body: "All other channels retain 40–70% at Month 3. Coupon site drops to 23.6% retention by Month 1 and nearly disappears by Month 2 (10.9%)." },
  { tag: "Cost", title: "One channel produces 89% of all discount-driven customers", body: "837 of 941 total discount hunters came from the coupon site, averaging ₹478 in discounts each — a segment that's net-negative once CAC and discounts are factored into LTV (₹741 avg)." },
  { tag: "Segment", title: "True Loyalists are 57.3% of customers, but only 4 channels produce them", body: "True Loyalists average ₹3,599 LTV. 95% of them came from Instagram, Google, Organic or Referral — channel quality, not volume, is the real driver of outcome." },
];

const IMPACT_POINTS = [
  "Reframed discount-heavy acquisition (coupon site) as a margin risk, not a growth lever",
  "Quantified the profitability gap: organic customers are worth 5.6× more than coupon-site customers once CAC and discounts are netted out",
  "Turned three disconnected numbers — revenue, CAC, discounts — into one decision-ready metric (Net LTV) usable across any repeat-purchase business",
  "Built the case for reallocating budget toward organic and referral, the two channels with the best unit economics in the dataset",
];

const RECOMMENDATIONS = [
  { tag: "Cost reduction", title: "Cap coupon-site ad spend", body: "Saves an estimated ₹964K/yr in discount leakage across 2,017 customers." },
  { tag: "Budget reallocation", title: "Reallocate budget to Instagram retargeting", body: "2.2× LTV:CAC with a proven 76.5% loyalist conversion rate." },
  { tag: "Growth", title: "Launch a referral incentive program", body: "₹2,962 avg LTV on ₹347 CAC — 99% margin, near-zero discounting." },
  { tag: "Retention", title: "Suppress discounts for returning buyers", body: "Discount hunters only buy when discounted; the coupon just subsidizes a customer who was going to be unprofitable anyway." },
  { tag: "Long-term", title: "Invest in organic content (SEO / community)", body: "₹200 CAC against ₹4,187 LTV is the best unit economics of any channel in the dataset." },
  { tag: "Retention", title: "Protect the True Loyalist segment", body: "5,730 customers at ₹3,599 avg LTV — a retention program here is the single highest-ROI move available." },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/kritikajain14" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kritika-jain-b89334234/" },
  { label: "Portfolio", href: "https://kritika-jain-portfolio-ten-omega-65.vercel.app/" },
  { label: "Email", href: "mailto:jainkritika2020@gmail.com" },
];

const TECH_STACK = [
  { key: "languages", val: "Python, SQL, DAX" },
  { key: "analysis", val: "Pandas, NumPy, EDA" },
  { key: "visualization", val: "Power BI, Excel, Tableau" },
  { key: "tools", val: "Git, Jupyter, VS Code" },
  { key: "also_builds", val: "React, Node.js (MERN)" },
];


/* -----------------------------------------------------------
   Small building blocks
------------------------------------------------------------ */
function Pill({ children }) {
  return (
    <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-butter/80 border border-green-deep/15 text-green-deep font-bold">
      {children}
    </span>
  );
}

function SectionEyebrow({ children, boxed = false }) {
  return (
    <div
      className={`flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-3 font-bold ${boxed ? "text-green-mid" : "text-butter"
        }`}
    >
      <span className="w-6 h-px bg-gold inline-block" />
      {children}
    </div>
  );
}

function ImgPlaceholder({ label, icon = "📊" }) {
  /* Swap this block for a real screenshot:
     <img src="/images/your-file.png" alt="..." className="w-full h-full object-cover" /> */
  return (
    <div className="aspect-16/10 w-full rounded-xl border-2 border-dashed border-green-mid/50 bg-butter flex items-center justify-center text-center p-6 font-mono text-sm text-green-mid">
      <div>
        <span className="block text-2xl mb-2">{icon}</span>
        {label}
      </div>
    </div>
  );
}

function DashboardImage({ src, alt, icon = "📊", onExpand }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full aspect-4/3 sm:aspect-16/10 rounded-xl border-2 border-dashed border-green-mid/50 bg-butter flex items-center justify-center text-center p-6 font-mono text-sm text-green-mid">
        <div>
          <span className="block text-2xl mb-2">{icon}</span>
          {alt}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onExpand?.({ src, alt })}
      className="group relative w-full rounded-xl border border-green-deep/15 bg-[#0B2B24] overflow-hidden shadow-sm flex items-center justify-center p-2 sm:p-3 cursor-zoom-in text-left"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-butter text-green-deep text-xs font-bold font-mono px-3 py-1.5 rounded-full shadow-lg">
          🔍 Click to enlarge
        </span>
      </span>
    </button>
  );
}

/* Boxed image frame — keeps every screenshot at a fixed, predictable
   aspect ratio so the grid stays aligned at every breakpoint. Drop a
   real <img> in as the child to replace the dashed placeholder. */
function ImageBox({ children }) {
  return (
    <div className="aspect-16/10 w-full rounded-xl border border-green-deep/15 bg-butter overflow-hidden shadow-sm">
      {children}
    </div>
  );
}

/* Full-stack signature: a terminal-styled "stack.json" panel. Small,
   quiet nod to the MERN background behind an analytics-only page. */
function TerminalStack() {
  return (
    <div className="terminal w-full max-w-md">
      <div className="terminal-bar">
        <span className="terminal-dot" style={{ background: "#ff5f57" }} />
        <span className="terminal-dot" style={{ background: "#febc2e" }} />
        <span className="terminal-dot" style={{ background: "#28c840" }} />
        <span className="ml-2 font-mono text-[11px] text-white/40">stack.json</span>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word text-[11px] sm:text-xs leading-relaxed">
        <span className="tok-punc">{"{"}</span>{"\n"}
        {TECH_STACK.map((row, i) => (
          <React.Fragment key={row.key}>
            {"  "}
            <span className="tok-key">"{row.key}"</span>
            <span className="tok-punc">: </span>
            <span className="tok-str">"{row.val}"</span>
            <span className="tok-punc">{i < TECH_STACK.length - 1 ? "," : ""}</span>
            {"\n"}
          </React.Fragment>
        ))}
        <span className="tok-punc">{"}"}</span>
        <span className="cursor">&nbsp;</span>
      </pre>
    </div>
  );
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-[#0B2B24]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-[fadeIn_0.15s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-butter/10 hover:bg-butter/20 text-butter flex items-center justify-center text-xl transition-colors z-10"
      >
        ✕
      </button>

      <div
        className="max-w-6xl w-full max-h-full flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        <p className="text-butter/70 text-xs sm:text-sm font-mono text-center">
          {image.alt} — tap outside or press Esc to close
        </p>
      </div>
    </div>
  );
}

export default function App() {
  useReveal();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* ambient backdrop — soft solid blurs, no gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="blob w-72 h-72 sm:w-96 sm:h-96 -top-24 -left-20 bg-butter/15" />
        <div className="blob w-64 h-64 sm:w-80 sm:h-80 top-1/3 -right-24 bg-gold/20" style={{ animationDelay: "-8s" }} />
        <div className="blob w-72 h-72 sm:w-md sm:h-112 -bottom-40 left-1/4 bg-butter/10" style={{ animationDelay: "-14s" }} />
      </div>

      {/* NAV — solid butter, high contrast against the green page */}
      <nav className="sticky top-0 z-50 bg-butter border-b border-black/10 shadow-[0_8px_24px_-16px_rgba(1,38,34,0.6)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full bg-gold flex items-center justify-center text-green-deep font-display font-black text-xs sm:text-sm">
              GN
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-green-deep leading-tight text-xs sm:text-base truncate">
                GlowNest · D2C LTV Analysis
              </p>
              <p className="hidden md:block text-xs text-green-deep/60 font-mono">
                Customer Profitability &amp; LTV Analysis
              </p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#dashboard"
              className="px-4 py-2 rounded-full bg-gold text-green-deep text-sm font-bold hover:bg-gold-bright transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#recommendations"
              className="px-4 py-2 rounded-full border border-green-deep/40 text-green-deep text-sm font-bold hover:bg-green-deep hover:text-butter transition-colors"
            >
              Recommendations
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            className="sm:hidden shrink-0 w-9 h-9 rounded-full border border-green-deep/30 flex items-center justify-center text-green-deep"
          >
            <span className="relative w-4 h-3 block">
              <span className={`absolute left-0 right-0 h-0.5 bg-green-deep rounded transition-all duration-200 ${navOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-green-deep rounded transition-opacity duration-200 ${navOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 right-0 h-0.5 bg-green-deep rounded transition-all duration-200 ${navOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${navOpen ? "max-h-60" : "max-h-0"
            }`}
        >
          <div className="px-4 pb-4 pt-1 flex flex-col gap-2 border-t border-black/10">
            <a
              href="#dashboard"
              onClick={() => setNavOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-full bg-gold text-green-deep text-sm font-bold hover:bg-gold-bright transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#recommendations"
              onClick={() => setNavOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-full border border-green-deep/40 text-green-deep text-sm font-bold hover:bg-green-deep hover:text-butter transition-colors"
            >
              Recommendations
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* HERO / EXECUTIVE SUMMARY */}
        <section id="summary" className="pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-10">
          <div className="bg-[#FFF6D6] border border-[#FFF6D6] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 reveal shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5">
              <SectionEyebrow boxed classname="text-green-900">
                Executive Summary
              </SectionEyebrow>
              <Pill classname="text-green-900">10,000 synthetic customers · 5 channels</Pill>
            </div>

            <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-[#123524] leading-[1.1] sm:leading-[1.05] mb-3 sm:mb-4">
              Not all growth is profitable growth.
            </h1>

            <p className="text-sm sm:text-base text-[#2E5A43] leading-relaxed mb-2 max-w-2xl font-medium">
              GlowNest is a fictional D2C skincare brand built for this case study.
              It was acquiring customers across five channels without knowing which
              ones were actually profitable — rising repeat purchase rates were
              masking margin loss from heavy discounting. This project analyzes
              10,000{" "}
              <span className="font-bold text-[#123524]">
                synthetically generated
              </span>{" "}
              customer records to find which channels create real profit, where churn
              kills LTV, and what to do about both.
            </p>

            <p className="text-[11px] sm:text-xs font-mono text-[#52796F] mb-6 sm:mb-7">
              All data in this project — customers, orders, revenue, CAC — is
              synthetic. No real company or customer data is used.
            </p>

            {/* Tabs — horizontally scrollable on narrow screens so labels never wrap/clip */}
            <div className="flex gap-1 sm:gap-2 border-b border-[#E8DFC1] mb-5 sm:mb-6 overflow-x-auto no-scrollbar -mx-1 px-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 px-2.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab
                    ? "text-[#123524] border-b-2 border-[#C89F3D]"
                    : "text-[#52796F] hover:text-[#123524]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Objective" && (
              <p className="text-sm sm:text-base text-[#2E5A43] leading-relaxed">
                Identify which of the five acquisition channels are genuinely
                profitable once CAC and discounting are netted out of revenue — then
                turn that into a concrete marketing budget reallocation GlowNest could
                act on.
              </p>
            )}

            {activeTab === "My Analysis" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {ANALYSIS_DONE.map((a) => (
                  <div key={a.title} className="flex gap-3">
                    <span className="text-[#C89F3D] font-black shrink-0">—</span>

                    <div>
                      <p className="font-display font-bold text-[#123524] text-sm mb-0.5">
                        {a.title}
                      </p>

                      <p className="text-sm text-[#2E5A43] leading-relaxed">
                        {a.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Methodology" && (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-5 gap-3">
                {METHOD_STEPS.map((s) => (
                  <div
                    key={s.num}
                    className="bg-[#FFFBEF] rounded-xl p-4 border border-[#E8DFC1]"
                  >
                    <span className="font-mono text-[#2D6A4F] font-bold text-lg block mb-1">
                      {s.num}
                    </span>

                    <p className="font-display font-bold text-[#123524] text-sm mb-1">
                      {s.title}
                    </p>

                    <p className="text-xs text-[#2E5A43] leading-snug">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Key Result" && (
              <div className="ltv-tab">
                <p className="font-display italic text-3xl sm:text-4xl md:text-5xl font-black text-[#123524] mb-1">
                  5.6×
                </p>

                <p className="font-mono text-xs text-[#52796F] mb-5 font-bold">
                  higher lifetime value — organic vs. coupon site
                </p>

                <div className="mb-4">
                  <div className="flex justify-between font-mono text-xs text-[#123524] mb-1.5 font-bold">
                    <span>Organic</span>
                    <span>₹4,187</span>
                  </div>

                  <div className="h-3 rounded-full bg-[#E8DFC1] overflow-hidden">
                    <div className="bar-fill bar-fill--organic" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs text-[#123524] mb-1.5 font-bold">
                    <span>Coupon site</span>
                    <span>₹741</span>
                  </div>

                  <div className="h-3 rounded-full bg-[#E8DFC1] overflow-hidden">
                    <div className="bar-fill bar-fill--low bar-fill--coupon" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>


        {/* QUICK LINKS — same boxed-green treatment as Key Metrics below */}
        {/* QUICK LINKS */}
        <section className="pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-butter mb-3 font-bold reveal">
            Jump to
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 reveal">
            {QUICK_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="bg-[#FFF6D6] text-[#123524] rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-center border border-[#E8DFC1] shadow-lg hover:bg-[#FFFBEF] transition-all duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>
        </section>

        {/* KEY METRICS — dedicated full-width section, same grid language as Deep-Dive/Insights */}
        {/* KEY METRICS */}
        <section className="pb-14">
          <SectionEyebrow>By The Numbers</SectionEyebrow>

          <h2 className="font-display text-2xl sm:text-3xl font-black text-butter mb-8 reveal">
            The headline metrics
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {KEY_METRICS.map((m) => (
              <div
                key={m.label}
                className="bg-[#FFF6D6] rounded-2xl p-5 reveal flex flex-col justify-between min-h-33 border border-[#E8DFC1] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <p className="text-sm text-[#52796F] font-medium leading-snug">
                  {m.label}
                </p>

                <div>
                  <p className="font-mono font-black text-3xl text-[#123524] leading-none mb-1">
                    {m.value}
                  </p>

                  <p className="text-xs text-[#2E5A43] font-mono">
                    {m.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BUSINESS QUESTION */}
        {/* BUSINESS QUESTION */}
        <section id="problem" className="py-10">
          <SectionEyebrow>The Business Question</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Repeat purchases were up. Margin was down. Why?
          </h2>

          <p className="text-butter max-w-2xl mb-8 reveal leading-relaxed">
            GlowNest's repeat purchase rate was climbing — the kind of number that
            usually gets celebrated. But margin was declining at the same time,
            and nobody could say why with any precision.
          </p>

          <div className="bg-[#FFF6D6] border border-[#E8DFC1] rounded-2xl p-6 sm:p-7 reveal shadow-lg">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {PROBLEM_POINTS.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-sm text-[#2E5A43] leading-relaxed"
                >
                  <span className="text-butter font-black shrink-0">—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ROLE & APPROACH */}
        {/* ROLE & APPROACH */}
        <section id="approach" className="py-10">
          <SectionEyebrow>My Role &amp; Approach</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            What I actually did
          </h2>

          <p className="text-butter max-w-2xl mb-8 reveal leading-relaxed">
            I built the synthetic dataset representing GlowNest's customer base
            and ran the full LTV and channel-profitability analysis end-to-end,
            from raw data to a decision-ready dashboard.
          </p>

          <div className="bg-[#FFF6D6] border border-[#E8DFC1] rounded-2xl p-6 sm:p-7 reveal shadow-lg">
            <ol className="flex flex-col gap-4">
              {APPROACH_POINTS.map((p, i) => (
                <li
                  key={p}
                  className="flex gap-4 text-sm text-[#2E5A43] leading-relaxed"
                >
                  <span className="font-mono font-black text-[#2D6A4F] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {p}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* DEEP DIVE QUADRANT */}
        <section id="deep-dive" className="py-14">
          <SectionEyebrow>Detailed Analysis</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Deep-dive by theme
          </h2>
          <p className="text-butter/85 max-w-xl mb-9 reveal">
            Four lenses on the same 10,000 customers — channel value, churn
            behavior, discount cost, and segment quality.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {DEEP_DIVE.map((card) => (
              <div
                key={card.title}
                className="relative bg-butter border border-green-deep/10 rounded-2xl p-6 pl-8 reveal"
              >
                <span className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-full ${card.tint}`} />
                <h3 className="font-display font-bold text-xl text-green-deep mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-green-mid leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* POWER BI DASHBOARD */}
        {/* POWER BI DASHBOARD */}
        <section id="dashboard" className="py-14">
          <SectionEyebrow>The Deliverable</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Power BI Dashboard
          </h2>

          <p className="text-butter max-w-xl mb-9 reveal leading-relaxed">
            A five-page interactive dashboard built in Power BI to analyze
            customer lifetime value, acquisition channels, retention trends,
            profitability and customer segmentation.
          </p>

          <div className="reveal mb-10 max-w-2xl">
            <p className="font-display font-bold text-butter mb-3">
              Complete Dashboard
            </p>

            <DashboardImage
              src="/images/dashboard/D2C Dashboard.png"
              alt="Complete Power BI Dashboard"
              onExpand={setLightboxImg}
            />



            <p className="text-sm text-[#52796F] mt-3">
              Overview of all five report pages including KPIs, channel
              performance, retention, customer segments and Net LTV analysis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {DASHBOARD_FIGURES.map((fig) => (
              <div
                key={fig.label}
                className="bg-[#FFF6D6] border border-[#E8DFC1] rounded-2xl p-5 reveal shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h4 className="font-display font-bold text-[#123524] mb-1">
                  {fig.label}
                </h4>

                <p className="font-mono text-xs text-[#52796F] mb-4">
                  {fig.caption}
                </p>

                <DashboardImage src={fig.img} alt={fig.label} onExpand={setLightboxImg} />



                <p className="text-sm text-[#2E5A43] mt-4 leading-relaxed">
                  {fig.explain}

                </p>
              </div>
            ))}
          </div>
        </section>

        {/* A/B TEST */}
        {/* A/B TEST */}
        {/* <section id="ab-test" className="py-14">
          <SectionEyebrow>Experimentation</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            A/B Testing Proposal
          </h2>

          <div className="bg-[#FFF6D6] border border-[#E8DFC1] rounded-3xl p-7 reveal shadow-lg">

            <span className="inline-block px-4 py-2 rounded-full bg-[#C89F3D] text-white text-xs font-bold mb-6">
              {AB_TEST.status}
            </span>

            <p className="text-[#2E5A43] leading-relaxed mb-7">
              This analysis identifies where profitability is lost, but validating
              the recommendation requires experimentation. The following A/B test
              would measure the effect of reducing unnecessary discounting.
            </p>

            <div className="bg-[#FFFBEF] border border-[#E8DFC1] rounded-2xl p-5 mb-6">

              <p className="uppercase tracking-widest text-xs font-bold text-[#C89F3D] mb-2">
                Hypothesis
              </p>

              <p className="text-[#2E5A43]">
                {AB_TEST.hypothesis}
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="bg-[#FFFBEF] rounded-2xl p-5 border border-[#E8DFC1]">

                <p className="text-xs uppercase font-bold text-[#52796F] mb-2">
                  {AB_TEST.control.label}
                </p>

                <p className="text-[#123524] mb-4">
                  {AB_TEST.control.desc}
                </p>

                <p className="text-sm text-[#52796F]">
                  {AB_TEST.control.metric}
                </p>

                <p className="text-3xl font-black text-[#123524] mt-2">
                  {AB_TEST.control.value}
                </p>

              </div>

              <div className="bg-[#FFFBEF] rounded-2xl p-5 border border-[#E8DFC1]">

                <p className="text-xs uppercase font-bold text-[#52796F] mb-2">
                  {AB_TEST.variant.label}
                </p>

                <p className="text-[#123524] mb-4">
                  {AB_TEST.variant.desc}
                </p>

                <p className="text-sm text-[#52796F]">
                  {AB_TEST.variant.metric}
                </p>

                <p className="text-3xl font-black text-[#123524] mt-2">
                  {AB_TEST.variant.value}
                </p>

              </div>

            </div>

          </div>
        </section> */}

        {/* PROJECT LINKS */}
        {/* PROJECT LINKS */}

        <section id="projects" className="py-14">

          <SectionEyebrow>Project Resources</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Explore the Project
          </h2>

          <p className="text-butter max-w-xl mb-9 reveal">
            Access the complete source code, Power BI dashboard, dataset and
            documentation behind this case study.
          </p>

          <div className="grid md:grid-cols-2 gap-5">

            {PROJECT_LINKS.map((p) => (

              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFF6D6] border border-[#E8DFC1] rounded-2xl p-6 flex gap-5 items-start reveal shadow-lg hover:bg-[#FFFBEF] hover:-translate-y-1 transition-all duration-300"
              >

                <div className="text-3xl">
                  {p.icon}
                </div>

                <div>

                  <h3 className="font-display font-bold text-[#123524] mb-1">
                    {p.label}
                  </h3>

                  <p className="text-[#2E5A43] text-sm">
                    {p.desc}
                  </p>

                </div>

              </a>

            ))}

          </div>

        </section>

        {/* INSIGHTS */}
        <section id="insights" className="py-14">
          <SectionEyebrow>Key Insights &amp; Findings</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            What the data showed
          </h2>
          <p className="text-butter/85 max-w-xl mb-9 reveal">
            Five findings that tie acquisition channel directly to
            profitability.
          </p>

          <div className="flex flex-col gap-4">
            {INSIGHTS.map((item) => (
              <div
                key={item.title}
                className="relative bg-butter border-l-4 border-green-deep rounded-r-2xl rounded-l-md pl-6 pr-6 py-5 reveal"
              >
                <p className="font-mono text-xs uppercase tracking-wide text-gold mb-1.5 font-bold">
                  → {item.tag}
                </p>
                <h4 className="font-display font-bold text-lg text-green-deep mb-1.5">
                  {item.title}
                </h4>
                <p className="text-sm text-green-mid leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMMENDATIONS */}

        <section id="recommendations" className="py-14">

          <SectionEyebrow>Recommendations</SectionEyebrow>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-3 reveal">
            Business Recommendations
          </h2>

          <p className="text-butter max-w-xl mb-9 reveal">
            Based on the profitability analysis, these actions would generate the
            largest improvement in customer lifetime value and marketing ROI.
          </p>

          <div className="grid md:grid-cols-2 gap-5">

            {RECOMMENDATIONS.map((r) => (

              <div
                key={r.title}
                className="bg-[#FFF6D6] border border-[#E8DFC1] rounded-2xl p-6 reveal shadow-lg hover:shadow-xl transition-all duration-300"
              >

                <span className="inline-block px-3 py-1 rounded-full bg-[#123524] text-[#FFF6D6] text-xs font-bold mb-5">

                  {r.tag}

                </span>

                <h3 className="font-display text-xl font-bold text-[#123524] mb-3">

                  {r.title}

                </h3>

                <p className="text-[#2E5A43] leading-relaxed">

                  {r.body}

                </p>

              </div>
            ))}
          </div>
        </section>

        {/* IMPACT + QUOTE */}
        <section id="impact" className="py-14">
          <SectionEyebrow>Impact</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-butter mb-8 reveal">
            Why this mattered
          </h2>

          <div className="grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 bg-butter border border-green-deep/10 rounded-2xl p-6 sm:p-7 reveal">
              <ul className="flex flex-col gap-3">
                {IMPACT_POINTS.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-green-mid leading-relaxed">
                    <span className="text-gold font-black shrink-0">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 bg-butter text-green-deep rounded-2xl p-6 sm:p-7 reveal flex items-center">
              <p className="font-display italic text-lg sm:text-xl leading-snug">
                "This project changed how I read a revenue number — you stop
                asking how much did we make, and start asking from whom, and
                will they stay."
              </p>
            </div>
          </div>
        </section>




        {/* ABOUT THE ANALYST */}
        <section id="about" className="py-14">
          <div className="bg-butter border border-green-deep/10 rounded-3xl p-5 sm:p-8 md:p-10 reveal overflow-hidden">
            <SectionEyebrow boxed>About the Analyst</SectionEyebrow>
            <div className="grid md:grid-cols-5 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-3 min-w-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center mb-5 sm:mb-6">
                  {/* Swap for a real photo: <img src="/images/profile.jpg" className="w-20 h-20 rounded-full object-cover" /> */}

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-green-deep">
                      Kritika Jain
                    </h3>
                    <p className="text-green-mid text-sm font-mono font-bold">Data Analyst</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-green-mid leading-relaxed mb-6 sm:mb-7">
                  I'm a data analyst focused on translating raw data into clear, actionable decisions. 
                  My strength lies in identifying the insight that matters most - 
                  the one that moves a business forward ,  
                  rather than simply presenting numbers.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {SOCIAL_LINKS.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.label !== "Email" ? "_blank" : undefined}
                      rel={l.label !== "Email" ? "noopener noreferrer" : undefined}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-deep text-green-deep text-xs sm:text-sm font-bold hover:bg-green-deep hover:text-butter transition-colors whitespace-nowrap"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 flex justify-center min-w-0 w-full">
                <TerminalStack />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-butter py-8 mt-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-green-deep/70">
            GlowNest (fictional brand) · Synthetic dataset, 10,000 customers ·
            Power BI · Customer Profitability &amp; LTV Analysis
          </p>
        </div>
      </footer>
      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </div >
  );
}
