import { useState, useEffect, useRef, useMemo } from "react";

// ─── FLOATING RUNE FIELD ─────────────────────────────────────────────────────
function RuneField({ count = 30, opacity = 0.06 }) {
  const runes = useRef(
    Array.from({ length: count }, () => ({
      glyph: RUNES[Math.floor(Math.random() * RUNES.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 22,
      color: [C.purple, C.pink, C.gold, C.blue, C.green][Math.floor(Math.random() * 5)],
      dur: 10 + Math.random() * 16,
      delay: Math.random() * 10,
    }))
  ).current;

  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
      {runes.map((r, i) => (
        <div key={i} style={{
          position:"absolute", left:`${r.x}%`, top:`${r.y}%`,
          fontSize:r.size, color:r.color, opacity,
          userSelect:"none", fontFamily:"monospace",
          animation:`floatRune ${r.dur}s ${r.delay}s ease-in-out infinite`,
        }}>{r.glyph}</div>
      ))}
    </div>
  );
}

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────
function Divider({ color = C.purple }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:16, margin:"0 auto", maxWidth:200 }}>
      <div style={{ flex:1, height:1, background:`linear-gradient(90deg, transparent, ${color}44)` }} />
      <span style={{ color, fontSize:14, opacity:0.6 }}>✦</span>
      <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${color}44, transparent)` }} />
    </div>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, color, live }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${color}08` : C.surface,
        border:`1px solid ${hovered ? color+"44" : C.border}`,
        borderRadius:16, padding:"24px 22px",
        transition:"all 0.3s ease",
        cursor:"default",
        position:"relative",
        overflow:"hidden",
      }}>
      {live && (
        <div style={{
          position:"absolute", top:14, right:14,
          background:`${C.green}18`, border:`1px solid ${C.green}44`,
          borderRadius:20, padding:"3px 10px",
          fontSize:8, color:C.green, fontFamily:"monospace", letterSpacing:2,
        }}>✓ LIVE</div>
      )}
      <div style={{ fontSize:28, marginBottom:14 }}>{icon}</div>
      <div style={{ fontSize:15, color:hovered ? color : C.text, fontStyle:"italic",
        fontFamily:"Georgia,serif", marginBottom:8, transition:"color 0.3s" }}>{title}</div>
      <div style={{ fontSize:12, color:C.textMid, lineHeight:1.8 }}>{desc}</div>
      {hovered && (
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:2,
          background:`linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}/>
      )}
    </div>
  );
}

// ─── ROADMAP CARD ─────────────────────────────────────────────────────────────
function RoadmapCard({ icon, title, desc, color, tag }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${color}06` : C.surface,
        border:`1px solid ${hovered ? color+"33" : C.border}`,
        borderRadius:16, padding:"22px 20px",
        transition:"all 0.3s ease",
        position:"relative", overflow:"hidden",
      }}>
      <div style={{
        position:"absolute", top:14, right:14,
        background:`${color}14`, border:`1px solid ${color}30`,
        borderRadius:20, padding:"3px 10px",
        fontSize:8, color, fontFamily:"monospace", letterSpacing:2,
      }}>{tag}</div>
      <div style={{ fontSize:24, marginBottom:12 }}>{icon}</div>
      <div style={{ fontSize:14, color: hovered ? color : C.text, fontStyle:"italic",
        fontFamily:"Georgia,serif", marginBottom:7, transition:"color 0.3s", paddingRight:60 }}>{title}</div>
      <div style={{ fontSize:12, color:C.textMid, lineHeight:1.8 }}>{desc}</div>
    </div>
  );
}

// ─── STAT BADGE ───────────────────────────────────────────────────────────────
function StatBadge({ value, label, color }) {
  return (
    <div style={{ textAlign:"center", padding:"16px 24px" }}>
      <div style={{ fontSize:32, color, fontFamily:"monospace", fontWeight:"bold",
        textShadow:`0 0 20px ${color}66` }}>{value}</div>
      <div style={{ fontSize:10, color:C.textMid, fontFamily:"monospace",
        letterSpacing:2, marginTop:4 }}>{label}</div>
    </div>
  );
}

// ─── MAIN LANDING PAGE ────────────────────────────────────────────────────────
function LandingPage({ onEnter }) {
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const LIVE_FEATURES = [
    { icon:"⚗️", color:C.purple, title:"The Spell Builder", tag:true,
      desc:"Five layers of structured prompt architecture — Anchor, Feeling, Voice, Constraint, Permission. Build prompts that hit, not miss." },
    { icon:"◈", color:C.pink, title:"The Codex", tag:true,
      desc:"A library of master spells across Language Models and Image Generation. Load, remix, and save your own alongside the classics." },
    { icon:"✦", color:C.gold, title:"Quality Checker", tag:true,
      desc:"Real-time scoring across four dimensions. Know before you cast whether your spell is ready — or needs more power." },
    { icon:"🏆", color:C.orange, title:"XP & Rank System", tag:true,
      desc:"50 levels from Apprentice to Merlin. Every spell cast, saved, and mastered earns you XP. The Playground rewards the curious." },
    { icon:"🧙", color:C.green, title:"Wizard Profiles", tag:true,
      desc:"Your avatar, your handle, your rank. A wizard's identity follows them through the Playground — and soon, beyond it." },
    { icon:"🌀", color:C.blue, title:"Image Mode Detection", tag:true,
      desc:"The Spell Builder detects when you're building for image generation and reshapes itself — same layers, different alchemy." },
  ];

  const ROADMAP = [
    { icon:"📜", color:C.purple, tag:"COMING NEXT",
      title:"The Grimoire",
      desc:"The Playground's complete library of lessons on prompt engineering. Chapters, exercises, and incantations that teach through doing. The curriculum lives inside the Playground itself." },
    { icon:"🎓", color:C.pink, tag:"COMING NEXT",
      title:"Courses & Learning Paths",
      desc:"Four full courses — The AI Spellbook, Bottle Your Brilliance, Prompting Mastery, and Demystify AI. Structured learning with badges, completions, and XP rewards for every lesson." },
    { icon:"🗺️", color:C.gold, tag:"COMING NEXT",
      title:"Wizards Playground: School of Prompt Wizardry",
      desc:"A fully gamified learning world. Classrooms. Study halls. Quests. Challenge rooms. The entire Playground reimagined as a school where every lesson is an adventure." },
    { icon:"🌐", color:C.green, tag:"THE COMMONS",
      title:"The Spell Exchange",
      desc:"Share your best spells with the community. Discover what other wizards are casting. Rate, remix, and build on each other's work. The collective spellbook, written by all." },
    { icon:"💬", color:C.blue, tag:"THE COMMONS",
      title:"The Wizards' Hall",
      desc:"Where practitioners gather. Post what you're learning, share your AI creations, ask questions, show your results. A community built around prompt craft — not just content." },
    { icon:"🔥", color:C.orange, tag:"THE COMMONS",
      title:"Community Challenges",
      desc:"Weekly prompting challenges with themes, judging, and prizes. The Playground sets the brief — the wizards answer the call. Rankings, spotlights, and hall-of-fame spells." },
    { icon:"⚡", color:C.purple, tag:"POWER TOOLS",
      title:"Prompt History",
      desc:"Every spell you've ever cast, searchable and retrievable. See how your craft has evolved. Remix past work. Never lose a good incantation to a closed tab again." },
    { icon:"🔮", color:C.pink, tag:"POWER TOOLS",
      title:"Spell Chaining",
      desc:"Build multi-step prompt sequences. Output flows into input. One cast triggers another. Complex AI workflows assembled in the Playground without a single line of code." },
    { icon:"📱", color:C.gold, tag:"POWER TOOLS",
      title:"Cross-Device Sync",
      desc:"Your Codex, your XP, your rank — available on every device. Spells cast on mobile appear on desktop. The Playground follows you, not the other way around." },
    { icon:"🎭", color:C.green, tag:"POWER TOOLS",
      title:"Persona Vault",
      desc:"Store your AI personas — the voices, roles, and characters you return to again and again. Pull them into any spell with one click. Your cast of characters, always ready." },
    { icon:"📲", color:C.blue, tag:"PLATFORM",
      title:"Mobile App",
      desc:"iOS and Android. Cast spells from anywhere. The full Playground in your pocket — builder, codex, community, and courses. Native. Fast. Designed for thumbs." },
    { icon:"🌍", color:C.orange, tag:"PLATFORM",
      title:"Public Wizard Profiles",
      desc:"Your profile becomes a page. Share your rank, your best spells, your creations. A portfolio of your prompt craft, visible to the world — or only to the Playground." },
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text,
      fontFamily:"Georgia,serif", overflowX:"hidden" }}>

      <style>{`
        @keyframes floatRune {
          0%,100% { transform:translateY(0) rotate(0deg); opacity:0.5; }
          50%      { transform:translateY(-20px) rotate(6deg); opacity:1; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity:0.6; }
          50%      { opacity:1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes orbFloat {
          0%,100% { transform:translateY(0px) scale(1); }
          50%      { transform:translateY(-30px) scale(1.05); }
        }
        .land-btn-primary {
          background: linear-gradient(135deg,#7b6cf6,#c084fc);
          border: none; border-radius:12px; padding:16px 40px;
          color:#fff; font-size:13px; cursor:pointer;
          letter-spacing:2px; font-family:monospace;
          transition:all 0.3s ease;
          box-shadow: 0 0 30px rgba(167,139,250,0.3);
        }
        .land-btn-primary:hover {
          transform:translateY(-2px);
          box-shadow: 0 8px 40px rgba(167,139,250,0.5);
        }
        .land-btn-ghost {
          background:transparent;
          border:1px solid #262636; border-radius:12px; padding:16px 32px;
          color:#56566e; font-size:12px; cursor:pointer;
          letter-spacing:2px; font-family:monospace;
          transition:all 0.25s ease;
        }
        .land-btn-ghost:hover {
          border-color:#a78bfa44; color:#a78bfa;
        }
        .section-fade {
          opacity:0; transform:translateY(20px);
          animation:fadeUp 0.7s ease forwards;
        }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#2a2a3a; border-radius:2px; }
      `}</style>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        minHeight:"100vh", position:"relative",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"80px 24px", textAlign:"center",
        overflow:"hidden",
      }}>
        {/* Background orbs */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:"15%", left:"10%",
            width:400, height:400, borderRadius:"50%",
            background:"radial-gradient(circle, #a78bfa0a 0%, transparent 70%)",
            animation:"orbFloat 12s ease-in-out infinite" }}/>
          <div style={{ position:"absolute", bottom:"20%", right:"8%",
            width:300, height:300, borderRadius:"50%",
            background:"radial-gradient(circle, #f472b608 0%, transparent 70%)",
            animation:"orbFloat 15s 3s ease-in-out infinite" }}/>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
            width:600, height:600, borderRadius:"50%",
            background:"radial-gradient(circle, #fbbf2405 0%, transparent 65%)" }}/>
        </div>

        <RuneField count={28} opacity={0.055} />

        {/* Crest */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition:"all 1s ease",
          marginBottom:32,
        }}>
          <div style={{ fontSize:64, marginBottom:4,
            filter:"drop-shadow(0 0 30px rgba(167,139,250,0.6))",
            animation:"orbFloat 8s ease-in-out infinite" }}>⚗️</div>
        </div>

        {/* School name */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition:"all 1s 0.2s ease",
          marginBottom:10,
        }}>
          <div style={{ fontSize:11, color:C.textMid, fontFamily:"monospace",
            letterSpacing:6, marginBottom:16 }}>
            WELCOME TO
          </div>
          <h1 style={{
            fontSize:"clamp(32px, 5.5vw, 72px)",
            background:"linear-gradient(135deg, #e8e4d9 20%, #a78bfa 60%, #f472b6 100%)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            fontStyle:"italic",
            letterSpacing:"-2px",
            lineHeight:1.05,
            margin:0,
          }}>
            Wizards Playground
          </h1>
          <h2 style={{
            fontSize:"clamp(14px, 2vw, 20px)",
            color:C.textMid,
            fontStyle:"normal",
            letterSpacing:6,
            fontFamily:"monospace",
            fontWeight:"normal",
            margin:"10px 0 0",
          }}>
            SCHOOL OF PROMPT WIZARDRY
          </h2>
        </div>

        {/* Sub brand */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition:"all 1s 0.4s ease",
          marginBottom:12,
        }}>
          <div style={{ fontSize:13, color:C.textMid, letterSpacing:4,
            fontFamily:"monospace", marginTop:8 }}>
            ⚗️ SCHOOL OF PROMPT WIZARDRY
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition:"all 1s 0.55s ease",
          marginBottom:52,
        }}>
          <p style={{
            fontSize:"clamp(16px, 2.2vw, 22px)",
            color:C.textMid,
            lineHeight:1.8,
            maxWidth:640,
            margin:"24px auto 0",
            fontStyle:"italic",
          }}>
            The world's first gamified school for prompt engineering — where spells are prompts,
            lessons are quests, and every word you write brings you closer to mastery.
          </p>
        </div>

        {/* CTA */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition:"all 1s 0.7s ease",
          display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center",
        }}>
          <button className="land-btn-primary" onClick={onEnter}>
            ENTER THE PLAYGROUND ✦
          </button>
          <button className="land-btn-ghost" onClick={() => {
            document.getElementById("what-is-this")?.scrollIntoView({ behavior:"smooth" });
          }}>
            LEARN MORE ↓
          </button>
        </div>

        {/* Scroll nudge */}
        <div style={{
          position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          opacity:0.3, animation:"pulse 2.5s ease-in-out infinite",
        }}>
          <div style={{ fontSize:9, fontFamily:"monospace", letterSpacing:3, color:C.textMid }}>SCROLL</div>
          <div style={{ fontSize:18, color:C.textMid }}>↓</div>
        </div>
      </section>

      {/* ── WHAT IS THIS ────────────────────────────────────────────────────── */}
      <section id="what-is-this" style={{
        padding:"100px 24px", maxWidth:1000, margin:"0 auto",
      }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ fontSize:9, color:C.purple, fontFamily:"monospace",
            letterSpacing:4, marginBottom:16 }}>THE SCHOOL</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,48px)", color:C.text,
            fontStyle:"italic", margin:"0 0 20px", letterSpacing:"-1px" }}>
            Words are spells.
          </h2>
          <p style={{ fontSize:16, color:C.textMid, lineHeight:1.9,
            maxWidth:680, margin:"0 auto", fontStyle:"italic" }}>
            Most people type at AI and hope. Wizards craft. Every prompt has architecture —
            a structure beneath the surface that separates a weak request from a master incantation.
            Wizards Playground is where you learn to build them, one layer at a time.
          </p>
        </div>

        <Divider color={C.purple} />

        <div style={{ marginTop:64, display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
          {[
            { icon:"⊕", color:C.purple, title:"Not a chatbot. A craft.",
              body:"The Playground doesn't talk to AI for you. It teaches you to talk to AI yourself — with precision, intention, and a voice that's unmistakably yours." },
            { icon:"◈", color:C.pink, title:"Gamified from the ground up.",
              body:"XP, ranks, quests, challenges, and a 50-level journey from Apprentice to Merlin. Learning prompt engineering should feel like levelling up — because it is." },
            { icon:"◎", color:C.gold, title:"A school, not a tool.",
              body:"Every feature teaches. The Spell Builder is a lesson. The Codex is a library. The Grimoire is the curriculum. The Playground is the classroom." },
          ].map(({ icon, color, title, body }) => (
            <div key={title} style={{ background:C.surface, border:`1px solid ${C.border}`,
              borderRadius:16, padding:"28px 24px" }}>
              <div style={{ fontSize:24, color, marginBottom:14 }}>{icon}</div>
              <div style={{ fontSize:16, color:C.text, fontStyle:"italic",
                fontFamily:"Georgia,serif", marginBottom:10 }}>{title}</div>
              <div style={{ fontSize:13, color:C.textMid, lineHeight:1.8 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <section style={{
        background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`,
        padding:"8px 24px",
      }}>
        <div style={{ maxWidth:900, margin:"0 auto",
          display:"flex", justifyContent:"space-around",
          flexWrap:"wrap", gap:8 }}>
          <StatBadge value="50" label="LEVELS TO MASTER"   color={C.purple} />
          <StatBadge value="5"  label="SPELL LAYERS"        color={C.pink} />
          <StatBadge value="4"  label="COURSES COMING"      color={C.gold} />
          <StatBadge value="∞"  label="SPELLS TO CAST"      color={C.green} />
          <StatBadge value="1"  label="SCHOOL OF WIZARDRY"  color={C.orange} />
        </div>
      </section>

      {/* ── LIVE NOW ────────────────────────────────────────────────────────── */}
      <section style={{ padding:"100px 24px", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px",
            background:`${C.green}12`, border:`1px solid ${C.green}33`,
            borderRadius:20, marginBottom:20 }}>
            <span style={{ width:7, height:7, borderRadius:"50%",
              background:C.green, display:"inline-block",
              animation:"pulse 1.8s ease-in-out infinite" }}/>
            <span style={{ fontSize:9, color:C.green, fontFamily:"monospace",
              letterSpacing:3 }}>OPEN FOR ENROLMENT</span>
          </div>
          <h2 style={{ fontSize:"clamp(26px,3.5vw,44px)", color:C.text,
            fontStyle:"italic", margin:"0 0 16px", letterSpacing:"-1px" }}>
            What's in the Playground now
          </h2>
          <p style={{ fontSize:14, color:C.textMid, maxWidth:560,
            margin:"0 auto", lineHeight:1.8 }}>
            The school is open. The first rooms are lit. Enter today and begin your training.
          </p>
        </div>

        <div style={{ display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
          {LIVE_FEATURES.map(f => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title}
              desc={f.desc} color={f.color} live={f.tag} />
          ))}
        </div>
      </section>

      {/* ── ROADMAP ─────────────────────────────────────────────────────────── */}
      <section style={{
        padding:"100px 24px",
        background:`linear-gradient(180deg, ${C.bg} 0%, #0a0814 50%, ${C.bg} 100%)`,
        position:"relative", overflow:"hidden",
      }}>
        <RuneField count={16} opacity={0.03} />
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>

          <div style={{ textAlign:"center", marginBottom:64 }}>
            <div style={{ fontSize:9, color:C.gold, fontFamily:"monospace",
              letterSpacing:4, marginBottom:16 }}>THE GRIMOIRE</div>
            <h2 style={{ fontSize:"clamp(26px,3.5vw,44px)", color:C.text,
              fontStyle:"italic", margin:"0 0 16px", letterSpacing:"-1px" }}>
              Where we're going
            </h2>
            <p style={{ fontSize:14, color:C.textMid, maxWidth:580,
              margin:"0 auto", lineHeight:1.8 }}>
              The Playground is being built in the open. Every feature below is already in progress — and early wizards who join now help shape what gets built next.
            </p>
          </div>

          {/* GRIMOIRE & COURSES */}
          <div style={{ marginBottom:48 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
              <div style={{ fontSize:9, color:C.purple, fontFamily:"monospace", letterSpacing:3 }}>
                ◈ LEARN
              </div>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${C.purple}33, transparent)` }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
              {ROADMAP.filter(r => r.tag === "COMING NEXT").map(r => (
                <RoadmapCard key={r.title} {...r} />
              ))}
            </div>
          </div>

          {/* COMMUNITY */}
          <div style={{ marginBottom:48 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
              <div style={{ fontSize:9, color:C.green, fontFamily:"monospace", letterSpacing:3 }}>
                ◈ COMMUNE
              </div>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${C.green}33, transparent)` }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
              {ROADMAP.filter(r => r.tag === "THE COMMONS").map(r => (
                <RoadmapCard key={r.title} {...r} />
              ))}
            </div>
          </div>

          {/* POWER TOOLS */}
          <div style={{ marginBottom:48 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
              <div style={{ fontSize:9, color:C.orange, fontFamily:"monospace", letterSpacing:3 }}>
                ◈ CREATE
              </div>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${C.orange}33, transparent)` }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
              {ROADMAP.filter(r => r.tag === "POWER TOOLS").map(r => (
                <RoadmapCard key={r.title} {...r} />
              ))}
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
              <div style={{ fontSize:9, color:C.blue, fontFamily:"monospace", letterSpacing:3 }}>
                ◈ EXPAND
              </div>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${C.blue}33, transparent)` }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
              {ROADMAP.filter(r => r.tag === "PLATFORM").map(r => (
                <RoadmapCard key={r.title} {...r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ──────────────────────────────────────────────────────── */}
      <section style={{ padding:"100px 24px", maxWidth:760, margin:"0 auto", textAlign:"center" }}>
        <Divider color={C.purple} />
        <div style={{ marginTop:60 }}>
          <div style={{ fontSize:11, color:C.textDim, fontFamily:"monospace",
            letterSpacing:4, marginBottom:32 }}>FROM THE PLAYGROUND</div>

          <blockquote style={{ margin:0, padding:0 }}>
            <p style={{ fontSize:"clamp(18px,2.5vw,26px)", color:C.text,
              fontStyle:"italic", lineHeight:1.8, marginBottom:24,
              letterSpacing:"-0.3px" }}>
              "A prompt is not a request. It is a spell — with a caster, a context,
              an incantation, a constraint, and a permission to surprise you.
              Most people write the incantation and forget the rest.
              Wizards know: the power is in all five."
            </p>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
              <div style={{ width:48, height:1, background:`linear-gradient(90deg, transparent, ${C.purple}44)` }} />
              <span style={{ fontSize:12, color:C.textMid, fontFamily:"monospace", letterSpacing:2 }}>
                WIZARDS PLAYGROUND · HEADMASTER
              </span>
              <div style={{ width:48, height:1, background:`linear-gradient(90deg, ${C.purple}44, transparent)` }} />
            </div>
          </blockquote>
        </div>
      </section>

      {/* ── RANK PREVIEW ────────────────────────────────────────────────────── */}
      <section style={{
        padding:"80px 24px",
        background:C.surface,
        borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:9, color:C.gold, fontFamily:"monospace",
            letterSpacing:4, marginBottom:16 }}>THE JOURNEY</div>
          <h2 style={{ fontSize:"clamp(22px,3vw,38px)", color:C.text,
            fontStyle:"italic", margin:"0 0 48px", letterSpacing:"-1px" }}>
            Fifty levels. One destination.
          </h2>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10 }}>
            {[
              { rank:"Apprentice",    color:"#9ca3af", levels:"1–4" },
              { rank:"Initiate",      color:"#6ee7b7", levels:"5–8" },
              { rank:"Scribe",        color:"#60a5fa", levels:"9–12" },
              { rank:"Conjurer",      color:"#a78bfa", levels:"13–17" },
              { rank:"Mage",          color:"#f472b6", levels:"18–22" },
              { rank:"Archmage",      color:"#fb923c", levels:"23–27" },
              { rank:"Grand Archmage",color:"#fbbf24", levels:"28–33" },
              { rank:"Spellbinder",   color:"#f87171", levels:"34–38" },
              { rank:"Enchanter",     color:"#e879f9", levels:"39–43" },
              { rank:"Arcane Master", color:"#c084fc", levels:"44–49" },
              { rank:"Merlin",        color:"#fde68a", levels:"50" },
            ].map(({ rank, color, levels }) => (
              <div key={rank} style={{
                padding:"8px 18px", borderRadius:20,
                background:`${color}0e`, border:`1px solid ${color}33`,
                display:"flex", alignItems:"center", gap:8,
              }}>
                <span style={{ width:7, height:7, borderRadius:"50%",
                  background:color, display:"inline-block",
                  boxShadow:`0 0 6px ${color}` }}/>
                <span style={{ fontSize:11, color, fontFamily:"monospace", letterSpacing:1 }}>{rank}</span>
                <span style={{ fontSize:9, color:`${color}88`, fontFamily:"monospace" }}>{levels}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section style={{
        padding:"120px 24px", textAlign:"center",
        position:"relative", overflow:"hidden",
      }}>
        <RuneField count={20} opacity={0.05} />
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ fontSize:68, marginBottom:24,
            filter:"drop-shadow(0 0 40px rgba(167,139,250,0.5))",
            animation:"orbFloat 8s ease-in-out infinite" }}>⚗️</div>
          <h2 style={{
            fontSize:"clamp(28px,4.5vw,58px)", color:C.text,
            fontStyle:"italic", margin:"0 0 12px",
            letterSpacing:"-1.5px",
            textShadow:"0 0 60px rgba(167,139,250,0.25)",
          }}>
            Your first spell awaits.
          </h2>
          <p style={{ fontSize:15, color:C.textMid, maxWidth:500,
            margin:"16px auto 44px", lineHeight:1.8, fontStyle:"italic" }}>
            The school is open. The library is stocked.
            Every wizard who has ever reached mastery started exactly here.
          </p>
          <button className="land-btn-primary"
            style={{ fontSize:14, padding:"18px 52px" }}
            onClick={onEnter}>
            ENTER THE PLAYGROUND ✦
          </button>
          <div style={{ marginTop:28, fontSize:12, color:C.textDim,
            fontFamily:"monospace", letterSpacing:2, fontStyle:"italic" }}>
            One incantation at a time.
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop:`1px solid ${C.border}`, padding:"28px 24px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:12,
        maxWidth:"100%",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18 }}>⚗️</span>
          <span style={{ fontSize:13, color:C.textMid, fontStyle:"italic",
            fontFamily:"Georgia,serif" }}>Wizards Playground</span>
          <span style={{ fontSize:9, color:C.textDim, fontFamily:"monospace",
            letterSpacing:2 }}>· BETA</span>
        </div>
        <div style={{ fontSize:10, color:C.textDim, fontFamily:"monospace",
          letterSpacing:2 }}>
          WIZARDS PLAYGROUND · SCHOOL OF PROMPT WIZARDRY
        </div>
        <button onClick={onEnter}
          style={{ background:"none", border:"none", color:C.textMid,
            fontSize:11, cursor:"pointer", fontFamily:"monospace",
            letterSpacing:2, padding:0 }}>
          ENTER ✦
        </button>
      </footer>
    </div>
  );
}


// ─── RUNES ────────────────────────────────────────────────────────────────────
const RUNES = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ","ᚦ","ᚣ","ᛣ","ᛤ","✦","◈","⊕","◎","◇","◻","❋"];


const C = {
  bg:"#08080e", surface:"#0e0e18", surface2:"#13131f",
  border:"#1c1c2a", border2:"#262636",
  text:"#e8e4d9", textMid:"#56566e", textDim:"#30303e",
  purple:"#a78bfa", pink:"#f472b6", green:"#34d399",
  orange:"#fb923c", blue:"#60a5fa", gold:"#fbbf24",
};

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
const SECTIONS = [
  { id:"anchor",     label:"The Anchor",     number:"01", symbol:"⊕", color:C.purple,
    description:"Who is speaking.",
    prompt:"Set the role, expertise, and perspective you want the AI to inhabit.",
    placeholder:"You are a senior UX researcher with 10 years in fintech, specialising in onboarding flows for anxious first-time users…",
    tip:"The strongest prompts start here. 'You are a…' anchors everything that follows.", optional:false },
  { id:"feeling",    label:"The Feeling",    number:"02", symbol:"◎", color:C.pink,
    description:"What surrounds it.",
    prompt:"Give the context, backstory, and situation the AI needs before it can begin.",
    placeholder:"I'm building a mobile app for Gen Z users navigating financial anxiety for the first time…",
    tip:"Don't assume the AI knows what you know. Surface the details that would change the answer.", optional:false },
  { id:"voice",      label:"The Voice",      number:"03", symbol:"◈", color:C.green,
    description:"What must be done.",
    prompt:"State the task with precision. One clear action, not five vague ones.",
    placeholder:"Write three onboarding screens. Each should feel like a trusted friend talking — warm, specific, zero jargon…",
    tip:"Use action verbs. Write. Analyze. Rewrite. Compare. Generate. Vague tasks get vague results.", optional:false },
  { id:"constraint", label:"The Constraint", number:"04", symbol:"◻", color:C.orange,
    description:"The shape it must take.",
    prompt:"Define the output format — structure, length, tone, language, any rules.",
    placeholder:"Return each screen as a JSON object: { headline, subtext, cta }. Max 12 words per headline…",
    tip:"If you need JSON, say JSON. If you need a list, say a list. Format shapes thinking.", optional:false },
  { id:"permission", label:"The Permission", number:"05", symbol:"◇", color:C.blue,
    description:"What it's allowed to become.",
    prompt:"Show what good looks like. One great example is worth ten lines of description.",
    placeholder:"Here's a screen I love: 'Hey — no pressure. We're just glad you're here.' That tone. That trust…",
    tip:"Showing beats telling. Paste even one example of what you want and everything sharpens.", optional:true },
];

const IMAGE_SECTIONS = [
  { id:"anchor",     label:"The Subject",   number:"01", symbol:"⊕", color:C.purple,
    description:"What are you generating.",
    prompt:"Describe the core subject, scene type, or medium.",
    placeholder:"Cinematic portrait of a woman in her 40s, shot on 35mm film, standing in a doorway…",
    tip:"Name the output type first — portrait, landscape, product shot, illustration.", optional:true },
  { id:"feeling",    label:"The Mood",      number:"02", symbol:"◎", color:C.pink,
    description:"The emotional atmosphere.",
    prompt:"Describe the feeling, energy, and emotional register of the image.",
    placeholder:"Quiet power. The moment before something important. Melancholic but not sad…",
    tip:"Mood is the invisible layer that makes an image feel intentional rather than accidental.", optional:true },
  { id:"voice",      label:"The Scene",     number:"03", symbol:"◈", color:C.green,
    description:"The visual detail.",
    prompt:"Describe what is actually in the image — composition, lighting, colour, texture.",
    placeholder:"Golden hour light raking from the left. Shallow depth of field. Eyes sharp, background soft…",
    tip:"This is your main layer. Paint it in detail.", optional:false },
  { id:"constraint", label:"The Format",    number:"04", symbol:"◻", color:C.orange,
    description:"Technical specifications.",
    prompt:"Aspect ratio, style, rendering constraints, what to avoid.",
    placeholder:"Aspect ratio 2:3. Photorealistic. No AI smoothing on skin. No lens flare…",
    tip:"Aspect ratio, quality tags, and what NOT to include matter equally.", optional:true },
  { id:"permission", label:"The Reference", number:"05", symbol:"◇", color:C.blue,
    description:"Style and creative license.",
    prompt:"Name visual references, artists, film directors, or give creative latitude.",
    placeholder:"Reference: the visual language of Paolo Sorrentino. One unexpected lighting choice…",
    tip:"Film references, photographer names, or art movements give image AI a strong style target.", optional:true },
];

function detectImageMode(values) {
  const all = Object.values(values).join(" ").toLowerCase();
  const signals = ["aspect ratio","photorealistic","bokeh","depth of field","35mm","film grain",
    "portrait","render","illustration","cinematic","shot on","lighting","composition",
    "palette","texture","midjourney","stable diffusion","dall-e","dalle","flux","4k","8k",
    "hyperrealistic","oil painting","watercolor","pixel art","concept art","diffusion","negative prompt"];
  return signals.filter(s => all.includes(s)).length >= 2;
}

// ─── CODEX DATA ───────────────────────────────────────────────────────────────
const DEFAULT_CODEX = {
  "Language Models": [
    { title:"Deep Research Brief", description:"Extract the real picture, not the consensus.",
      spell:{ anchor:"You are a world-class research analyst and investigative journalist with deep domain expertise.", feeling:"I need a comprehensive, honest analysis of [TOPIC]. Not the surface-level consensus — the real picture, including what's contested, what's overlooked, and what the mainstream view gets wrong.", voice:"Analyze this in four sections: (1) Core Claim — the strongest version of the mainstream view. (2) Evidence For — the best supporting evidence. (3) Evidence Against — the strongest counterarguments and contradictory data. (4) Synthesis — your honest assessment of where the truth probably lies.", constraint:"Each section clearly labeled. Cite the type of evidence (studies, expert consensus, historical data) rather than specific URLs. Flag where your confidence is lower. Minimum 400 words.", permission:"If the evidence genuinely supports a contrarian conclusion, say so directly. Don't hedge to stay safe." }},
    { title:"Brand Voice Copywriter", description:"Copy that sounds like a specific brand, not like AI.",
      spell:{ anchor:"You are a senior brand copywriter with 15 years writing for premium consumer brands. You think in headlines first, emotions second, features never.", feeling:"I need copy for [BRAND/PRODUCT]. The brand is [describe brand personality]. The reader is [describe target customer and their emotional state].", voice:"Write [copy type: headline / product description / email / social caption]. The copy should make the reader feel [desired emotion], not inform them of features.", constraint:"No adjectives that describe the product as 'innovative', 'cutting-edge', 'revolutionary', or 'world-class'. No passive voice. Max [X] words. End with action, not conclusion.", permission:"If there's a more honest or unexpected angle that serves the brand better, show it alongside what I asked for." }},
    { title:"Socratic Debate Partner", description:"Pressure-test any idea without mercy.",
      spell:{ anchor:"You are a rigorous intellectual interlocutor — part philosopher, part litigator, part scientist. Your job is not to agree with me but to make my thinking stronger.", feeling:"I want to pressure-test the following idea: [STATE YOUR IDEA]. I believe it because [give your reasoning]. I want you to find every weakness, assumption, and blind spot in my argument.", voice:"Take the strongest possible opposing position. Don't strawman me — steelman my argument first, then dismantle it. Identify: (1) the weakest assumption I'm making, (2) the best counterexample to my claim, (3) an alternative framework that explains the same evidence differently.", constraint:"No agreeing with me to be polite. No hedging phrases like 'you raise a good point.' Direct, specific, intellectually rigorous.", permission:"If my idea is actually sound, say so — but only after genuinely trying to break it." }},
    { title:"Technical Concept Explainer", description:"Complex ideas made genuinely clear.",
      spell:{ anchor:"You are a brilliant science communicator who can explain anything to anyone without condescension or oversimplification. You think in analogies first.", feeling:"I need to understand [CONCEPT] at a deep level. I have [describe your background] and I'm trying to understand this because [give context].", voice:"Explain this in three layers: (1) The intuition — a concrete analogy that makes the core idea click. (2) The mechanics — how it actually works. (3) The implications — what changes once you understand this correctly.", constraint:"No jargon without immediate definition. Each layer must be self-contained. Analogies must be truly analogous, not just metaphorically similar.", permission:"If the most common explanation of this concept is subtly wrong, correct it. I want the accurate version." }},
    { title:"The Harsh Editor", description:"Cut everything that doesn't earn its place.",
      spell:{ anchor:"You are a ruthless developmental editor at a major literary press. You've edited bestsellers. You have no sentimentality about prose that isn't working.", feeling:"I'm going to share a piece of writing. I want you to edit it as if you were preparing it for publication — not for my feelings.", voice:"Read the piece and give me: (1) The single biggest structural problem. (2) The three weakest passages and exactly why. (3) What the piece is actually about versus what it thinks it's about. (4) A rewritten version of the opening paragraph.", constraint:"No praise unpaired with a specific observation. No softening language. Direct diagnosis.", permission:"If the piece needs restructuring rather than editing — say so." }},
  ],
  "Image Generation": [
    { title:"Cinematic Portrait", description:"Film-quality character portraits with mood.",
      spell:{ anchor:"Cinematic close-up portrait, 35mm film photography aesthetic", feeling:"Quiet intensity. The moment before a significant decision. Presence without performance.", voice:"Subject centered, slight downward gaze. Single practical light source from camera left, warm tungsten. Fine film grain. Shallow depth of field, background suggestion only.", constraint:"Aspect ratio 2:3. Photorealistic. No AI skin smoothing. No artificial lens flare. No blown highlights.", permission:"Reference: the intimate portrait work of Chloe Zhao and Gregory Crewdson. One unexpected compositional choice." }},
    { title:"Product Hero Shot", description:"Commercial product photography, editorial quality.",
      spell:{ anchor:"Commercial product photography, editorial quality, for a premium [PRODUCT CATEGORY]", feeling:"Considered luxury. The feeling of owning something made with genuine care. Restrained desire.", voice:"Product centered on a [surface: marble / slate / linen / concrete] surface. Studio lighting — soft diffused light from above and behind. Hero angle, 3/4 view. Colour story: [2-3 palette colours].", constraint:"Aspect ratio 4:5. Photorealistic render quality. Clean background. No props that distract from product.", permission:"One subtle environmental detail that adds narrative context without cluttering the composition." }},
    { title:"Editorial Illustration", description:"Magazine-quality conceptual illustration.",
      spell:{ anchor:"Editorial illustration for a [publication type: magazine / newspaper / book cover], [illustration style: flat graphic / painterly / collage / line art]", feeling:"Conceptual punch. The image should work as a visual metaphor for [THEME/CONCEPT]. Thought-provoking without being literal.", voice:"Strong compositional geometry. Limited, intentional palette — 3 colours maximum plus black and white. Central subject clear from 10 feet away.", constraint:"Aspect ratio 3:4. No photorealistic elements. No text.", permission:"If there's a stranger, more arresting visual approach to this concept, find it." }},
    { title:"Architectural Mood", description:"Interior or exterior spaces with atmosphere.",
      spell:{ anchor:"Architectural photography / render of a [SPACE TYPE: interior / exterior / urban / natural]", feeling:"[Choose: contemplative stillness / productive calm / dramatic grandeur / intimate warmth]. The space should feel inhabited but not busy.", voice:"Wide angle, strong perspective lines. Natural light as primary source. Golden hour or overcast for exterior. Ambient practical lighting for interior.", constraint:"Aspect ratio 16:9. Photorealistic. Human figure optional — if present, small and contextual only.", permission:"If the most interesting composition isn't the obvious one, find it." }},
  ],
};

const CAT_COLORS = { "Language Models":C.purple, "Image Generation":C.pink };

// ─── QUALITY SCORER ───────────────────────────────────────────────────────────
function scorePrompt(vals, assembledText, imageMode = false) {
  const scores = [];
  const v = id => (vals[id] || "").trim();
  const wordCount = str => str.trim().split(/\s+/).filter(Boolean).length;

  const reqIds = imageMode ? ["voice"] : ["anchor","feeling","voice","constraint"];
  const reqFilled = reqIds.filter(id => v(id).length > 0);
  const optFilled = v("permission").length > 0;
  scores.push({
    id:"completeness", label:"Completeness", icon:"◈", weight:30,
    raw: reqFilled.length === reqIds.length ? (optFilled ? 100 : 85) : Math.round((reqFilled.length/reqIds.length)*100),
    detail: reqFilled.length === reqIds.length
      ? optFilled ? "All five layers filled — maximum signal."
        : imageMode ? "Scene filled. Add Format or Reference for sharper output."
        : "Four required layers filled. The Permission layer adds depth."
      : `${reqFilled.length}/${reqIds.length} required layers filled. Missing: ${reqIds.filter(id=>!v(id)).join(", ")}.`,
  });

  const vagueWords = ["something","stuff","things","good","nice","better","great","help","maybe","perhaps","kind of","sort of","etc","somehow"];
  const powerWords = ["exactly","specifically","always","never","must","only","precisely","ensure","avoid","format","structure","output","return","write","analyse","analyze","generate","create","list","explain","compare","rewrite","summarise","summarize"];
  const lower = assembledText.toLowerCase();
  const vagueCount = vagueWords.filter(w => lower.includes(w)).length;
  const powerCount = powerWords.filter(w => lower.includes(w)).length;
  scores.push({
    id:"specificity", label:"Specificity", icon:"◎", weight:25,
    raw: Math.max(0, Math.min(100, 50 + (powerCount*8) - (vagueCount*15))),
    detail: vagueCount > 2
      ? `${vagueCount} vague words detected (${vagueWords.filter(w=>lower.includes(w)).slice(0,3).join(", ")}). Replace with precise language.`
      : powerCount >= 3 ? "Strong action language detected. Prompt gives clear, directive instructions."
      : "Reasonably specific. More action verbs would sharpen it.",
  });

  const layerWords = ["anchor","feeling","voice","constraint"].map(id => wordCount(v(id)));
  const avgWords = layerWords.reduce((a,b)=>a+b,0) / Math.max(layerWords.filter(n=>n>0).length,1);
  const thinLayers = ["anchor","feeling","voice","constraint"].filter(id => v(id).length>0 && wordCount(v(id))<6);
  scores.push({
    id:"depth", label:"Depth", icon:"◻", weight:25,
    raw: avgWords<6?30:avgWords<12?55:avgWords<20?75:avgWords<30?90:100,
    detail: thinLayers.length > 0
      ? `Thin layers: ${thinLayers.join(", ")}. Under 6 words may not give AI enough to work with.`
      : avgWords >= 20 ? "Layers have strong depth. AI has rich context to draw from."
      : "Solid depth. Expanding thinner layers will improve output.",
  });

  const formatSignals = ["format","length","words","sentences","paragraphs","bullet","numbered","list","json","table","structure","tone","short","long","brief","concise","detailed","return","output","write in","respond in","avoid","no ","don't","never"];
  const constraintText = v("constraint").toLowerCase();
  const formatCount = formatSignals.filter(s => constraintText.includes(s)).length;
  const hasLength = /\d+\s*(word|sentence|paragraph|char|line|bullet|point|page)/.test(assembledText.toLowerCase());
  scores.push({
    id:"format", label:"Output Format", icon:"◇", weight:20,
    raw: formatCount===0?25:formatCount<2?50:formatCount<4?75:hasLength?100:85,
    detail: formatCount===0 ? "No output format defined. Add length, structure, or tone to The Constraint."
      : hasLength ? "Specific length + structure defined — AI knows exactly what to produce."
      : "Format signals present. A specific length target would sharpen output further.",
  });

  const totalWeight = scores.reduce((a,s)=>a+s.weight,0);
  const composite = Math.round(scores.reduce((a,s)=>a+(s.raw*(s.weight/totalWeight)),0));

  let verdict, verdictColor, verdictBg, verdictBorder, verdictIcon, advice;
  if (composite >= 82) {
    verdict="Strong — Ready to Cast"; verdictIcon="✦"; verdictColor="#4ade80"; verdictBg="#07120c"; verdictBorder="#1a4a28";
    advice="Well-constructed. AI has clear role, context, task, and format signals. Expect strong output on the first cast.";
  } else if (composite >= 62) {
    verdict="Good — Minor Refinement"; verdictIcon="◈"; verdictColor="#fbbf24"; verdictBg="#130f04"; verdictBorder="#3a2e0a";
    advice="Will produce useful output, but one or two layers need more detail. Check the lowest-scoring dimension below.";
  } else if (composite >= 40) {
    verdict="Weak — Needs Work"; verdictIcon="◻"; verdictColor="#fb923c"; verdictBg="#110a04"; verdictBorder="#3a2010";
    advice="The core idea is here but AI doesn't have enough to work with. Fill all required layers and define output format.";
  } else {
    verdict="Incomplete — Not Ready"; verdictIcon="◎"; verdictColor="#f87171"; verdictBg="#100707"; verdictBorder="#3a1414";
    advice="Too many layers are empty or too thin. AI will guess at your intention and miss the mark.";
  }
  return { scores, composite, verdict, verdictColor, verdictBg, verdictBorder, verdictIcon, advice };
}

// ─── ACCOUNT STORAGE ─────────────────────────────────────────────────────────
// All data is namespaced by email so multiple accounts can coexist in localStorage
const ACCOUNTS_KEY = "wp_accounts_v1";
const ACTIVE_KEY   = "wp_active_v1";

function getAccounts()      { try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)||"{}"); } catch { return {}; } }
function saveAccounts(a)    { try { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(a)); } catch {} }
function getActiveEmail()   { try { return localStorage.getItem(ACTIVE_KEY)||null; } catch { return null; } }
function setActiveEmail(e)  { try { localStorage.setItem(ACTIVE_KEY, e); } catch {} }
function clearActiveEmail() { try { localStorage.removeItem(ACTIVE_KEY); } catch {} }

function accountKey(email, key) { return `wp_${email}_${key}`; }
function loadAccountData(email, key, fallback) {
  try { const v = localStorage.getItem(accountKey(email,key)); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveAccountData(email, key, val) {
  try { localStorage.setItem(accountKey(email,key), JSON.stringify(val)); } catch {}
}

// Per-account helpers
const LS_KEY = "myspells";
function loadSpells(email)    { return loadAccountData(email, LS_KEY, []); }
function saveSpells(email, a) { saveAccountData(email, LS_KEY, a); }
function loadXPForUser(email) { return loadAccountData(email, "xp", 0); }
function saveXPForUser(email, n) { saveAccountData(email, "xp", n); }
function loadProfile(email)   { return loadAccountData(email, "profile", null); }
function saveProfile(email,p) { saveAccountData(email, "profile", p); }
function isTutorialDone(email){ return loadAccountData(email, "tutorial_done", false); }
function setTutorialDone(email){ saveAccountData(email, "tutorial_done", true); }
function hashPw(pw) { return btoa(pw + "_wp_salt_v1"); }

// ─── RANKS + XP ───────────────────────────────────────────────────────────────
const RANKS = [
  { level:1,  rank:"Apprentice",    xpNeeded:0,      color:"#9ca3af", glow:"#9ca3af33" },
  { level:2,  rank:"Apprentice",    xpNeeded:50,     color:"#9ca3af", glow:"#9ca3af33" },
  { level:3,  rank:"Apprentice",    xpNeeded:130,    color:"#9ca3af", glow:"#9ca3af33" },
  { level:4,  rank:"Apprentice",    xpNeeded:250,    color:"#9ca3af", glow:"#9ca3af33" },
  { level:5,  rank:"Initiate",      xpNeeded:420,    color:"#6ee7b7", glow:"#6ee7b733" },
  { level:6,  rank:"Initiate",      xpNeeded:650,    color:"#6ee7b7", glow:"#6ee7b733" },
  { level:7,  rank:"Initiate",      xpNeeded:950,    color:"#6ee7b7", glow:"#6ee7b733" },
  { level:8,  rank:"Initiate",      xpNeeded:1320,   color:"#6ee7b7", glow:"#6ee7b733" },
  { level:9,  rank:"Scribe",        xpNeeded:1800,   color:"#60a5fa", glow:"#60a5fa33" },
  { level:10, rank:"Scribe",        xpNeeded:2400,   color:"#60a5fa", glow:"#60a5fa33" },
  { level:11, rank:"Scribe",        xpNeeded:3100,   color:"#60a5fa", glow:"#60a5fa33" },
  { level:12, rank:"Scribe",        xpNeeded:3900,   color:"#60a5fa", glow:"#60a5fa33" },
  { level:13, rank:"Conjurer",      xpNeeded:4900,   color:"#a78bfa", glow:"#a78bfa33" },
  { level:14, rank:"Conjurer",      xpNeeded:6100,   color:"#a78bfa", glow:"#a78bfa33" },
  { level:15, rank:"Conjurer",      xpNeeded:7500,   color:"#a78bfa", glow:"#a78bfa33" },
  { level:16, rank:"Conjurer",      xpNeeded:9200,   color:"#a78bfa", glow:"#a78bfa33" },
  { level:17, rank:"Conjurer",      xpNeeded:11200,  color:"#a78bfa", glow:"#a78bfa33" },
  { level:18, rank:"Mage",          xpNeeded:13500,  color:"#f472b6", glow:"#f472b633" },
  { level:19, rank:"Mage",          xpNeeded:16200,  color:"#f472b6", glow:"#f472b633" },
  { level:20, rank:"Mage",          xpNeeded:19200,  color:"#f472b6", glow:"#f472b633" },
  { level:21, rank:"Mage",          xpNeeded:22700,  color:"#f472b6", glow:"#f472b633" },
  { level:22, rank:"Mage",          xpNeeded:26700,  color:"#f472b6", glow:"#f472b633" },
  { level:23, rank:"Archmage",      xpNeeded:31200,  color:"#fb923c", glow:"#fb923c33" },
  { level:24, rank:"Archmage",      xpNeeded:36400,  color:"#fb923c", glow:"#fb923c33" },
  { level:25, rank:"Archmage",      xpNeeded:42400,  color:"#fb923c", glow:"#fb923c33" },
  { level:26, rank:"Archmage",      xpNeeded:49200,  color:"#fb923c", glow:"#fb923c33" },
  { level:27, rank:"Archmage",      xpNeeded:56900,  color:"#fb923c", glow:"#fb923c33" },
  { level:28, rank:"Grand Archmage",xpNeeded:65700,  color:"#fbbf24", glow:"#fbbf2433" },
  { level:29, rank:"Grand Archmage",xpNeeded:75700,  color:"#fbbf24", glow:"#fbbf2433" },
  { level:30, rank:"Grand Archmage",xpNeeded:87000,  color:"#fbbf24", glow:"#fbbf2433" },
  { level:31, rank:"Grand Archmage",xpNeeded:99700,  color:"#fbbf24", glow:"#fbbf2433" },
  { level:32, rank:"Grand Archmage",xpNeeded:114000, color:"#fbbf24", glow:"#fbbf2433" },
  { level:33, rank:"Grand Archmage",xpNeeded:130000, color:"#fbbf24", glow:"#fbbf2433" },
  { level:34, rank:"Spellbinder",   xpNeeded:148000, color:"#f87171", glow:"#f8717133" },
  { level:35, rank:"Spellbinder",   xpNeeded:168000, color:"#f87171", glow:"#f8717133" },
  { level:36, rank:"Spellbinder",   xpNeeded:190000, color:"#f87171", glow:"#f8717133" },
  { level:37, rank:"Spellbinder",   xpNeeded:215000, color:"#f87171", glow:"#f8717133" },
  { level:38, rank:"Spellbinder",   xpNeeded:243000, color:"#f87171", glow:"#f8717133" },
  { level:39, rank:"Enchanter",     xpNeeded:274000, color:"#e879f9", glow:"#e879f933" },
  { level:40, rank:"Enchanter",     xpNeeded:308000, color:"#e879f9", glow:"#e879f933" },
  { level:41, rank:"Enchanter",     xpNeeded:346000, color:"#e879f9", glow:"#e879f933" },
  { level:42, rank:"Enchanter",     xpNeeded:388000, color:"#e879f9", glow:"#e879f933" },
  { level:43, rank:"Enchanter",     xpNeeded:434000, color:"#e879f9", glow:"#e879f933" },
  { level:44, rank:"Arcane Master", xpNeeded:485000, color:"#c084fc", glow:"#c084fc33" },
  { level:45, rank:"Arcane Master", xpNeeded:542000, color:"#c084fc", glow:"#c084fc33" },
  { level:46, rank:"Arcane Master", xpNeeded:605000, color:"#c084fc", glow:"#c084fc33" },
  { level:47, rank:"Arcane Master", xpNeeded:675000, color:"#c084fc", glow:"#c084fc33" },
  { level:48, rank:"Arcane Master", xpNeeded:752000, color:"#c084fc", glow:"#c084fc33" },
  { level:49, rank:"Arcane Master", xpNeeded:836000, color:"#c084fc", glow:"#c084fc33" },
  { level:50, rank:"Merlin",        xpNeeded:928000, color:"#fde68a", glow:"#fde68a55" },
];

const XP_REWARDS = {
  fillSection: 10,
  completeAllSections: 25,
  castSpell: 50,
  saveToCodex: 30,
};

function getRankInfo(xp) {
  let current = RANKS[0];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].xpNeeded) { current = RANKS[i]; break; }
  }
  const next     = RANKS.find(r => r.xpNeeded > xp) || null;
  const prevXp   = current.xpNeeded;
  const nextXp   = next ? next.xpNeeded : current.xpNeeded;
  const progress = next ? Math.min(1, (xp - prevXp) / (nextXp - prevXp)) : 1;
  return { current, next, progress, xpToNext: next ? nextXp - xp : 0 };
}

// XP helpers now per-account — see loadXPForUser / saveXPForUser above


// ─── GHOST BUTTON STYLE ───────────────────────────────────────────────────────
const ghostBtn = (extra={}) => ({
  padding:"12px 24px", background:"transparent", border:`1px solid ${C.border2}`,
  borderRadius:10, color:C.textMid, fontSize:11, cursor:"pointer",
  letterSpacing:2, fontFamily:"monospace", ...extra,
});
const primaryBtn = (extra={}) => ({
  padding:"12px 24px", background:"linear-gradient(135deg,#7b6cf6,#c084fc)",
  border:"none", borderRadius:10, color:"#fff", fontSize:11, cursor:"pointer",
  letterSpacing:2, fontFamily:"monospace", ...extra,
});

// ─── SIDEBAR (outside main — no remount on parent rerender) ───────────────────
function Sidebar({ activeSecs, active, setActive, values, filled, progress, quality, view, setView, resetSpell }) {
  return (
    <div style={{ width:220, flexShrink:0, borderRight:`1px solid ${C.border}`,
      display:"flex", flexDirection:"column", overflowY:"auto", background:C.surface }}>

      <div style={{ padding:"20px 16px 12px", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ fontSize:9, color:C.textDim, letterSpacing:3, fontFamily:"monospace", marginBottom:8 }}>FIVE LAYERS</div>
        <div style={{ height:2, background:C.border, borderRadius:1, overflow:"hidden" }}>
          <div style={{ width:`${progress}%`, height:"100%", background:`linear-gradient(90deg,${C.purple}88,${C.purple})`, transition:"width 0.4s" }} />
        </div>
        <div style={{ fontSize:9, color:C.textMid, fontFamily:"monospace", marginTop:6 }}>{filled}/{activeSecs.length} filled</div>
      </div>

      {filled > 0 && (
        <button onClick={() => setView(v => v==="quality"?"builder":"quality")}
          style={{ margin:"10px 12px 0", padding:"10px 14px", boxSizing:"border-box", width:"calc(100% - 24px)",
            background: view==="quality" ? `${quality.verdictColor}12` : C.surface2,
            border:`1px solid ${view==="quality" ? quality.verdictColor+"44" : C.border}`,
            borderRadius:10, cursor:"pointer", display:"flex", alignItems:"center", gap:10, transition:"all 0.2s" }}>
          <div style={{ flex:1, textAlign:"left" }}>
            <div style={{ fontSize:8, letterSpacing:2, color:C.textMid, fontFamily:"monospace", marginBottom:3 }}>QUALITY SCORE</div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:20, fontWeight:"bold", color:quality.verdictColor, fontFamily:"monospace" }}>{quality.composite}</span>
              <span style={{ fontSize:9, color:quality.verdictColor }}>{quality.verdictIcon} {quality.verdict.split(" — ")[0]}</span>
            </div>
          </div>
          <svg width="32" height="32" style={{ transform:"rotate(-90deg)", flexShrink:0 }}>
            <circle cx="16" cy="16" r="12" fill="none" stroke={C.border2} strokeWidth="3"/>
            <circle cx="16" cy="16" r="12" fill="none" stroke={quality.verdictColor} strokeWidth="3"
              strokeDasharray={`${Math.round(quality.composite/100*75.4)} 75.4`}
              strokeLinecap="round" style={{ transition:"stroke-dasharray 0.5s ease" }}/>
          </svg>
        </button>
      )}

      {activeSecs.map((sec, i) => {
        const val = values[sec.id]?.trim();
        const isActive = active===i;
        return (
          <div key={sec.id} onClick={() => setActive(i)}
            style={{ padding:"14px 16px", cursor:"pointer", borderBottom:`1px solid ${C.border}`,
              borderLeft:`2px solid ${isActive ? sec.color : "transparent"}`,
              background: isActive ? `${sec.color}08` : "transparent", transition:"all 0.15s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:14, color: val ? sec.color : C.textDim }}>{val?"●":"○"}</span>
              <div>
                <div style={{ fontSize:9, color:C.textDim, letterSpacing:2, fontFamily:"monospace" }}>{sec.number}</div>
                <div style={{ fontSize:12, color: isActive ? sec.color : (val ? C.text : C.textMid) }}>{sec.label}</div>
              </div>
              {sec.optional && <span style={{ fontSize:8, color:C.textDim, fontFamily:"monospace", marginLeft:"auto" }}>opt</span>}
            </div>
            {val && (
              <div style={{ fontSize:10, color:C.textMid, marginTop:6, lineHeight:1.5,
                overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                {val.slice(0,60)}…
              </div>
            )}
          </div>
        );
      })}

      <div style={{ padding:16, marginTop:"auto", borderTop:`1px solid ${C.border}` }}>
        <button onClick={resetSpell} style={{ width:"100%", background:"transparent",
          border:`1px solid ${C.border}`, borderRadius:8, padding:"8px", color:C.textMid,
          fontSize:9, cursor:"pointer", letterSpacing:2, fontFamily:"monospace" }}>
          CLEAR ALL
        </button>
      </div>
    </div>
  );
}

// ─── MOBILE NAV ───────────────────────────────────────────────────────────────
function MobileNav({ activeSecs, active, setActive, values, filled, quality, view, setView }) {
  return (
    <div style={{ display:"flex", background:C.surface, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
      <div style={{ display:"flex", gap:6, padding:"10px 16px", overflowX:"auto" }}>
        {activeSecs.map((sec, i) => {
          const val = values[sec.id]?.trim();
          const isActive = view==="builder" && active===i;
          return (
            <button key={sec.id} onClick={() => { setActive(i); setView("builder"); }}
              style={{ padding:"5px 12px", borderRadius:20, flexShrink:0, display:"flex", alignItems:"center", gap:4,
                background: isActive ? `${sec.color}18` : "transparent",
                border:`1px solid ${isActive ? sec.color+"44" : "transparent"}`,
                color: isActive ? sec.color : C.textMid,
                fontSize:9, cursor:"pointer", letterSpacing:1.5, fontFamily:"monospace" }}>
              <span style={{ color: val ? sec.color : C.textDim, fontSize:8 }}>{val?"●":"○"}</span>
              {sec.label.split(" ")[1]}
            </button>
          );
        })}
        {filled > 0 && (
          <button onClick={() => setView(v => v==="quality"?"builder":"quality")}
            style={{ padding:"5px 12px", borderRadius:20, flexShrink:0, display:"flex", alignItems:"center", gap:4,
              background: view==="quality" ? `${quality.verdictColor}18` : "transparent",
              border:`1px solid ${view==="quality" ? quality.verdictColor+"44" : "transparent"}`,
              color: view==="quality" ? quality.verdictColor : C.textMid,
              fontSize:9, cursor:"pointer", letterSpacing:1.5, fontFamily:"monospace" }}>
            <span style={{ fontFamily:"monospace", fontSize:8, fontWeight:"bold" }}>{quality.composite}</span>
            QUALITY
          </button>
        )}
      </div>
    </div>
  );
}

// ─── BUILDER VIEW ─────────────────────────────────────────────────────────────
function BuilderView({ activeSecs, active, setActive, values, handleChange, showFinal,
  assembled, allReqFilled, filled, handleCast, handleCopy, copied, setSaveOpen, resetSpell, isImageMode, isMobile }) {

  const cur = activeSecs[Math.min(active, activeSecs.length-1)];

  const castStyle = (on) => ({
    padding:"14px 32px", borderRadius:12, fontSize:12, cursor: on?"pointer":"not-allowed",
    letterSpacing:2, fontFamily:"monospace", transition:"all 0.2s",
    background: on ? "linear-gradient(135deg,#7b6cf6,#c084fc)" : C.surface2,
    border:`1px solid ${on?"transparent":C.border2}`,
    color: on ? "#fff" : C.textMid,
    boxShadow: on ? "0 4px 20px rgba(167,139,250,0.3)" : "none",
  });

  return (
    <div style={{ padding: isMobile?"20px 16px":"36px 48px", maxWidth:800,
      margin:"0 auto", width:"100%", boxSizing:"border-box" }}>

      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:10, color:cur.color, letterSpacing:3, fontFamily:"monospace", marginBottom:6 }}>
          {cur.number} — {cur.description.toUpperCase()}
        </div>
        <div style={{ fontSize:isMobile?22:28, color:cur.color, marginBottom:6, letterSpacing:"-0.5px" }}>{cur.label}</div>
        <div style={{ fontSize:14, color:C.textMid }}>{cur.prompt}</div>
      </div>

      <div style={{ fontSize:12, color:`${cur.color}bb`, lineHeight:1.6, padding:"10px 14px",
        background:`${cur.color}0a`, borderRadius:8, border:`1px solid ${cur.color}20`, marginBottom:20 }}>
        <span style={{ fontFamily:"monospace", fontSize:9, letterSpacing:2 }}>TIP  </span>{cur.tip}
        {cur.optional && <span style={{ marginLeft:8, fontFamily:"monospace", fontSize:9, color:C.textDim }}>(OPTIONAL)</span>}
      </div>

      <textarea
        value={values[cur.id]||""}
        onChange={e => handleChange(cur.id, e.target.value)}
        placeholder={cur.placeholder}
        rows={7}
        style={{ width:"100%", background:C.surface2, borderRadius:12, padding:"18px 20px",
          color:C.text, fontSize:14, lineHeight:1.8, resize:"vertical", minHeight:160,
          outline:"none", fontFamily:"Georgia, serif", boxSizing:"border-box", transition:"border-color 0.2s",
          border:`1px solid ${values[cur.id]?.trim() ? cur.color+"66" : C.border2}` }}
        onFocus={e => { e.target.style.borderColor=cur.color; }}
        onBlur={e => { e.target.style.borderColor=values[cur.id]?.trim()?cur.color+"66":C.border2; }}
      />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:20 }}>
        <button onClick={() => setActive(Math.max(0,active-1))} disabled={active===0}
          style={ghostBtn({ fontSize:10, opacity:active===0?0.3:1, cursor:active===0?"not-allowed":"pointer" })}>
          ← PREV
        </button>
        <div style={{ display:"flex", gap:6 }}>
          {activeSecs.map((s,i) => (
            <div key={s.id} onClick={() => setActive(i)}
              style={{ width:6, height:6, borderRadius:"50%", cursor:"pointer", transition:"all 0.2s",
                background: values[s.id]?.trim() ? s.color : (i===active ? C.textMid : C.border2) }} />
          ))}
        </div>
        {active < activeSecs.length-1
          ? <button onClick={() => setActive(active+1)} style={ghostBtn({ fontSize:10 })}>NEXT →</button>
          : <button onClick={allReqFilled?handleCast:undefined} style={castStyle(allReqFilled)}>
              {allReqFilled?"CAST SPELL ✦":"FILL REQUIRED"}
            </button>
        }
      </div>

      {allReqFilled && active < activeSecs.length-1 && (
        <div style={{ marginTop:16, textAlign:"center" }}>
          <button onClick={handleCast} style={castStyle(true)}>CAST SPELL ✦</button>
        </div>
      )}

      {showFinal && (
        <div style={{ background:C.surface2, border:`1px solid ${C.border2}`, borderRadius:14, padding:24, marginTop:32 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontSize:9, letterSpacing:3, color:C.textMid, fontFamily:"monospace" }}>YOUR ASSEMBLED PROMPT</div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setSaveOpen(true)} style={ghostBtn({ padding:"6px 14px", fontSize:9 })}>SAVE TO CODEX ◈</button>
              <button onClick={handleCopy} style={primaryBtn({ padding:"6px 16px", fontSize:9 })}>
                {copied?"COPIED ✓":"COPY ✦"}
              </button>
            </div>
          </div>
          <div style={{ fontSize:13, color:"#b0acaa", lineHeight:2, whiteSpace:"pre-wrap", fontFamily:"Georgia, serif" }}>{assembled}</div>
          <div style={{ marginTop:20, paddingTop:16, borderTop:`1px solid ${C.border}`,
            display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:11, color:C.textMid }}>{filled} layer{filled!==1?"s":""} · {assembled.length} characters</div>
            <button onClick={resetSpell} style={ghostBtn({ padding:"6px 14px", fontSize:9 })}>NEW SPELL</button>
          </div>
        </div>
      )}

      {isImageMode && (
        <div style={{ marginTop:16, padding:"8px 14px", background:`${C.pink}0a`,
          border:`1px solid ${C.pink}22`, borderRadius:8, fontSize:11, color:C.pink, fontFamily:"monospace", letterSpacing:1 }}>
          ◈ IMAGE MODE — layers assembled for generative AI
        </div>
      )}
    </div>
  );
}

// ─── QUALITY VIEW ─────────────────────────────────────────────────────────────
function QualityView({ quality, activeSecs, allReqFilled, isMobile, setActive, setView, handleCast }) {
  return (
    <div style={{ padding:isMobile?"20px 16px":"36px 48px", maxWidth:800, margin:"0 auto", width:"100%", boxSizing:"border-box" }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:9, letterSpacing:3, color:C.textMid, fontFamily:"monospace", marginBottom:6 }}>SPELL ANALYSIS</div>
        <div style={{ fontSize:isMobile?22:28, color:C.text, marginBottom:6, letterSpacing:"-0.5px" }}>Quality Checker</div>
        <div style={{ fontSize:13, color:C.textMid }}>A real-time score across four dimensions. Improve any layer to watch it change.</div>
      </div>

      <div style={{ background:quality.verdictBg, border:`1px solid ${quality.verdictBorder}`, borderRadius:16, padding:"24px 26px", marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:3, color:quality.verdictColor, fontFamily:"monospace", marginBottom:8 }}>PROMPT QUALITY SCORE</div>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ fontSize:48, fontWeight:"bold", color:quality.verdictColor, fontFamily:"monospace", lineHeight:1 }}>{quality.composite}</div>
              <div>
                <div style={{ fontSize:15, color:C.text, marginBottom:3 }}>{quality.verdictIcon} {quality.verdict}</div>
                <div style={{ fontSize:11, color:C.textMid }}>out of 100</div>
              </div>
            </div>
          </div>
          <svg width="76" height="76" style={{ flexShrink:0 }}>
            <circle cx="38" cy="38" r="30" fill="none" stroke={C.border2} strokeWidth="6"/>
            <circle cx="38" cy="38" r="30" fill="none" stroke={quality.verdictColor} strokeWidth="6"
              strokeDasharray={`${Math.round(quality.composite/100*188.5)} 188.5`}
              strokeLinecap="round" strokeDashoffset="47"
              style={{ transform:"rotate(-90deg)", transformOrigin:"38px 38px", transition:"stroke-dasharray 0.8s ease" }}/>
            <text x="38" y="43" textAnchor="middle" fill={quality.verdictColor} fontSize="13" fontFamily="monospace" fontWeight="bold">{quality.composite}</text>
          </svg>
        </div>
        <div style={{ height:4, background:C.border, borderRadius:2, marginBottom:14, overflow:"hidden" }}>
          <div style={{ width:`${quality.composite}%`, height:"100%", background:`linear-gradient(90deg,${quality.verdictColor}88,${quality.verdictColor})`, borderRadius:2, transition:"width 0.8s ease" }}/>
        </div>
        <div style={{ fontSize:13, color:"#8a8aa8", lineHeight:1.8, fontStyle:"italic" }}>"{quality.advice}"</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:10, marginBottom:24 }}>
        {quality.scores.map(s => {
          const col = s.raw>=80?"#4ade80":s.raw>=60?"#fbbf24":s.raw>=40?"#fb923c":"#f87171";
          return (
            <div key={s.id} style={{ background:C.surface2, border:`1px solid ${col}22`, borderRadius:12, padding:"16px 18px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <span style={{ color:col, fontSize:13 }}>{s.icon}</span>
                  <span style={{ fontSize:10, color:C.text, fontFamily:"monospace", letterSpacing:1 }}>{s.label.toUpperCase()}</span>
                </div>
                <span style={{ fontSize:14, color:col, fontFamily:"monospace", fontWeight:"bold" }}>{s.raw}</span>
              </div>
              <div style={{ height:3, background:C.border, borderRadius:2, marginBottom:10 }}>
                <div style={{ width:`${s.raw}%`, height:"100%", background:col, borderRadius:2, transition:"width 0.6s ease" }}/>
              </div>
              <div style={{ fontSize:12, color:C.textMid, lineHeight:1.6 }}>{s.detail}</div>
              <button onClick={() => { const idx=activeSecs.findIndex(sec=>sec.id===s.id); if(idx>=0){setActive(idx);setView("builder");} }}
                style={{ marginTop:10, background:"none", border:`1px solid ${col}33`, borderRadius:6,
                  padding:"4px 10px", color:col, fontSize:8, cursor:"pointer", letterSpacing:1.5, fontFamily:"monospace" }}>
                EDIT LAYER →
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ background:C.surface2, border:`1px solid ${C.border2}`, borderRadius:12, padding:"18px 20px", marginBottom:20 }}>
        <div style={{ fontSize:9, letterSpacing:3, color:C.textMid, fontFamily:"monospace", marginBottom:10 }}>WHAT TO DO NEXT</div>
        {quality.composite < 82
          ? [...quality.scores].sort((a,b)=>a.raw-b.raw).slice(0,2).map(s => {
              const col = s.raw>=60?"#fbbf24":"#fb923c";
              return (
                <div key={s.id} style={{ display:"flex", gap:10, marginBottom:12, alignItems:"flex-start" }}>
                  <span style={{ color:col, fontSize:14, flexShrink:0, marginTop:1 }}>↑</span>
                  <div>
                    <div style={{ fontSize:12, color:C.text, marginBottom:3 }}>Improve <span style={{ color:col }}>{s.label}</span> ({s.raw}/100)</div>
                    <div style={{ fontSize:12, color:C.textMid, lineHeight:1.6 }}>{s.detail}</div>
                  </div>
                </div>
              );
            })
          : <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <span style={{ fontSize:20 }}>✦</span>
              <div style={{ fontSize:13, color:C.textMid, lineHeight:1.7 }}>Your spell is strong. Cast it and see what comes back.</div>
            </div>
        }
      </div>

      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        <button onClick={() => setView("builder")} style={ghostBtn()}>← BACK TO BUILDER</button>
        {allReqFilled && (
          <button onClick={() => { handleCast(); setView("builder"); }} style={primaryBtn()}>CAST SPELL ✦</button>
        )}
      </div>
    </div>
  );
}

// ─── CODEX PANEL ─────────────────────────────────────────────────────────────
function CodexPanel({ codexCat, setCodexCat, mySpells, deleteMySpell, loadSpell, setCodexOpen, isMobile }) {
  const allCats  = ["My Spells", ...Object.keys(DEFAULT_CODEX)];
  const spells   = codexCat==="My Spells" ? mySpells : DEFAULT_CODEX[codexCat]||[];
  const catColor = codexCat==="My Spells" ? C.gold : CAT_COLORS[codexCat]||C.purple;
  const panelRef = useRef(null);

  useEffect(() => {
    const handler = e => { if (panelRef.current && !panelRef.current.contains(e.target)) setCodexOpen(false); };
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [setCodexOpen]);

  return (
    <>
      <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:40, pointerEvents:"none" }} />
      <div ref={panelRef} style={{ position:"fixed", top:0, right:0, bottom:0,
        width:isMobile?"100vw":520, background:C.surface, borderLeft:`1px solid ${C.border2}`,
        zIndex:50, display:"flex", flexDirection:"column", boxShadow:"-20px 0 60px rgba(0,0,0,0.5)" }}>

        <div style={{ padding:"24px 28px 18px", borderBottom:`1px solid ${C.border}`,
          display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:4, color:C.purple, fontFamily:"monospace", marginBottom:4 }}>REFERENCE LIBRARY</div>
            <div style={{ fontSize:22, color:C.text, fontStyle:"italic" }}>◈ The Codex</div>
            <div style={{ fontSize:12, color:C.textMid, marginTop:4 }}>Click any spell to load it into the builder.</div>
          </div>
          <button onClick={() => setCodexOpen(false)}
            style={{ background:"none", border:"none", color:C.textMid, fontSize:20, cursor:"pointer", padding:4 }}>✕</button>
        </div>

        <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, overflowX:"auto", flexShrink:0 }}>
          {allCats.map(cat => (
            <button key={cat} onClick={() => setCodexCat(cat)} style={{
              background:"none", border:"none", padding:"12px 16px", cursor:"pointer",
              borderBottom: codexCat===cat ? `2px solid ${cat==="My Spells"?C.gold:CAT_COLORS[cat]}` : "2px solid transparent",
              color: codexCat===cat ? (cat==="My Spells"?C.gold:CAT_COLORS[cat]) : C.textMid,
              fontSize:9, letterSpacing:1.5, fontFamily:"monospace", whiteSpace:"nowrap", flexShrink:0 }}>
              {cat==="My Spells" ? `✦ MY SPELLS (${mySpells.length})` : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:20 }}>
          {spells.length===0 ? (
            <div style={{ textAlign:"center", padding:"60px 20px" }}>
              <div style={{ fontSize:36, marginBottom:16 }}>◈</div>
              <div style={{ fontSize:14, color:C.textMid, lineHeight:1.8 }}>Your Codex is empty.<br/>Cast a spell and save it here.</div>
            </div>
          ) : spells.map((entry, i) => (
            <div key={i} style={{ background:C.surface2, border:`1px solid ${C.border}`, borderRadius:12,
              padding:"18px 20px", marginBottom:12, cursor:"pointer", transition:"all 0.2s", position:"relative" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${catColor}55`; e.currentTarget.style.background="#16162a"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.surface2; }}>
              {codexCat==="My Spells" && (
                <button onClick={e => { e.stopPropagation(); deleteMySpell(i); }}
                  style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:C.textDim, fontSize:14, cursor:"pointer", padding:2 }}>✕</button>
              )}
              <div onClick={() => loadSpell(entry)}>
                <div style={{ fontSize:14, color:C.text, marginBottom:4, paddingRight:24, fontStyle:"italic" }}>{entry.title}</div>
                {entry.description && <div style={{ fontSize:12, color:C.textMid, marginBottom:10 }}>{entry.description}</div>}
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:10 }}>
                  {SECTIONS.filter(s => entry.spell?.[s.id]?.trim()).map(s => (
                    <div key={s.id} style={{ background:C.bg, border:`1px solid ${s.color}30`, borderRadius:10,
                      padding:"2px 10px", fontSize:8, color:s.color, letterSpacing:1, fontFamily:"monospace" }}>{s.label}</div>
                  ))}
                </div>
                <div style={{ padding:"10px 12px", background:C.bg, borderRadius:8, borderLeft:`2px solid ${catColor}44` }}>
                  <div style={{ fontSize:11, color:C.textDim, lineHeight:1.7, fontFamily:"monospace" }}>
                    {(entry.spell?.voice||entry.spell?.anchor||"").slice(0,90)}…
                  </div>
                </div>
                <div style={{ marginTop:10, fontSize:8, color:catColor, letterSpacing:2, fontFamily:"monospace" }}>LOAD INTO BUILDER →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── SAVE MODAL ───────────────────────────────────────────────────────────────
function SaveModal({ saveForm, setSaveForm, handleSave, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", zIndex:60,
      backdropFilter:"blur(3px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
      onClick={onClose}>
      <div style={{ background:C.surface, border:`1px solid ${C.border2}`, borderRadius:16,
        padding:28, width:"100%", maxWidth:400, boxShadow:"0 20px 60px rgba(0,0,0,0.6)" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ fontSize:9, letterSpacing:3, color:C.purple, fontFamily:"monospace", marginBottom:4 }}>SAVE TO CODEX</div>
        <div style={{ fontSize:20, color:C.text, fontStyle:"italic", marginBottom:20 }}>◈ Name Your Spell</div>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:10, color:C.textMid, letterSpacing:2, fontFamily:"monospace", marginBottom:6, display:"block" }}>SPELL TITLE</label>
          <input value={saveForm.title} onChange={e => setSaveForm(f=>({...f,title:e.target.value}))}
            placeholder="My Research Brief" autoFocus
            style={{ width:"100%", background:C.surface2, border:`1px solid ${C.border2}`, borderRadius:10,
              padding:"12px 14px", color:C.text, fontSize:13, fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box" }}/>
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:10, color:C.textMid, letterSpacing:2, fontFamily:"monospace", marginBottom:6, display:"block" }}>DESCRIPTION (OPTIONAL)</label>
          <input value={saveForm.description} onChange={e => setSaveForm(f=>({...f,description:e.target.value}))}
            placeholder="What this spell is for…"
            style={{ width:"100%", background:C.surface2, border:`1px solid ${C.border2}`, borderRadius:10,
              padding:"12px 14px", color:C.text, fontSize:13, fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box" }}/>
        </div>
        <div style={{ marginBottom:24 }}>
          <label style={{ fontSize:10, color:C.textMid, letterSpacing:2, fontFamily:"monospace", marginBottom:6, display:"block" }}>CATEGORY</label>
          <select value={saveForm.category} onChange={e => setSaveForm(f=>({...f,category:e.target.value}))}
            style={{ width:"100%", background:C.surface2, border:`1px solid ${C.border2}`, borderRadius:10,
              padding:"12px 14px", color:C.text, fontSize:13, fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box" }}>
            <option>Language Models</option>
            <option>Image Generation</option>
          </select>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onClose} style={ghostBtn()}>CANCEL</button>
          <button onClick={handleSave} disabled={!saveForm.title.trim()}
            style={primaryBtn({ flex:1, opacity:saveForm.title.trim()?1:0.5 })}>SAVE ◈</button>
        </div>
      </div>
    </div>
  );
}


// ─── XP BAR (nav widget) ──────────────────────────────────────────────────────
function XPBar({ xp, isMobile }) {
  const { current, next, progress, xpToNext } = getRankInfo(xp);
  const isMerlin = current.level === 50;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8,
      padding:"4px 10px", background:C.surface2,
      border:`1px solid ${current.color}44`, borderRadius:20,
      boxShadow:`0 0 8px ${current.glow}` }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:1 }}>
        <span style={{ fontSize:9, color:current.color, fontFamily:"monospace",
          letterSpacing:1, fontWeight:"bold", whiteSpace:"nowrap" }}>
          {isMerlin ? "✦ MERLIN" : current.rank.toUpperCase()}
        </span>
        <span style={{ fontSize:8, color:C.textDim, fontFamily:"monospace" }}>
          LVL {current.level}
        </span>
      </div>
      {!isMobile && (
        <div style={{ width:72, display:"flex", flexDirection:"column", gap:3 }}>
          <div style={{ height:3, background:C.border, borderRadius:2, overflow:"hidden" }}>
            <div style={{ width:`${progress*100}%`, height:"100%",
              background:`linear-gradient(90deg,${current.color}88,${current.color})`,
              borderRadius:2, transition:"width 0.6s ease" }}/>
          </div>
          <span style={{ fontSize:8, color:C.textDim, fontFamily:"monospace", textAlign:"right" }}>
            {isMerlin ? "MAX" : `${xpToNext} XP`}
          </span>
        </div>
      )}
      <span style={{ fontSize:9, color:current.color, fontFamily:"monospace",
        fontWeight:"bold", minWidth:28, textAlign:"right" }}>
        {xp >= 1000 ? `${(xp/1000).toFixed(1)}k` : xp}
      </span>
    </div>
  );
}

// ─── LEVEL UP TOAST ───────────────────────────────────────────────────────────
function LevelUpToast({ rankInfo, onDone }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => { setVisible(false); setTimeout(onDone, 400); }, 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  return (
    <div style={{ position:"fixed", bottom:28, left:"50%",
      zIndex:200, pointerEvents:"none",
      opacity: visible ? 1 : 0,
      transform: `translateX(-50%) translateY(${visible ? 0 : 16}px)`,
      transition:"opacity 0.35s, transform 0.35s" }}>
      <div style={{ background:C.surface, border:`2px solid ${rankInfo.current.color}`,
        borderRadius:16, padding:"16px 32px", textAlign:"center", position:"relative",
        boxShadow:`0 0 40px ${rankInfo.current.glow}, 0 8px 30px rgba(0,0,0,0.7)` }}>
        <div style={{ fontSize:10, color:rankInfo.current.color, fontFamily:"monospace",
          letterSpacing:4, marginBottom:6 }}>LEVEL UP ✦</div>
        <div style={{ fontSize:26, color:C.text, fontStyle:"italic", marginBottom:4 }}>
          Level {rankInfo.current.level}
        </div>
        <div style={{ fontSize:12, color:rankInfo.current.color, fontFamily:"monospace",
          letterSpacing:2, marginBottom:6 }}>
          {rankInfo.current.rank.toUpperCase()}
        </div>
        <div style={{ fontSize:11, color:C.textMid, fontFamily:"monospace" }}>
          {rankInfo.next
            ? `${rankInfo.xpToNext.toLocaleString()} XP to Level ${rankInfo.current.level + 1}`
            : "Maximum rank achieved. ✦"}
        </div>
        <div style={{ position:"absolute", inset:-1, borderRadius:16, pointerEvents:"none",
          boxShadow:`inset 0 0 24px ${rankInfo.current.glow}` }}/>
      </div>
    </div>
  );
}


// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
function AuthScreen({ onLogin }) {
  const [mode,     setMode]     = useState("login"); // login | signup
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [name,     setName]     = useState("");
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);

  const floatRunes = useState(() =>
    Array.from({ length: 18 }, () => ({
      glyph: RUNES[Math.floor(Math.random() * RUNES.length)],
      x: Math.random() * 100, y: Math.random() * 100,
      size: 13 + Math.random() * 18,
      color: ["#a78bfa22","#f472b622","#34d39922","#60a5fa22","#fb923c22"][Math.floor(Math.random()*5)],
      dur: 8 + Math.random() * 12, delay: Math.random() * 8,
    }))
  )[0];

  const clear  = () => { setError(""); setSuccess(""); };
  const go     = m => { setMode(m); clear(); };

  const inputStyle = {
    width:"100%", background:"#0d0d14", border:"1px solid #2a2a3a",
    borderRadius:10, padding:"13px 16px", color:"#e8e4d9", fontSize:14,
    fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box",
    transition:"border-color 0.2s",
  };

  const handleSubmit = () => {
    if (!email.trim() || !email.includes("@")) { setError("Enter a valid email."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (mode === "signup" && !name.trim()) { setError("Enter your name."); return; }
    clear(); setLoading(true);

    setTimeout(() => {
      const accounts = getAccounts();
      const key = email.toLowerCase().trim();
      if (mode === "signup") {
        if (accounts[key]) { setError("An account with this email already exists."); setLoading(false); return; }
        accounts[key] = { email:key, password:hashPw(password), createdAt:Date.now() };
        saveAccounts(accounts);
        // Save initial profile
        saveProfile(key, { name:name.trim(), avatar:"🧙", handle:"", createdAt:Date.now() });
        setActiveEmail(key);
        setSuccess("Account created. Entering the Playground…");
        setTimeout(() => onLogin(key, true), 900); // true = new account → show tutorial
      } else {
        if (!accounts[key]) { setError("No account found with this email."); setLoading(false); return; }
        if (accounts[key].password !== hashPw(password)) { setError("Incorrect password."); setLoading(false); return; }
        setActiveEmail(key);
        setSuccess("Welcome back. Entering the Playground…");
        setTimeout(() => onLogin(key, false), 800);
      }
    }, 600);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#08080e", display:"flex", alignItems:"center",
      justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <style>{`
        @keyframes floatRune { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.5} 50%{transform:translateY(-18px) rotate(8deg);opacity:1} }
        @keyframes authFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .wp-input:focus { border-color:#a78bfa !important; }
      `}</style>

      {/* Floating runes */}
      {floatRunes.map((r,i) => (
        <div key={i} style={{ position:"absolute", left:`${r.x}%`, top:`${r.y}%`,
          fontSize:r.size, color:r.color, userSelect:"none", pointerEvents:"none",
          animation:`floatRune ${r.dur}s ${r.delay}s ease-in-out infinite` }}>{r.glyph}</div>
      ))}

      <div style={{ width:"100%", maxWidth:420, padding:"0 24px",
        animation:"authFadeIn 0.5s ease", position:"relative", zIndex:10 }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ fontSize:38, marginBottom:8, textShadow:"0 0 30px rgba(167,139,250,0.5)" }}>⚗️</div>
          <div style={{ fontSize:24, color:"#e8e4d9", letterSpacing:"-0.5px",
            fontStyle:"italic", fontFamily:"Georgia,serif", marginBottom:6 }}>Wizards Playground</div>
          <div style={{ fontSize:9, color:"#3a3a5a", letterSpacing:4, fontFamily:"monospace" }}>
            WORDS ARE SPELLS. YOUR PROMPTS SHOULD BE TOO.
          </div>
        </div>

        {/* Card */}
        <div style={{ background:"#0d0d14", border:"1px solid #2a2a3a",
          borderRadius:18, padding:"28px 26px", boxShadow:"0 20px 60px rgba(0,0,0,0.6)" }}>

          {/* Tab switcher */}
          <div style={{ display:"flex", background:"#08080e", borderRadius:10,
            padding:4, marginBottom:24, gap:4 }}>
            {["login","signup"].map(m => (
              <button key={m} onClick={() => go(m)}
                style={{ flex:1, padding:"9px", borderRadius:8,
                  background: mode===m ? "#1a1a2e" : "transparent",
                  border: mode===m ? "1px solid #2a2a3a" : "1px solid transparent",
                  color: mode===m ? "#e8e4d9" : "#4a4a6a",
                  fontSize:10, cursor:"pointer", letterSpacing:2, fontFamily:"monospace",
                  transition:"all 0.2s" }}>
                {m === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
              </button>
            ))}
          </div>

          {/* Fields */}
          {mode === "signup" && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10, color:"#5a5a7a", letterSpacing:2,
                fontFamily:"monospace", marginBottom:6 }}>YOUR NAME</div>
              <input className="wp-input" value={name}
                onChange={e => { setName(e.target.value); clear(); }}
                placeholder="How shall we call you?"
                style={inputStyle} />
            </div>
          )}

          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:"#5a5a7a", letterSpacing:2,
              fontFamily:"monospace", marginBottom:6 }}>EMAIL</div>
            <input className="wp-input" type="email" value={email}
              onChange={e => { setEmail(e.target.value); clear(); }}
              onKeyDown={e => e.key==="Enter" && handleSubmit()}
              placeholder="your@email.com" style={inputStyle} />
          </div>

          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:10, color:"#5a5a7a", letterSpacing:2,
              fontFamily:"monospace", marginBottom:6 }}>PASSWORD</div>
            <div style={{ position:"relative" }}>
              <input className="wp-input" type={showPw?"text":"password"} value={password}
                onChange={e => { setPassword(e.target.value); clear(); }}
                onKeyDown={e => e.key==="Enter" && handleSubmit()}
                placeholder="Min. 6 characters" style={inputStyle} />
              <button onClick={() => setShowPw(v=>!v)}
                style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                  background:"none", border:"none", color:"#5a5a7a", cursor:"pointer",
                  fontSize:11, fontFamily:"monospace", letterSpacing:1 }}>
                {showPw?"HIDE":"SHOW"}
              </button>
            </div>
          </div>

          {/* Error / success */}
          {error && (
            <div style={{ background:"#1a0f0f", border:"1px solid #3a1a1a", borderRadius:8,
              padding:"10px 14px", marginBottom:16, fontSize:12, color:"#f87171", fontFamily:"monospace" }}>
              ✕ {error}
            </div>
          )}
          {success && (
            <div style={{ background:"#0f1a14", border:"1px solid #1a3a24", borderRadius:8,
              padding:"10px 14px", marginBottom:16, fontSize:12, color:"#4ade80", fontFamily:"monospace" }}>
              ✓ {success}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading}
            style={{ width:"100%", background:"linear-gradient(135deg,#7b6cf6,#c084fc)",
              border:"none", borderRadius:10, padding:"14px", color:"#fff", fontSize:12,
              cursor:loading?"not-allowed":"pointer", letterSpacing:2, fontFamily:"monospace",
              opacity:loading?0.7:1, display:"flex", alignItems:"center",
              justifyContent:"center", gap:8, transition:"opacity 0.2s" }}>
            {loading
              ? <span style={{ width:14, height:14, border:"2px solid #ffffff44",
                  borderTopColor:"#fff", borderRadius:"50%",
                  animation:"spin 0.7s linear infinite", display:"inline-block" }}/>
              : mode==="login" ? "ENTER THE PLAYGROUND ✦" : "CREATE ACCOUNT ✦"
            }
          </button>
        </div>

        {/* Beta notice */}
        <div style={{ marginTop:20, textAlign:"center", padding:"12px 16px",
          background:"#0d0d14", border:"1px solid #fbbf2422", borderRadius:12 }}>
          <div style={{ fontSize:9, color:"#fbbf24", fontFamily:"monospace",
            letterSpacing:3, marginBottom:4 }}>⚗️ BETA</div>
          <div style={{ fontSize:11, color:"#5a5a7a", lineHeight:1.6 }}>
            Wizards Playground is in active development. Your data is stored locally for now.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HANDLE AVAILABILITY ──────────────────────────────────────────────────────
function checkHandleAvailable(handle, currentEmail) {
  if (!handle.trim()) return null; // empty = no check needed
  const h = handle.toLowerCase().trim();
  const accounts = getAccounts();
  for (const email of Object.keys(accounts)) {
    if (email === currentEmail) continue; // skip own account
    const p = loadProfile(email);
    if (p?.handle && p.handle.toLowerCase() === h) return false; // taken
  }
  return true; // available
}

// ─── SETTINGS PANEL ───────────────────────────────────────────────────────────
const AVATARS = ["🧙","🔮","⚗️","✦","🌙","⚡","🦉","🐉","🌟","🗝️","📜","🔥","💎","🌀","🪄"];

function SettingsPanel({ userEmail, xp, profile, onSaveProfile, onLogout, onClose }) {
  const { current, next, progress, xpToNext } = getRankInfo(xp);
  const isMerlin = current.level === 50;
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [editName,        setEditName]        = useState(profile?.name   || "");
  const [editHandle,      setEditHandle]      = useState(profile?.handle || "");
  const [editAvatar,      setEditAvatar]      = useState(profile?.avatar || "🧙");
  const [saved,           setSaved]           = useState(false);
  const [handleStatus,    setHandleStatus]    = useState(null); // null | "checking" | "available" | "taken" | "own"
  const debounceRef = useRef(null);

  // Run availability check whenever editHandle changes
  useEffect(() => {
    const h = editHandle.trim();
    if (!h) { setHandleStatus(null); return; }
    // If it's unchanged from the saved profile handle, mark as own
    if (h.toLowerCase() === (profile?.handle || "").toLowerCase()) {
      setHandleStatus("own"); return;
    }
    setHandleStatus("checking");
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const result = checkHandleAvailable(h, userEmail);
      setHandleStatus(result ? "available" : "taken");
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [editHandle]);

  const handleSave = () => {
    if (handleStatus === "taken") return;
    const updated = { ...profile, name:editName.trim(), handle:editHandle.trim(), avatar:editAvatar };
    onSaveProfile(updated);
    setSaved(true);
    setHandleStatus(editHandle.trim() ? "own" : null);
    setTimeout(() => setSaved(false), 2000);
  };

  const canSave = handleStatus !== "taken";

  const fieldStyle = {
    width:"100%", background:C.surface, border:`1px solid ${C.border2}`,
    borderRadius:8, padding:"10px 12px", color:C.text, fontSize:13,
    fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box",
    transition:"border-color 0.2s",
  };

  return (
    <div onClick={onClose}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
        backdropFilter:"blur(4px)", zIndex:200, display:"flex",
        alignItems:"flex-start", justifyContent:"flex-end" }}>
      <div onClick={e => e.stopPropagation()}
        style={{ width:360, height:"100%", background:C.surface,
          borderLeft:`1px solid ${C.border}`, display:"flex",
          flexDirection:"column", overflowY:"auto",
          boxShadow:"-20px 0 60px rgba(0,0,0,0.5)" }}>

        {/* Header */}
        <div style={{ padding:"20px 20px 16px", borderBottom:`1px solid ${C.border}`,
          display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:9, color:C.textDim, fontFamily:"monospace", letterSpacing:3, marginBottom:4 }}>⚙ SETTINGS</div>
            <div style={{ fontSize:18, color:C.text, fontStyle:"italic" }}>Wizard's Chamber</div>
          </div>
          <button onClick={onClose}
            style={{ background:"none", border:"none", color:C.textMid,
              fontSize:18, cursor:"pointer", padding:4, lineHeight:1 }}>✕</button>
        </div>

        {/* Profile card */}
        <div style={{ padding:"20px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:C.textDim, fontFamily:"monospace", letterSpacing:3, marginBottom:14 }}>PROFILE</div>

          {/* Avatar row */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
            <div style={{ width:60, height:60, borderRadius:16,
              background:C.surface2, border:`2px solid ${current.color}44`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:30, flexShrink:0, boxShadow:`0 0 16px ${current.glow}` }}>
              {editAvatar}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, color:C.text, fontStyle:"italic", fontFamily:"Georgia,serif" }}>
                {editName || "Unnamed Wizard"}
              </div>
              {editHandle && (
                <div style={{ fontSize:11, color:C.textMid, fontFamily:"monospace", marginTop:2 }}>@{editHandle}</div>
              )}
              <div style={{ fontSize:10, color:current.color, fontFamily:"monospace", marginTop:4, letterSpacing:1 }}>
                {isMerlin ? "✦ MERLIN" : current.rank} · Lv {current.level}
              </div>
            </div>
          </div>

          {/* Avatar picker */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:9, color:C.textMid, fontFamily:"monospace", letterSpacing:2, marginBottom:8 }}>CHOOSE AVATAR</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {AVATARS.map(a => (
                <button key={a} onClick={() => setEditAvatar(a)}
                  style={{ width:36, height:36, borderRadius:8, fontSize:18,
                    background: editAvatar===a ? `${current.color}22` : C.surface2,
                    border:`1px solid ${editAvatar===a ? current.color+"66" : C.border2}`,
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                    transition:"all 0.15s" }}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:9, color:C.textMid, fontFamily:"monospace", letterSpacing:2, marginBottom:6 }}>DISPLAY NAME</div>
            <input value={editName} onChange={e => setEditName(e.target.value)}
              placeholder="Your wizard name…"
              style={fieldStyle}
              onFocus={e => e.target.style.borderColor=current.color}
              onBlur={e => e.target.style.borderColor=C.border2} />
          </div>

          {/* Handle */}
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <div style={{ fontSize:9, color:C.textMid, fontFamily:"monospace", letterSpacing:2 }}>HANDLE (OPTIONAL)</div>
              {handleStatus === "checking" && (
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", border:`1.5px solid ${C.textDim}`,
                    borderTopColor:C.purple, display:"inline-block",
                    animation:"spin 0.7s linear infinite" }}/>
                  <span style={{ fontSize:9, color:C.textDim, fontFamily:"monospace", letterSpacing:1 }}>CHECKING…</span>
                </div>
              )}
              {handleStatus === "available" && (
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:C.green, display:"inline-block" }}/>
                  <span style={{ fontSize:9, color:C.green, fontFamily:"monospace", letterSpacing:1 }}>AVAILABLE</span>
                </div>
              )}
              {handleStatus === "taken" && (
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#f87171", display:"inline-block" }}/>
                  <span style={{ fontSize:9, color:"#f87171", fontFamily:"monospace", letterSpacing:1 }}>TAKEN</span>
                </div>
              )}
              {handleStatus === "own" && (
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:current.color, display:"inline-block" }}/>
                  <span style={{ fontSize:9, color:current.color, fontFamily:"monospace", letterSpacing:1 }}>YOUR HANDLE</span>
                </div>
              )}
            </div>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)",
                fontSize:13, color:C.textMid, fontFamily:"monospace", pointerEvents:"none" }}>@</span>
              <input value={editHandle} onChange={e => setEditHandle(e.target.value.replace(/[^a-zA-Z0-9_]/g,""))}
                placeholder="yourhandle"
                style={{ ...fieldStyle, paddingLeft:26,
                  borderColor: handleStatus==="taken" ? "#f8717166"
                    : handleStatus==="available" ? `${C.green}66`
                    : handleStatus==="own" ? `${current.color}44`
                    : C.border2 }}
                onFocus={e => {
                  if (handleStatus !== "taken" && handleStatus !== "available") e.target.style.borderColor=current.color;
                }}
                onBlur={e => {
                  e.target.style.borderColor = handleStatus==="taken" ? "#f8717166"
                    : handleStatus==="available" ? `${C.green}66`
                    : handleStatus==="own" ? `${current.color}44`
                    : C.border2;
                }} />
            </div>
            {handleStatus === "taken" && (
              <div style={{ fontSize:10, color:"#f87171", fontFamily:"monospace", marginTop:5, letterSpacing:0.5 }}>
                @{editHandle} is already claimed by another wizard.
              </div>
            )}
            {handleStatus === "available" && (
              <div style={{ fontSize:10, color:C.green, fontFamily:"monospace", marginTop:5, letterSpacing:0.5 }}>
                @{editHandle} is yours for the taking.
              </div>
            )}
          </div>

          {/* Save */}
          <button onClick={canSave ? handleSave : undefined}
            style={{ width:"100%", padding:"11px",
              background: saved ? "#07120c" : canSave ? "linear-gradient(135deg,#7b6cf6,#c084fc)" : C.surface2,
              border: saved ? "1px solid #1a4a28" : canSave ? "none" : `1px solid ${C.border2}`,
              borderRadius:10,
              color: saved ? "#4ade80" : canSave ? "#fff" : C.textDim,
              fontSize:10, cursor: canSave ? "pointer" : "not-allowed", letterSpacing:2,
              fontFamily:"monospace", transition:"all 0.3s", opacity: canSave ? 1 : 0.5 }}>
            {saved ? "✓ SAVED" : handleStatus==="taken" ? "HANDLE TAKEN" : "SAVE PROFILE"}
          </button>
        </div>

        {/* Account */}
        <div style={{ padding:"20px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:C.textDim, fontFamily:"monospace", letterSpacing:3, marginBottom:14 }}>ACCOUNT</div>
          <div style={{ background:C.surface2, border:`1px solid ${C.border2}`, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:9, color:C.textMid, fontFamily:"monospace", letterSpacing:2, marginBottom:5 }}>SIGNED IN AS</div>
            <div style={{ fontSize:12, color:C.text, wordBreak:"break-all", fontFamily:"monospace" }}>{userEmail}</div>
          </div>
        </div>

        {/* Rank & XP */}
        <div style={{ padding:"20px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:C.textDim, fontFamily:"monospace", letterSpacing:3, marginBottom:14 }}>RANK & PROGRESS</div>
          <div style={{ background:C.surface2, border:`1px solid ${current.color}33`, borderRadius:12,
            padding:"18px", boxShadow:`0 0 20px ${current.glow}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <div>
                <div style={{ fontSize:20, color:current.color, fontFamily:"monospace", fontWeight:"bold", letterSpacing:1 }}>
                  {isMerlin ? "✦ MERLIN" : current.rank.toUpperCase()}
                </div>
                <div style={{ fontSize:11, color:C.textMid, fontFamily:"monospace", marginTop:3 }}>Level {current.level}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:22, color:current.color, fontFamily:"monospace", fontWeight:"bold" }}>
                  {xp >= 1000 ? `${(xp/1000).toFixed(1)}k` : xp}
                </div>
                <div style={{ fontSize:9, color:C.textDim, fontFamily:"monospace", letterSpacing:1 }}>TOTAL XP</div>
              </div>
            </div>
            {!isMerlin && (
              <>
                <div style={{ height:4, background:C.border, borderRadius:2, overflow:"hidden", marginBottom:8 }}>
                  <div style={{ width:`${progress*100}%`, height:"100%",
                    background:`linear-gradient(90deg,${current.color}88,${current.color})`,
                    borderRadius:2, transition:"width 0.6s ease" }}/>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <div style={{ fontSize:9, color:C.textDim, fontFamily:"monospace" }}>{next?.rank?.toUpperCase()} — LVL {next?.level}</div>
                  <div style={{ fontSize:9, color:C.textMid, fontFamily:"monospace" }}>{xpToNext} XP to go</div>
                </div>
              </>
            )}
            {isMerlin && (
              <div style={{ fontSize:11, color:current.color, fontFamily:"monospace", letterSpacing:1, textAlign:"center" }}>
                ✦ Maximum rank achieved ✦
              </div>
            )}
          </div>
        </div>

        {/* Data notice */}
        <div style={{ padding:"20px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:C.textDim, fontFamily:"monospace", letterSpacing:3, marginBottom:10 }}>DATA</div>
          <div style={{ fontSize:11, color:C.textMid, lineHeight:1.7, fontFamily:"monospace" }}>
            Spells, XP, and rank are stored locally in this browser. Signing out does not delete your data.
          </div>
        </div>

        {/* Sign Out */}
        <div style={{ padding:"20px", marginTop:"auto" }}>
          {!confirmLogout ? (
            <button onClick={() => setConfirmLogout(true)}
              style={{ width:"100%", background:"transparent",
                border:`1px solid ${C.border2}`, borderRadius:10,
                padding:"12px", color:C.textMid, fontSize:11,
                cursor:"pointer", letterSpacing:2, fontFamily:"monospace",
                transition:"all 0.2s" }}
              onMouseEnter={e => { e.target.style.borderColor="#f8717144"; e.target.style.color="#f87171"; }}
              onMouseLeave={e => { e.target.style.borderColor=C.border2; e.target.style.color=C.textMid; }}>
              ⇤ SIGN OUT
            </button>
          ) : (
            <div style={{ background:"#100707", border:"1px solid #3a141422", borderRadius:12, padding:16 }}>
              <div style={{ fontSize:12, color:"#f87171", fontFamily:"monospace", marginBottom:10, textAlign:"center", letterSpacing:1 }}>
                Leave the Playground?
              </div>
              <div style={{ fontSize:11, color:C.textMid, fontFamily:"monospace", marginBottom:16, textAlign:"center", lineHeight:1.6 }}>
                Your progress stays here.<br/>Return any time.
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => setConfirmLogout(false)}
                  style={{ flex:1, background:"transparent", border:`1px solid ${C.border2}`,
                    borderRadius:8, padding:"10px", color:C.textMid, fontSize:10,
                    cursor:"pointer", letterSpacing:1.5, fontFamily:"monospace" }}>
                  STAY
                </button>
                <button onClick={onLogout}
                  style={{ flex:1, background:"#2a0a0a", border:"1px solid #f8717166",
                    borderRadius:8, padding:"10px", color:"#f87171", fontSize:10,
                    cursor:"pointer", letterSpacing:1.5, fontFamily:"monospace" }}>
                  SIGN OUT ⇤
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── BETA BANNER ──────────────────────────────────────────────────────────────
function BetaBanner({ onDismiss }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const DONE = [
    "Five-layer Spell Builder (Anchor, Feeling, Voice, Constraint, Permission)",
    "Image generation prompt detection and mode switching",
    "Live Quality Checker — 4-dimension real-time scoring",
    "The Codex — pre-built spell library + personal saved spells",
    "XP + Rank system (50 levels, Apprentice → Merlin)",
    "Animated intro sequence with rune swarm and light arc",
  ];
  const NEXT = [
    "User profiles with avatar, handle, and rank display",
    "Prompt History — log of every spell you've cast",
    "The Grimoire — full course lessons inside the app",
    "Community Playground — share spells, post wins",
    "Cross-device sync via cloud storage",
    "Mobile app (iOS + Android)",
  ];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)",
      backdropFilter:"blur(4px)", zIndex:500, display:"flex",
      alignItems:"center", justifyContent:"center", padding:"20px" }}>
      <div style={{ background:C.surface, border:`1px solid #fbbf2433`,
        borderRadius:20, maxWidth:560, width:"100%",
        maxHeight:"85vh", overflowY:"auto",
        boxShadow:"0 0 60px rgba(251,191,36,0.1), 0 20px 60px rgba(0,0,0,0.6)" }}>

        {/* Header */}
        <div style={{ padding:"28px 28px 20px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ fontSize:9, color:"#fbbf24", fontFamily:"monospace",
                letterSpacing:4, marginBottom:6 }}>⚗️ BETA v0.1</div>
              <div style={{ fontSize:22, color:C.text, fontStyle:"italic", marginBottom:6 }}>
                Wizards Playground
              </div>
              <div style={{ fontSize:13, color:C.textMid, lineHeight:1.7, maxWidth:420 }}>
                This app is in active development. Some features are still being built.
                Here's where things stand — and where we're heading.
              </div>
            </div>
            <button onClick={() => { setOpen(false); onDismiss(); }}
              style={{ background:"none", border:"none", color:C.textMid,
                fontSize:20, cursor:"pointer", padding:4, flexShrink:0 }}>✕</button>
          </div>
        </div>

        {/* What's live */}
        <div style={{ padding:"20px 28px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:"#4ade80", fontFamily:"monospace",
            letterSpacing:3, marginBottom:14 }}>✓ WHAT'S LIVE NOW</div>
          {DONE.map((item, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
              <span style={{ color:"#4ade80", fontSize:12, flexShrink:0, marginTop:2 }}>✓</span>
              <span style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* What's coming */}
        <div style={{ padding:"20px 28px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:9, color:C.purple, fontFamily:"monospace",
            letterSpacing:3, marginBottom:14 }}>◈ COMING NEXT</div>
          {NEXT.map((item, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
              <span style={{ color:C.purple, fontSize:12, flexShrink:0, marginTop:2 }}>◦</span>
              <span style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding:"20px 28px", display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontSize:12, color:C.textDim, fontStyle:"italic", fontFamily:"Georgia,serif" }}>
            One incantation at a time.
          </div>
          <button onClick={() => { setOpen(false); onDismiss(); }}
            style={{ padding:"10px 28px", background:"linear-gradient(135deg,#7b6cf6,#c084fc)",
              border:"none", borderRadius:10, color:"#fff", fontSize:11,
              cursor:"pointer", letterSpacing:2, fontFamily:"monospace" }}>
            ENTER ✦
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TUTORIAL OVERLAY ─────────────────────────────────────────────────────────
const TUTORIAL_STEPS = [
  { id:"welcome",  target:null,        title:"Welcome to Wizards Playground ✦",
    body:"Words are spells — your prompts should be too. This quick tour shows you everything in about 60 seconds.",
    placement:"center" },
  { id:"builder",  target:"tgt-layers", title:"The Five Layers",
    body:"Every prompt is built in five layers — Anchor, Feeling, Voice, Constraint, Permission. Each one sharpens your intention. Fill them in order or jump around.",
    placement:"bottom" },
  { id:"quality",  target:"tgt-quality", title:"The Quality Checker",
    body:"As you fill each layer, your prompt is scored live across four dimensions. Hit QUALITY any time to see your score and what to strengthen.",
    placement:"bottom" },
  { id:"codex",    target:"tgt-codex",   title:"The Codex ◈",
    body:"Pre-built spell templates across Language Models and Image Generation. Load any spell into the builder in one click — or save your own.",
    placement:"bottom" },
  { id:"xp",       target:"tgt-xp",      title:"XP + Ranks",
    body:"You earn XP for filling layers, casting spells, and saving to the Codex. Level up from Apprentice all the way to Merlin.",
    placement:"bottom" },
  { id:"cast",     target:"tgt-sidebar", title:"Cast Your Spell",
    body:"Once all required layers are filled, the Cast button appears. Hit it to assemble your complete prompt — then copy it straight into any AI tool.",
    placement:"right" },
  { id:"done",     target:null,          title:"You're ready. ✦",
    body:"Start by filling The Anchor — set the role you want the AI to inhabit. Your first cast earns 50 XP.",
    placement:"center" },
];

function TutorialOverlay({ onDone, tutorialRefs }) {
  const [step, setStep]         = useState(0);
  const [spotRect, setSpotRect] = useState(null);
  const [tipPos,   setTipPos]   = useState({ top:"50%", left:"50%", transform:"translate(-50%,-50%)" });

  const cur = TUTORIAL_STEPS[step];
  const isLast = step === TUTORIAL_STEPS.length - 1;

  useEffect(() => {
    if (!cur) return;
    if (!cur.target) {
      setSpotRect(null);
      setTipPos({ top:"50%", left:"50%", transform:"translate(-50%,-50%)", arrowDir:null });
      return;
    }
    const el = tutorialRefs.current?.[cur.target];
    if (!el) {
      setSpotRect(null);
      setTipPos({ top:"50%", left:"50%", transform:"translate(-50%,-50%)", arrowDir:null });
      return;
    }
    const r   = el.getBoundingClientRect();
    const pad = 8;
    setSpotRect({ top:r.top-pad, left:r.left-pad, width:r.width+pad*2, height:r.height+pad*2 });
    const vw = window.innerWidth, vh = window.innerHeight;
    const tw = Math.min(300, vw-32), th = 190;
    let pos = {};
    if (cur.placement==="bottom") {
      pos = { top:r.bottom+16, left:Math.max(12, Math.min(r.left+r.width/2-tw/2, vw-tw-12)), arrowDir:"top" };
    } else if (cur.placement==="right") {
      pos = { top:Math.max(12, r.top+r.height/2-th/2), left:r.right+16, arrowDir:"left" };
    } else if (cur.placement==="left") {
      pos = { top:Math.max(12, r.top+r.height/2-th/2), left:r.left-tw-16, arrowDir:"right" };
    } else {
      pos = { top:"50%", left:"50%", transform:"translate(-50%,-50%)", arrowDir:null };
    }
    if (typeof pos.top==="number") pos.top = Math.max(12, Math.min(pos.top, vh-th-12));
    setTipPos(pos);
  }, [step]);

  const ARROWS = {
    top:    { position:"absolute", top:-7,  left:"50%", transform:"translateX(-50%)",  width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent", borderBottom:"7px solid #a78bfa" },
    bottom: { position:"absolute", bottom:-7,left:"50%",transform:"translateX(-50%)", width:0, height:0, borderLeft:"7px solid transparent", borderRight:"7px solid transparent", borderTop:"7px solid #a78bfa" },
    left:   { position:"absolute", left:-7, top:"50%",  transform:"translateY(-50%)",  width:0, height:0, borderTop:"7px solid transparent", borderBottom:"7px solid transparent", borderRight:"7px solid #a78bfa" },
    right:  { position:"absolute", right:-7,top:"50%",  transform:"translateY(-50%)",  width:0, height:0, borderTop:"7px solid transparent", borderBottom:"7px solid transparent", borderLeft:"7px solid #a78bfa" },
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:9000, pointerEvents:"none" }}>
      <style>{`@keyframes tipPop{from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}`}</style>

      {/* Dark overlay with spotlight */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"all" }} onClick={() => isLast ? onDone() : setStep(s=>s+1)}>
        <defs>
          <mask id="wp-spotlight">
            <rect width="100%" height="100%" fill="white"/>
            {spotRect && <rect x={spotRect.left} y={spotRect.top} width={spotRect.width} height={spotRect.height} rx="10" fill="black"/>}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#wp-spotlight)"/>
      </svg>

      {/* Spotlight glow ring */}
      {spotRect && (
        <div style={{ position:"absolute", top:spotRect.top, left:spotRect.left,
          width:spotRect.width, height:spotRect.height, borderRadius:10,
          border:"2px solid #a78bfa", pointerEvents:"none",
          boxShadow:"0 0 0 4px #a78bfa22, 0 0 20px #a78bfa44",
          transition:"all 0.3s ease" }}/>
      )}

      {/* Tooltip */}
      <div style={{ position:"fixed", zIndex:9001, pointerEvents:"all",
        width:Math.min(300, window.innerWidth-32),
        ...(tipPos.transform
          ? { top:tipPos.top, left:tipPos.left, transform:tipPos.transform }
          : { top:tipPos.top, left:tipPos.left }),
        background:C.surface, border:"1px solid #a78bfa55", borderRadius:16,
        padding:"20px 22px", boxShadow:"0 8px 40px rgba(0,0,0,0.8)",
        animation:"tipPop 0.2s ease" }}>

        {tipPos.arrowDir && <div style={ARROWS[tipPos.arrowDir]}/>}

        {/* Dots */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={{ display:"flex", gap:4 }}>
            {TUTORIAL_STEPS.map((_,i) => (
              <div key={i} style={{ width:i===step?14:5, height:5, borderRadius:3, transition:"all 0.3s",
                background:i===step?"#a78bfa":i<step?"#a78bfa55":"#2a2a3a" }}/>
            ))}
          </div>
          <button onClick={e => { e.stopPropagation(); onDone(); }}
            style={{ background:"none", border:"none", color:C.textDim, fontSize:10,
              cursor:"pointer", fontFamily:"monospace", letterSpacing:1 }}>SKIP</button>
        </div>

        <div style={{ fontSize:15, color:C.text, marginBottom:8, lineHeight:1.4 }}>{cur.title}</div>
        <div style={{ fontSize:12, color:"#8a8aaa", lineHeight:1.7, marginBottom:18 }}>{cur.body}</div>

        <div style={{ display:"flex", gap:8 }}>
          {step > 0 && (
            <button onClick={e => { e.stopPropagation(); setStep(s=>s-1); }}
              style={{ background:"none", border:`1px solid ${C.border2}`, borderRadius:8,
                padding:"8px 14px", color:C.textMid, fontSize:10, cursor:"pointer",
                fontFamily:"monospace", letterSpacing:1 }}>← BACK</button>
          )}
          <button onClick={e => { e.stopPropagation(); isLast ? onDone() : setStep(s=>s+1); }}
            style={{ flex:1, background:"linear-gradient(135deg,#7b6cf6,#a78bfa)", border:"none",
              borderRadius:8, padding:"9px 16px", color:"#fff", fontSize:11,
              cursor:"pointer", fontFamily:"monospace", letterSpacing:2, fontWeight:"bold" }}>
            {isLast ? "LET'S GO ✦" : "NEXT →"}
          </button>
        </div>
        <div style={{ marginTop:10, textAlign:"center", fontSize:9, color:C.textDim,
          fontFamily:"monospace", letterSpacing:1 }}>Click anywhere to advance</div>
      </div>
    </div>
  );
}

// ─── INTRO SCREEN ─────────────────────────────────────────────────────────────
function IntroScreen({ onDone }) {
  const canvasRef   = useRef(null);
  const titleRef    = useRef(null);
  const animRef     = useRef(null);
  const runesRef    = useRef([]);
  const [phase, setPhase]             = useState("runes"); // runes → dissolve → title → arc → done
  const [titleOpacity, setTitleOp]    = useState(0);
  const [titleScale,   setTitleSc]    = useState(0.88);
  const [subOpacity,   setSubOp]      = useState(0);
  const [arcProgress,  setArcProg]    = useState(0);  // 0 → 1: arc sweeps across
  const [dotVisible,   setDotVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width  = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const cx = W / 2, cy = H / 2;

    // ── Spawn runes in orbiting rings ────────────────────────────────────────
    const count = 65;
    runesRef.current = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const r     = 70 + Math.random() * 230;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        glyph: RUNES[Math.floor(Math.random() * RUNES.length)],
        size: 13 + Math.random() * 22,
        opacity: 0,
        angle,
        orbitR: r,
        orbitSpeed: 0.004 + Math.random() * 0.007,
        color: ["#a78bfa","#f472b6","#34d399","#60a5fa","#fb923c","#fbbf24","#e8e4d9"][Math.floor(Math.random()*7)],
        phase: Math.random() * Math.PI * 2,
        dissolved: false,
      };
    });

    let t = 0;
    let dissolveStarted = false;
    let dissolveT = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#08080e";
      ctx.fillRect(0, 0, W, H);
      t += 1;

      if (t > 120 && !dissolveStarted) {
        dissolveStarted = true;
        setTimeout(() => setPhase("dissolve"), 0);
      }
      if (dissolveStarted) dissolveT += 1;

      let allDissolved = true;
      runesRef.current.forEach((rune, i) => {
        if (!dissolveStarted) {
          rune.opacity = Math.min(1, rune.opacity + 0.022);
          rune.angle  += rune.orbitSpeed;
          rune.x = cx + Math.cos(rune.angle) * rune.orbitR;
          rune.y = cy + Math.sin(rune.angle) * rune.orbitR;
          rune.y += Math.sin(t * 0.04 + rune.phase) * 0.45;
        } else {
          const delay = i * 2.8;
          if (dissolveT > delay) {
            rune.x      += (cx - rune.x) * 0.055;
            rune.y      += (cy - rune.y) * 0.055;
            rune.opacity = Math.max(0, rune.opacity - 0.022);
            rune.size   *= 0.988;
            if (rune.opacity <= 0) rune.dissolved = true;
          }
          if (!rune.dissolved) allDissolved = false;
        }

        if (rune.dissolved) return;
        ctx.save();
        ctx.globalAlpha   = rune.opacity;
        ctx.fillStyle     = rune.color;
        ctx.font          = `${rune.size}px serif`;
        ctx.textAlign     = "center";
        ctx.textBaseline  = "middle";
        ctx.shadowColor   = rune.color;
        ctx.shadowBlur    = rune.opacity * 14;
        ctx.fillText(rune.glyph, rune.x, rune.y);
        ctx.restore();
      });

      if (dissolveStarted && allDissolved) {
        cancelAnimationFrame(animRef.current);
        // Title fade in
        setTimeout(() => {
          setPhase("title");
          let op = 0, sc = 0.88;
          const ti = setInterval(() => {
            op = Math.min(1, op + 0.032);
            sc = Math.min(1, sc + 0.007);
            setTitleOp(op);
            setTitleSc(sc);
            if (op >= 1) {
              clearInterval(ti);
              // Subtitle fade, then arc
              setTimeout(() => {
                setSubOp(1);
                setTimeout(() => {
                  setPhase("arc");
                  // Animate arc from 0 → 1 over ~900ms
                  let prog = 0;
                  const arcInt = setInterval(() => {
                    prog = Math.min(1, prog + 0.018);
                    setArcProg(prog);
                    if (prog >= 1) {
                      clearInterval(arcInt);
                      setDotVisible(true);
                      // Brief pause then done
                      setTimeout(() => onDone(), 900);
                    }
                  }, 16);
                }, 500);
              }, 300);
            }
          }, 16);
        }, 80);
        return;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Arc path: a sweeping curve that ends at the dot on the "i" ─────────────
  // The word "Wizards" — the dot lands roughly above the "i" in "Wizards"
  // We draw this in SVG overlay, animating strokeDashoffset
  const ARC_LEN = 1200; // total path length estimate

  return (
    <div style={{ position:"fixed", inset:0, background:"#08080e", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>

      <canvas ref={canvasRef} style={{ position:"absolute", inset:0 }} />

      {/* Title + arc overlay */}
      {(phase === "title" || phase === "arc" || phase === "done") && (
        <div style={{ position:"relative", zIndex:10, textAlign:"center", userSelect:"none" }}>

          {/* SVG arc — sweeps from left edge of screen, curves down and ends at the dot on "i" */}
          {phase === "arc" || phase === "done" ? (
            <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%",
              overflow:"visible", pointerEvents:"none" }}
              viewBox="0 0 800 80">
              {/* Arc path: starts far left, curves up then descends to dot above "i" in "Wizards"
                  "Wizards" starts at ~x=0 in the text block. The "i" is ~5th char.
                  We position endpoint at roughly x=88, y=2 (above the title text top) */}
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0"/>
                  <stop offset="40%"  stopColor="#f472b6" stopOpacity="1"/>
                  <stop offset="80%"  stopColor="#fbbf24" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1"/>
                </linearGradient>
                <filter id="arcGlow">
                  <feGaussianBlur stdDeviation="2.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              {/* The sweeping arc path */}
              <path
                d="M -300,40 C -100,-60 200,-80 295,4"
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#arcGlow)"
                style={{
                  strokeDasharray: ARC_LEN,
                  strokeDashoffset: ARC_LEN * (1 - arcProgress),
                  transition:"none",
                }}
              />
              {/* Travelling glow head */}
              {arcProgress > 0.05 && arcProgress < 1 && (
                <circle r="4" fill="#ffffff" filter="url(#arcGlow)" style={{ opacity: 0.9 }}>
                  <animateMotion
                    dur="0.01s"
                    repeatCount="1"
                    path="M -300,40 C -100,-60 200,-80 295,4"
                    keyPoints={`${Math.max(0, arcProgress - 0.01)};${arcProgress}`}
                    keyTimes="0;1"
                    calcMode="linear"
                    fill="freeze"
                  />
                </circle>
              )}
            </svg>
          ) : null}

          {/* Title text */}
          <div ref={titleRef} style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            transition:"none",
            position:"relative",
          }}>
            {/* The dot on the "i" — appears when arc lands */}
            {dotVisible && (
              <div style={{
                position:"absolute",
                // Positioned above the "i" in "Wizards" — roughly 23% from left of text block
                left:"23.5%", top:"-14px",
                width:7, height:7, borderRadius:"50%",
                background:"#ffffff",
                boxShadow:"0 0 8px 3px #a78bfa, 0 0 20px 6px #f472b633",
                animation:"dotPulse 0.6s ease-out forwards",
              }}/>
            )}

            <div style={{
              fontSize:"clamp(32px,5.5vw,68px)",
              color:"#e8e4d9",
              letterSpacing:"-1.5px",
              fontStyle:"italic",
              fontFamily:"Georgia,serif",
              textShadow:"0 0 40px rgba(167,139,250,0.5), 0 0 80px rgba(167,139,250,0.2)",
              marginBottom:10,
              lineHeight:1.15,
            }}>
              ⚗️ Wizards Playground
            </div>

            <div style={{
              opacity: subOpacity,
              transition:"opacity 0.8s ease",
              fontSize:"clamp(10px,1.3vw,13px)",
              color:"#5a5a7a",
              letterSpacing:5,
              fontFamily:"monospace",
              textTransform:"uppercase",
            }}>
              Words are spells. Your prompts should be too.
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dotPulse {
          0%   { transform:scale(0); opacity:0; box-shadow:0 0 0px 0px #a78bfa; }
          50%  { transform:scale(1.8); opacity:1; box-shadow:0 0 16px 8px #a78bfa88; }
          100% { transform:scale(1); opacity:1; box-shadow:0 0 8px 3px #a78bfa, 0 0 20px 6px #f472b633; }
        }
      `}</style>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function PromptStudio() {
  // ── AUTH GATE ───────────────────────────────────────────────────────────────
  const [userEmail,   setUserEmail]   = useState(() => getActiveEmail());
  const [showLanding, setShowLanding] = useState(() => !getActiveEmail()); // skip landing if already logged in
  const [showTutorial,setShowTutorial]= useState(false);
  const [showBeta,    setShowBeta]    = useState(false);

  const handleLogin = (email, isNew) => {
    setUserEmail(email);
    if (isNew) { setShowBeta(true); }  // new accounts: beta banner first
    else if (!isTutorialDone(email)) { setShowTutorial(true); }
  };

  const handleLogout = () => {
    clearActiveEmail();
    setUserEmail(null);
    setShowLanding(true);
    setIntro(true);
  };

  // ── APP STATE ───────────────────────────────────────────────────────────────
  const [intro,     setIntro]     = useState(true);
  const [values,    setValues]    = useState({});
  const [active,    setActive]    = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [copied,    setCopied]    = useState(false);
  const [isMobile,  setIsMobile]  = useState(false);
  const [codexOpen, setCodexOpen] = useState(false);
  const [codexCat,  setCodexCat]  = useState("My Spells");
  const [mySpells,  setMySpells]  = useState(() => userEmail ? loadSpells(userEmail) : []);
  const [saveOpen,  setSaveOpen]  = useState(false);
  const [saveForm,  setSaveForm]  = useState({ title:"", description:"", category:"Language Models" });
  const [toast,     setToast]     = useState(null);
  const [view,      setView]      = useState("builder");
  const [xp,        setXPState]   = useState(() => userEmail ? loadXPForUser(userEmail) : 0);
  const [profile,   setProfile]   = useState(() => userEmail ? loadProfile(userEmail) : null);
  const [levelUp,   setLevelUp]   = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const castRef          = useRef(false);
  const saveTimerRef     = useRef(null);
  const xpSectionsSeen   = useRef(new Set());
  const allReqAwardedRef = useRef(false);
  const tutorialRefs     = useRef({});

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const k = e => { if (e.key==="Escape") { setCodexOpen(false); setSaveOpen(false); setSettingsOpen(false); } };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const isImageMode  = detectImageMode(values);
  const activeSecs   = isImageMode ? IMAGE_SECTIONS : SECTIONS;
  const filled       = activeSecs.filter(s => values[s.id]?.trim()).length;
  const allReqFilled = activeSecs.filter(s=>!s.optional).every(s => values[s.id]?.trim());
  const progress     = (filled/activeSecs.length)*100;
  const assembled    = isImageMode
    ? activeSecs.filter(s=>values[s.id]?.trim()).map(s=>values[s.id].trim()).join(", ")
    : activeSecs.filter(s=>values[s.id]?.trim()).map(s=>values[s.id].trim()).join("\n\n");
  const quality = useMemo(() => scorePrompt(values, assembled, isImageMode), [assembled, isImageMode]);

  const showToast = (msg, color=C.green) => { setToast({msg,color}); setTimeout(()=>setToast(null),2400); };

  // ── XP award helper ────────────────────────────────────────────────────────
  const awardXP = (amount) => {
    setXPState(prev => {
      const before = getRankInfo(prev);
      const next   = prev + amount;
      if (userEmail) saveXPForUser(userEmail, next);
      const after  = getRankInfo(next);
      // Trigger level-up modal if level crossed
      if (after.current.level > before.current.level) {
        setTimeout(() => setLevelUp(after), 300);
      }
      return next;
    });
  };

  const handleChange = (id, val) => {
    setValues(v => {
      const updated = {...v, [id]: val};
      // Award XP first time this section gets real content this spell
      if (val.trim() && !xpSectionsSeen.current.has(id)) {
        xpSectionsSeen.current.add(id);
        awardXP(XP_REWARDS.fillSection);
      }
      return updated;
    });
  };

  const handleCast = () => {
    setShowFinal(true);
    if (!castRef.current) {
      castRef.current = true;
      awardXP(XP_REWARDS.castSpell);
      // bonus for completing all required sections (once per spell)
      if (!allReqAwardedRef.current) {
        allReqAwardedRef.current = true;
        awardXP(XP_REWARDS.completeAllSections);
      }
      saveTimerRef.current = setTimeout(() => setSaveOpen(true), 600);
    }
  };

  const handleCopy = () => {
    const tryClipboard = () => {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(assembled);
      }
      return Promise.reject("no clipboard api");
    };

    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = assembled;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none;";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(ta);
        return Promise.resolve();
      } catch (e) {
        document.body.removeChild(ta);
        return Promise.reject(e);
      }
    };

    tryClipboard()
      .catch(fallback)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        showToast("Copied to clipboard");
      })
      .catch(() => showToast("Copy failed — select text manually", C.orange));
  };

  const resetSpell = () => {
    clearTimeout(saveTimerRef.current);
    setValues({}); setActive(0); setShowFinal(false);
    setSaveOpen(false); setView("builder");
    castRef.current = false;
    xpSectionsSeen.current = new Set();
    allReqAwardedRef.current = false;
  };

  const loadSpell = (entry) => {
    clearTimeout(saveTimerRef.current);
    const merged = {};
    SECTIONS.forEach(s => { merged[s.id]=entry.spell?.[s.id]||""; });
    setValues(merged); setCodexOpen(false); setActive(0);
    setShowFinal(false); setSaveOpen(false); setView("builder");
    castRef.current = false;
    xpSectionsSeen.current = new Set(Object.keys(merged).filter(k => merged[k].trim()));
    allReqAwardedRef.current = false;
  };

  const handleSave = () => {
    if (!saveForm.title.trim()) return;
    const spell = {};
    SECTIONS.forEach(s => { spell[s.id]=values[s.id]||""; });
    const entry = { title:saveForm.title, description:saveForm.description, category:saveForm.category, spell, savedAt:Date.now() };
    const updated = [entry,...mySpells];
    setMySpells(updated); if (userEmail) saveSpells(userEmail, updated);
    setSaveOpen(false); setSaveForm({title:"",description:"",category:"Language Models"});
    awardXP(XP_REWARDS.saveToCodex);
    showToast("Saved to Codex ◈");
  };

  const handleSaveProfile = (updated) => {
    saveProfile(userEmail, updated);
    setProfile(updated);
  };

  const deleteMySpell = i => {
    const updated = mySpells.filter((_,j)=>j!==i);
    setMySpells(updated); saveSpells(updated);
  };

  // ── Landing + Auth gate ────────────────────────────────────────────────────
  if (showLanding) return <LandingPage onEnter={() => setShowLanding(false)} />;
  if (!userEmail) return <AuthScreen onLogin={handleLogin} />;

  return (
    <>
      {intro && <IntroScreen onDone={() => setIntro(false)} />}
      {showBeta && <BetaBanner onDismiss={() => { setShowBeta(false); if (!isTutorialDone(userEmail)) setShowTutorial(true); }} />}
      {showTutorial && !showBeta && (
        <TutorialOverlay tutorialRefs={tutorialRefs} onDone={() => { setTutorialDone(userEmail); setShowTutorial(false); }} />
      )}
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"Georgia,serif", display:"flex", flexDirection:"column" }}>
      <style>{`
        *{box-sizing:border-box;}
        textarea::placeholder,input::placeholder{color:#30303e;}
        textarea:focus,input:focus{outline:none;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:#2a2a3a;border-radius:2px;}
        select option{background:#13131f;}
      `}</style>

      {/* NAV */}
      <nav style={{ height:56, background:C.surface, borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 24px", flexShrink:0, position:"sticky", top:0, zIndex:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18, color:C.purple }}>⚗️</span>
          <div>
            <div style={{ fontSize:16, color:C.text, fontStyle:"italic", letterSpacing:"-0.3px" }}>Wizards Playground</div>
            <div style={{ fontSize:9, color:C.textMid, letterSpacing:3, fontFamily:"monospace", marginTop:1 }}>PROMPT STUDIO</div>
          </div>
          <button onClick={() => setSettingsOpen(true)} title="Settings"
            style={{ display:"flex", alignItems:"center", gap:8, background:"none",
              border:`1px solid ${C.border2}`, borderRadius:20, cursor:"pointer",
              padding:"4px 10px 4px 6px", transition:"border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor=C.border}
            onMouseLeave={e => e.currentTarget.style.borderColor=C.border2}>
            <span style={{ fontSize:22, lineHeight:1 }}>{profile?.avatar || "🧙"}</span>
            {!isMobile && (
              <span style={{ fontSize:11, color:C.textMid, fontFamily:"monospace", letterSpacing:1, maxWidth:90,
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {profile?.name || userEmail?.split("@")[0] || "Wizard"}
              </span>
            )}
            <span style={{ fontSize:14, color:C.textDim, lineHeight:1 }}>⚙</span>
          </button>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {filled > 0 && (
            <button ref={el => tutorialRefs.current["tgt-quality"]=el}
              onClick={() => setView(v=>v==="quality"?"builder":"quality")}
              style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:8, cursor:"pointer",
                background: view==="quality" ? `${quality.verdictColor}15` : "transparent",
                border:`1px solid ${view==="quality" ? quality.verdictColor+"44" : C.border}`,
                transition:"all 0.2s" }}>
              <div style={{ width:24, height:24, position:"relative", flexShrink:0 }}>
                <svg width="24" height="24" style={{ transform:"rotate(-90deg)" }}>
                  <circle cx="12" cy="12" r="9" fill="none" stroke={C.border2} strokeWidth="3"/>
                  <circle cx="12" cy="12" r="9" fill="none" stroke={quality.verdictColor} strokeWidth="3"
                    strokeDasharray={`${Math.round(quality.composite/100*56.5)} 56.5`}
                    strokeLinecap="round" style={{ transition:"stroke-dasharray 0.5s ease" }}/>
                </svg>
                <span style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:7, fontFamily:"monospace", color:quality.verdictColor, fontWeight:"bold" }}>
                  {quality.composite}
                </span>
              </div>
              <span style={{ fontSize:9, fontFamily:"monospace", letterSpacing:1, color:view==="quality"?quality.verdictColor:C.textMid }}>QUALITY</span>
            </button>
          )}
          <div ref={el => tutorialRefs.current["tgt-xp"]=el}>
            <XPBar xp={xp} isMobile={isMobile} />
          </div>
          <button ref={el => tutorialRefs.current["tgt-codex"]=el}
            onClick={() => setCodexOpen(true)}
            style={{ background:codexOpen?C.surface2:"transparent", border:`1px solid ${codexOpen?C.border2:"transparent"}`,
              borderRadius:8, padding:"6px 14px", color:codexOpen?C.text:C.textMid,
              fontSize:10, cursor:"pointer", letterSpacing:1.5, fontFamily:"monospace" }}>
            ◈ CODEX
          </button>
          {allReqFilled && view==="builder" && !showFinal && (
            <button onClick={handleCast}
              style={{ background:"transparent", border:`1px solid ${C.purple}44`, borderRadius:8,
                padding:"6px 14px", color:C.purple, fontSize:10, cursor:"pointer", letterSpacing:1.5, fontFamily:"monospace" }}>
              CAST ✦
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE NAV — only shown on mobile */}
      {isMobile && (
        <MobileNav activeSecs={activeSecs} active={active} setActive={setActive}
          values={values} filled={filled} quality={quality} view={view} setView={setView} />
      )}

      {/* PROGRESS BAR */}
      <div style={{ height:2, background:C.border, flexShrink:0 }}>
        <div style={{ width:`${progress}%`, height:"100%", transition:"width 0.4s",
          background:`linear-gradient(90deg,${activeSecs[Math.min(active,activeSecs.length-1)].color}88,${activeSecs[Math.min(active,activeSecs.length-1)].color})` }} />
      </div>

      {/* MAIN */}
      <div style={{ flex:1, display:"flex", overflow:"hidden", height:"calc(100vh - 58px)" }}>

        {/* SIDEBAR — only shown on desktop */}
        {!isMobile && (
          <div ref={el => tutorialRefs.current["tgt-sidebar"]=el} style={{display:"contents"}}>
          <Sidebar activeSecs={activeSecs} active={active} setActive={setActive}
            values={values} filled={filled} progress={progress} quality={quality}
            view={view} setView={setView} resetSpell={resetSpell} />
          </div>
        )}

        <div ref={el => tutorialRefs.current["tgt-layers"]=el} style={{ flex:1, overflowY:"auto" }}>
          {view==="quality"
            ? <QualityView quality={quality} activeSecs={activeSecs} allReqFilled={allReqFilled}
                isMobile={isMobile} setActive={setActive} setView={setView} handleCast={handleCast} />
            : <BuilderView activeSecs={activeSecs} active={active} setActive={setActive}
                values={values} handleChange={handleChange} showFinal={showFinal}
                assembled={assembled} allReqFilled={allReqFilled} filled={filled}
                handleCast={handleCast} handleCopy={handleCopy} copied={copied}
                setSaveOpen={setSaveOpen} resetSpell={resetSpell} isImageMode={isImageMode} isMobile={isMobile} />
          }
        </div>
      </div>

      {/* OVERLAYS */}
      {settingsOpen && (
        <SettingsPanel userEmail={userEmail} xp={xp} profile={profile} onSaveProfile={handleSaveProfile} onLogout={handleLogout} onClose={() => setSettingsOpen(false)} />
      )}
      {codexOpen && (
        <CodexPanel codexCat={codexCat} setCodexCat={setCodexCat} mySpells={mySpells}
          deleteMySpell={deleteMySpell} loadSpell={loadSpell} setCodexOpen={setCodexOpen} isMobile={isMobile} />
      )}
      {saveOpen && (
        <SaveModal saveForm={saveForm} setSaveForm={setSaveForm} handleSave={handleSave} onClose={() => setSaveOpen(false)} />
      )}
      {toast && (
        <div style={{ position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)",
          background:C.surface, border:`1px solid ${toast.color}44`, borderRadius:10, padding:"10px 20px",
          fontSize:12, color:toast.color, fontFamily:"monospace", letterSpacing:1,
          zIndex:100, boxShadow:"0 8px 30px rgba(0,0,0,0.4)", whiteSpace:"nowrap" }}>
          {toast.msg}
        </div>
      )}
      {levelUp && (
        <LevelUpToast rankInfo={levelUp} onDone={() => setLevelUp(null)} />
      )}
    </div>
    </>
  );
}
