import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  UploadCloud, Brain, CheckCircle2, AlertCircle,
  Loader2, FileText, Zap, ArrowRight, Star,
  TrendingUp, ChevronDown
} from "lucide-react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#05060a;--bg2:#0a0c12;--surface:#0f1118;--surface2:#161a24;
  --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.1);
  --accent:#6ee7b7;--accent2:#818cf8;--danger:#f87171;
  --text:#e8eaf2;--muted:#4b5468;--muted2:#7c8496;
}
html{scroll-behavior:smooth}
body{background:var(--bg);font-family:'Cabinet Grotesk',sans-serif;color:var(--text);overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--surface2);border-radius:4px}
body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.4}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:68px;background:rgba(5,6,10,.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);transition:all .3s}
.nav.scrolled{background:rgba(5,6,10,.97)}
.nav-logo{display:flex;align-items:center;gap:10px;font-family:'Clash Display',sans-serif;font-size:18px;font-weight:700;letter-spacing:-.02em;cursor:pointer}
.nav-logo-dot{width:8px;height:8px;background:var(--accent);border-radius:50%;box-shadow:0 0 10px var(--accent)}
.nav-links{display:flex;align-items:center;gap:32px;list-style:none}
.nav-links a{color:var(--muted2);font-size:14px;font-weight:500;text-decoration:none;letter-spacing:.01em;transition:color .2s}
.nav-links a:hover{color:var(--text)}
.nav-cta{padding:9px 22px;background:var(--accent);color:#05060a;border:none;border-radius:10px;font-family:'Cabinet Grotesk',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s}
.nav-cta:hover{box-shadow:0 0 24px rgba(110,231,183,.4);transform:translateY(-1px)}

/* HERO */
.hero-section{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:100px 24px 60px;position:relative;overflow:hidden}
.hero-section::before{content:'';position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:700px;height:700px;background:radial-gradient(ellipse,rgba(110,231,183,.07) 0%,transparent 65%);pointer-events:none}
.hero-section::after{content:'';position:absolute;bottom:-100px;right:-200px;width:500px;height:500px;background:radial-gradient(ellipse,rgba(129,140,248,.06) 0%,transparent 65%);pointer-events:none}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;background:rgba(110,231,183,.08);border:1px solid rgba(110,231,183,.2);border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:32px;animation:fadeUp .6s ease both}
.badge-dot{width:6px;height:6px;background:var(--accent);border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.hero-title{font-family:'Clash Display',sans-serif;font-size:clamp(52px,9vw,96px);font-weight:700;line-height:.95;letter-spacing:-.04em;margin-bottom:28px;animation:fadeUp .6s .1s ease both}
.hero-title .grad{background:linear-gradient(135deg,var(--accent) 0%,var(--accent2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{max-width:540px;color:var(--muted2);font-size:18px;line-height:1.65;margin-bottom:44px;animation:fadeUp .6s .2s ease both}
.hero-actions{display:flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center;margin-bottom:72px;animation:fadeUp .6s .3s ease both}
.btn-primary{display:inline-flex;align-items:center;gap:10px;padding:16px 32px;background:var(--accent);color:#05060a;border:none;border-radius:14px;font-family:'Cabinet Grotesk',sans-serif;font-size:16px;font-weight:800;cursor:pointer;transition:all .2s;letter-spacing:-.01em}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(110,231,183,.3)}
.btn-secondary{display:inline-flex;align-items:center;gap:8px;padding:15px 28px;background:transparent;color:var(--muted2);border:1px solid var(--border2);border-radius:14px;font-family:'Cabinet Grotesk',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all .2s}
.btn-secondary:hover{border-color:var(--accent);color:var(--accent)}
.hero-stats{display:flex;align-items:center;gap:48px;animation:fadeUp .6s .4s ease both}
.stat{text-align:center}
.stat-num{font-family:'Clash Display',sans-serif;font-size:28px;font-weight:700;letter-spacing:-.03em}
.stat-num span{color:var(--accent)}
.stat-label{font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.08em;margin-top:4px}
.stat-sep{width:1px;height:40px;background:var(--border2)}
.scroll-hint{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;color:var(--muted);font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;animation:bounce 2s infinite}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}

/* SECTION */
.section{padding:100px 24px;max-width:1100px;margin:0 auto;position:relative}
.section-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.section-title{font-family:'Clash Display',sans-serif;font-size:clamp(32px,4vw,48px);font-weight:700;letter-spacing:-.03em;line-height:1.1;margin-bottom:16px}
.section-sub{color:var(--muted2);font-size:16px;max-width:480px;line-height:1.7}

/* STEPS */
.steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:60px;background:var(--border);border-radius:20px;overflow:hidden}
@media(max-width:700px){.steps-grid{grid-template-columns:1fr}}
.step-card{background:var(--surface);padding:40px 32px;position:relative;transition:background .2s}
.step-card:hover{background:var(--surface2)}
.step-num{font-family:'Clash Display',sans-serif;font-size:56px;font-weight:700;color:rgba(255,255,255,.04);letter-spacing:-.04em;margin-bottom:20px;line-height:1}
.step-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:rgba(110,231,183,.1);border:1px solid rgba(110,231,183,.2);border-radius:12px;margin-bottom:18px;color:var(--accent)}
.step-card h3{font-size:18px;font-weight:700;margin-bottom:10px;letter-spacing:-.02em}
.step-card p{color:var(--muted2);font-size:14px;line-height:1.7}

/* ANALYZER SECTION */
.analyzer-section{padding:80px 24px 120px;background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);position:relative}
.analyzer-section::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--accent),var(--accent2),transparent);opacity:.4}
.analyzer-inner{max-width:900px;margin:0 auto}
.analyzer-header{text-align:center;margin-bottom:56px}

.two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px}
@media(max-width:680px){.two-col{grid-template-columns:1fr}}

.card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;position:relative;transition:border-color .2s}
.card:hover{border-color:var(--border2)}
.card-label{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:16px}
.card-label svg{color:var(--accent)}

.upload-zone{border:1.5px dashed rgba(110,231,183,.2);border-radius:14px;padding:36px 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;text-align:center;transition:all .2s;background:rgba(110,231,183,.02);min-height:180px}
.upload-zone:hover,.upload-zone.drag{border-color:var(--accent);background:rgba(110,231,183,.05)}
.upload-zone h4{font-size:15px;font-weight:700;margin:12px 0 6px}
.upload-zone p{font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace}
.file-chip{display:inline-flex;align-items:center;gap:6px;margin-top:12px;padding:6px 14px;background:rgba(110,231,183,.1);border:1px solid rgba(110,231,183,.25);border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent)}

.jd-card{grid-column:1 / -1}
.jd-input{width:100%;min-height:180px;background:var(--surface2);border:1px solid var(--border);border-radius:14px;color:var(--text);font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.8;padding:18px;resize:vertical;outline:none;transition:border-color .2s}
.jd-input::placeholder{color:var(--muted)}
.jd-input:focus{border-color:rgba(110,231,183,.35)}

.btn-analyze{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:18px;background:linear-gradient(135deg,var(--accent),#34d399);color:#05060a;border:none;border-radius:16px;font-family:'Cabinet Grotesk',sans-serif;font-size:17px;font-weight:800;cursor:pointer;letter-spacing:-.01em;transition:all .25s}
.btn-analyze:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(110,231,183,.35)}
.btn-analyze:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}

/* RESULTS */
.results-wrap{margin-top:40px}
.results-divider{display:flex;align-items:center;gap:16px;margin-bottom:32px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.results-divider::before,.results-divider::after{content:'';flex:1;height:1px;background:var(--border2)}

.score-banner{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:40px;display:grid;grid-template-columns:auto 1fr auto;gap:40px;align-items:center;margin-bottom:24px;position:relative;overflow:hidden}
.score-banner::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent2))}
@media(max-width:680px){.score-banner{grid-template-columns:1fr;text-align:center}}

.ring-wrap{position:relative;width:140px;height:140px;flex-shrink:0}
.ring-wrap svg{transform:rotate(-90deg)}
.ring-inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ring-num{font-family:'Clash Display',sans-serif;font-size:36px;font-weight:700;letter-spacing:-.04em;line-height:1;color:var(--accent)}
.ring-sub{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--muted);margin-top:4px;text-transform:uppercase;letter-spacing:.1em}

.score-info h2{font-family:'Clash Display',sans-serif;font-size:26px;font-weight:700;letter-spacing:-.03em;margin-bottom:8px}
.score-info p{color:var(--muted2);font-size:14px;line-height:1.7;max-width:360px}
.sim-chip{display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:8px 16px;background:rgba(129,140,248,.08);border:1px solid rgba(129,140,248,.2);border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent2);font-weight:500}
.score-grade{text-align:center}
.grade-letter{font-family:'Clash Display',sans-serif;font-size:72px;font-weight:700;letter-spacing:-.05em;line-height:1}
.grade-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-top:4px}

.skills-row{display:grid;grid-template-columns:1fr 1fr;gap:24px}
@media(max-width:680px){.skills-row{grid-template-columns:1fr}}
.skills-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px}
.skills-card-header{display:flex;align-items:center;gap:10px;margin-bottom:20px}
.skills-card-header h3{font-size:16px;font-weight:700;letter-spacing:-.02em}
.skills-count{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;padding:3px 10px;border-radius:100px}
.skills-count.green{background:rgba(110,231,183,.1);color:var(--accent)}
.skills-count.red{background:rgba(248,113,113,.1);color:var(--danger)}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{padding:6px 14px;border-radius:100px;font-size:12px;font-family:'JetBrains Mono',monospace;font-weight:500;letter-spacing:.01em}
.tag.g{background:rgba(110,231,183,.08);border:1px solid rgba(110,231,183,.2);color:var(--accent)}
.tag.r{background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.15);color:var(--danger)}
.empty{font-size:13px;color:var(--muted);font-family:'JetBrains Mono',monospace}

/* FEATURES */
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px}
@media(max-width:700px){.features-grid{grid-template-columns:1fr}}
.feature-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:32px;transition:all .25s}
.feature-card:hover{border-color:var(--border2);transform:translateY(-4px)}
.feat-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:22px}
.feature-card h3{font-size:17px;font-weight:700;margin-bottom:10px;letter-spacing:-.02em}
.feature-card p{color:var(--muted2);font-size:14px;line-height:1.7}

/* FOOTER */
.footer{border-top:1px solid var(--border);padding:40px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.footer-logo{font-family:'Clash Display',sans-serif;font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.footer-copy{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted)}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.fade-up{animation:fadeUp .5s ease both}
`;

function Ring({ score }) {
  const r = 58, circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="ring-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#6ee7b7" strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </svg>
      <div className="ring-inner">
        <span className="ring-num">{score}</span>
        <span className="ring-sub">ATS Score</span>
      </div>
    </div>
  );
}

function getGrade(s) {
  if (s >= 85) return { l: "A", c: "#6ee7b7", label: "Excellent" };
  if (s >= 70) return { l: "B", c: "#a3e635", label: "Good" };
  if (s >= 55) return { l: "C", c: "#fbbf24", label: "Average" };
  if (s >= 40) return { l: "D", c: "#f97316", label: "Below Avg" };
  return { l: "F", c: "#f87171", label: "Poor" };
}

function scoreMsg(s) {
  if (s >= 85) return "Your resume strongly aligns with this role. You're a top candidate!";
  if (s >= 70) return "Good match overall. A few tweaks could push you into the top tier.";
  if (s >= 55) return "Decent alignment. Consider tailoring keywords to the job description.";
  if (s >= 40) return "Moderate match. Several key areas need improvement before applying.";
  return "Low compatibility. We recommend a significant resume overhaul for this role.";
}

export default function App() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [tryingToConnect,setTryingToConnect] = useState(false);
  const [drag, setDrag] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const analyzerRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {

  const checkBackend = async () => {

    try {

      await axios.get(
        "http://127.0.0.1:8000"
      );

      setBackendConnected(true);

      setTryingToConnect(false);

    } catch {

      setBackendConnected(false);
    }
  };

  checkBackend();

  const interval = setInterval(
    checkBackend,
    5000
  );

  return () =>
    clearInterval(interval);

}, []);

  

  const handleAnalyze = async () => {
    if (!file || !jd) { alert("Please upload a resume and paste a job description."); return; }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("job_description", jd);
    try {
      setLoading(true); setResult(null);
      const res = await axios.post("http://127.0.0.1:8000/analyze", fd);
      setResult(res.data);
      setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      alert(JSON.stringify(e.response?.data || e.message));
    } finally { setLoading(false); }
  };

  const grade = result ? getGrade(result.score) : null;

  return (
    <>
      <style>{G}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo"><div className="nav-logo-dot" />ResumeAI</div>
        <ul className="nav-links">
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#analyzer">Analyzer</a></li>
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("analyzer")}>Try for free →</button>
      </nav>

      {/* HERO */}
      <section className="hero-section" id="hero">
        <div className="hero-badge"><div className="badge-dot" />AI-Powered Resume Screening</div>
        <h1 className="hero-title">
          Land Your Dream Job<br /><span className="grad">Smarter & Faster</span>
        </h1>
        <p className="hero-sub">Upload your resume, paste a job description, and get an instant AI-powered ATS compatibility score with actionable insights.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("analyzer")}>Analyze My Resume <ArrowRight size={18} /></button>
          <button className="btn-secondary" onClick={() => scrollTo("how-it-works")}>See how it works <ChevronDown size={16} /></button>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num"><span>98</span>%</div><div className="stat-label">Accuracy</div></div>
          <div className="stat-sep" />
          <div className="stat"><div className="stat-num"><span>60</span>s</div><div className="stat-label">Avg Analysis</div></div>
          <div className="stat-sep" />
          <div className="stat"><div className="stat-num"><span>Local AI Powered</span>+</div><div className="stat-label">Resumes Scanned</div></div>
        </div>
        <div className="scroll-hint"><ChevronDown size={14} />scroll</div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works">
        <div className="section">
          <div className="section-eyebrow">How it works</div>
          <h2 className="section-title">Three steps to your<br />perfect application</h2>
          <p className="section-sub">Our AI analyzes semantic similarity between your resume and the job description in seconds.</p>
          <div className="steps-grid">
            {[
              { icon: <UploadCloud size={20} />, title: "Upload Resume", desc: "Drop your PDF resume into our secure analyzer. Your data is never stored." },
              { icon: <FileText size={20} />, title: "Paste Job Description", desc: "Copy the job listing and paste it. The more detail, the better the analysis." },
              { icon: <TrendingUp size={20} />, title: "Get Your Score", desc: "Receive an instant ATS score, matched skills, and gaps to fix." }
            ].map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-num">0{i + 1}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANALYZER */}
      <section id="analyzer" ref={analyzerRef} className="analyzer-section">
        <div className="analyzer-inner">
          <div className="analyzer-header">
            <div className="section-eyebrow">Live Analyzer</div>
            <h2 className="section-title">Check your resume now</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>Paste your details below and get results instantly — no sign-up required.</p>
          </div>
            {/* Backend Status */}

<div
  className={`
  mb-8
  p-4
  rounded-2xl
  border
  ${
  tryingToConnect
    ? "bg-yellow-500/10 border-yellow-500"

    : backendConnected

    ? "bg-green-500/10 border-green-500"

    : "bg-red-500/10 border-red-500"
}
`}
>

{tryingToConnect  ? (

  <div className="
    flex
    items-center
    gap-3
  ">

    <Loader2
      size={18}
      className="
        animate-spin
        text-yellow-300
      "
    />

    <p className="
      text-yellow-200
      font-medium
    ">

      Connecting to AI Engine...

    </p>

  </div>

) : backendConnected ? (

  <div className="
    flex
    items-center
    gap-3
  ">

    <div className="
      w-3
      h-3
      rounded-full
      bg-green-400
    " />

    <p className="
      text-green-300
      font-medium
    ">

      AI Engine Connected

    </p>

  </div>

) : (

  <div>

    <div className="
      flex
      items-center
      gap-3
      mb-3
    ">

      <div className="
        w-3
        h-3
        rounded-full
        bg-red-400
      " />

      <p className="
        text-red-300
        font-medium
      ">

        ResumeAI Engine Offline

      </p>

    </div>

    <div className="
      flex
      items-center
      justify-between
      gap-6
      mt-4
    ">

      <div>

  <p className="
    text-slate-200
    text-sm
    leading-7
    max-w-2xl
  ">

    ResumeAI uses a lightweight
    local AI engine for secure
    semantic resume analysis.

  </p>

  <div className="
    mt-4
    space-y-2
    text-sm
    text-slate-400
  ">

    <p>
      1. Download the AI Engine
    </p>

    <p>
      2. Open the downloaded file
    </p>

    <p>
      3. Initial setup may take ~60 seconds
    </p>

    <p>
      4. ResumeAI connects automatically
    </p>

  </div>

</div>

      <div
  className="
    flex
    flex-col
    items-center
    shrink-0
  "
>

  <a
    href="/ResumeAI-Engine.bat"
    download
    onClick={() =>
      setTryingToConnect(true)
    }
    className="
      inline-flex
      items-center
      gap-2
      justify-center
      px-5
      py-3
      rounded-xl
      border
      border-white/10
      bg-white/5
      hover:bg-white/10
      backdrop-blur-xl
      text-white
      font-semibold
      transition
    "
  >

    <Zap size={16} />

    Download AI Engine

  </a>

  <p className="
    text-xs
    text-slate-500
    mt-3
    text-center
    leading-5
  ">

    Open-source • Runs locally
    <br />
    No personal data uploaded

  </p>

</div>

    </div>

  </div>

)}



</div>
          <div className="two-col">
            <div className="card">
              <div className="card-label"><FileText size={12} />Resume PDF</div>
              <label
                className={`upload-zone${drag ? " drag" : ""}`}
                onDragOver={e => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); setFile(e.dataTransfer.files[0]); }}
              >
                <UploadCloud size={36} style={{ color: "var(--accent)", opacity: .7 }} />
                <h4>{file ? "File ready ✓" : "Drop PDF here"}</h4>
                <p>or click to browse</p>
                {file && <div className="file-chip"><FileText size={12} />{file.name}</div>}
                <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
              </label>
            </div>

            <div className="card">
              <div className="card-label"><Star size={12} />Quick Tips</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["Mirror job keywords", "Use the exact terminology from the posting."],
                  ["Quantify achievements", "Numbers make your impact concrete and scannable."],
                  ["Keep it ATS-friendly", "Avoid tables, graphics, and unusual fonts."],
                ].map(([t, d], i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", marginTop: 7, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{t}</div>
                      <div style={{ fontSize: 12, color: "var(--muted2)", lineHeight: 1.6 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card jd-card">
              <div className="card-label"><Brain size={12} />Job Description</div>
              <textarea className="jd-input" placeholder="Paste the full job description here — include responsibilities, requirements, and nice-to-haves for best results..." value={jd} onChange={e => setJd(e.target.value)} />
            </div>
          </div>

          <button className="btn-analyze" onClick={handleAnalyze} disabled={loading}>
            {loading
              ? <><Loader2 size={20} style={{ animation: "spin .8s linear infinite" }} />Analyzing your resume…</>
              : <><Zap size={20} />Analyze My Resume</>
            }
          </button>

          {result && (
            <div className="results-wrap fade-up" id="results">
              <div className="results-divider">Analysis Results</div>
              <div className="score-banner">
                <Ring score={result.score} />
                <div className="score-info">
                  <h2>{grade.label} Match</h2>
                  <p>{scoreMsg(result.score)}</p>
                  <div className="sim-chip"><Brain size={12} />Semantic similarity: {(result.similarity * 100).toFixed(2)}%</div>
                </div>
                <div className="score-grade">
                  <div className="grade-letter" style={{ color: grade.c }}>{grade.l}</div>
                  <div className="grade-label">Grade</div>
                </div>
              </div>

              <div className="skills-row">
                <div className="skills-card">
                  <div className="skills-card-header">
                    <CheckCircle2 size={18} style={{ color: "var(--accent)" }} />
                    <h3>Matched Skills</h3>
                    <span className="skills-count green">{result.matched_skills?.length ?? 0}</span>
                  </div>
                  <div className="tags">
                    {result.matched_skills?.length > 0
                      ? result.matched_skills.map((s, i) => <span key={i} className="tag g">{s}</span>)
                      : <p className="empty">No matched skills found.</p>}
                  </div>
                </div>
                <div className="skills-card">
                  <div className="skills-card-header">
                    <AlertCircle size={18} style={{ color: "var(--danger)" }} />
                    <h3>Missing Skills</h3>
                    <span className="skills-count red">{result.missing_skills?.length ?? 0}</span>
                  </div>
                  <div className="tags">
                    {result.missing_skills?.length > 0
                      ? result.missing_skills.map((s, i) => <span key={i} className="tag r">{s}</span>)
                      : <p className="empty">No skill gaps detected!</p>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <div className="section">
          <div className="section-eyebrow">Features</div>
          <h2 className="section-title">Everything you need<br />to get hired</h2>
          <div className="features-grid">
            {[
              { icon: "🧠", bg: "rgba(110,231,183,.08)", title: "Semantic AI Matching", desc: "Goes beyond keywords — understands the meaning behind your experience." },
              { icon: "⚡", bg: "rgba(251,191,36,.08)", title: "Instant Results", desc: "Full analysis in under 60 seconds. No waiting, no queues, no sign-up." },
              { icon: "🎯", bg: "rgba(129,140,248,.08)", title: "ATS Score", desc: "See how an Applicant Tracking System would rank you before you apply." },
              { icon: "🛡️", bg: "rgba(248,113,113,.08)", title: "Skill Gap Analysis", desc: "Pinpoint exactly which skills are missing so you can address them." },
              { icon: "📊", bg: "rgba(34,211,238,.08)", title: "Grade System", desc: "Clear A–F grade gives you an at-a-glance read on your match quality." },
              { icon: "🔒", bg: "rgba(167,139,250,.08)", title: "Private & Secure", desc: "Analyzed in real-time and never stored on our servers." },
            ].map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feat-icon" style={{ background: f.bg }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo"><div className="nav-logo-dot" />ResumeAI</div>
        <div className="footer-copy">© 2025 ResumeAI · Built with AI embeddings</div>
      </footer>
    </>
  );
}