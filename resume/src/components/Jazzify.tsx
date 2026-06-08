import { useState, useEffect } from 'react';

export default function Jazzify() {
    const [stage, setStage] = useState<'idle' | 'hacking' | 'glitch' | 'error'>('idle');
    const [hackingLogs, setHackingLogs] = useState<string[]>([]);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [showRunner, setShowRunner] = useState(false);

    // hacking effect
    useEffect(() => {
        if (stage === 'hacking') {
            const logs = [
                "INITIALIZING UESC MARATHON LOGON...",
                "ACCESSING DURANDAL AI MAINFRAME...",
                "BYPASSING SECURITY OVERRIDES...",
                "UPLOADING JAZZ ALGORITHMS...",
                "ERROR: DISSONANCE DETECTED IN SECTOR 4",
                "REROUTING POWER TO HORNS...",
                "WARNING: CYBORG RUNNER DETECTED...",
                "INITIATING TERMINAL OVERRIDE...",
                "COMPILING IMPROVISATION PROTOCOLS...",
                "INJECTING HORNS.DAT...",
                "EXECUTION IMMINENT..."
            ];
            let step = 0;
            const interval = setInterval(() => {
                setHackingLogs(prev => [...prev, logs[step]]);
                step++;
                if (step >= logs.length) {
                    clearInterval(interval);
                    setTimeout(() => setStage('glitch'), 2500);
                }
            }, 600);

            const flashInterval = setInterval(() => {
                if (Math.random() > 0.3) {
                    setShowRunner(true);
                    setTimeout(() => setShowRunner(false), 50 + Math.random() * 200);
                }
            }, 150);

            return () => {
                clearInterval(interval);
                clearInterval(flashInterval);
            };
        }
    }, [stage]);

    // glitch effect
    useEffect(() => {
        if (stage === 'glitch') {
            document.body.classList.add('glitch-active');
            if (audioContext) {
                playGlitchyJazzHorns(audioContext);
            }
            const timer = setTimeout(() => {
                document.body.classList.remove('glitch-active');
                setStage('error');
            }, 5000);
            return () => {
                clearTimeout(timer);
                document.body.classList.remove('glitch-active');
            };
        }
    }, [stage, audioContext]);

    const startJazzify = () => {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        ctx.resume(); // Ensure it's active following user gesture
        setAudioContext(ctx);
        setStage('hacking');
    };

    const playGlitchyJazzHorns = (audioCtx: AudioContext) => {
        const playNote = (freq: number, startTime: number, duration: number, type: any = 'sawtooth', maxGain: number) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, startTime);
            osc.frequency.exponentialRampToValueAtTime(freq * (1 + (Math.random() * 0.05 - 0.02)), startTime + duration / 2);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(maxGain, startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            osc.start(startTime);
            osc.stop(startTime + duration);
        };

        const now = audioCtx.currentTime;
        // Dissonant brassy cluster (Quieter) - lasts ~1.5 seconds
        [261.63, 311.13, 370.00, 466.16].forEach((f) => {
            playNote(f, now + Math.random() * 0.2, 1.5 + Math.random(), 'sawtooth', 0.03);
            playNote(f * 2, now + Math.random() * 0.2, 1.0 + Math.random(), 'square', 0.02);
        });

        // Glitchy interruptions - ends at 1.5s
        for (let j = 0; j < 20; j++) {
            playNote(100 + Math.random() * 2000, now + Math.random() * 1.5, 0.05 + Math.random() * 0.1, 'square', 0.02);
            if (Math.random() > 0.5) {
                playNote(50 + Math.random() * 500, now + Math.random() * 1.5, 0.02, 'sawtooth', 0.03);
            }
        }

        // Recognizable Jazz 'Lick' (Starts at 2s)
        const lickStart = now + 1.8;
        // D E F G E, C D format
        const jazzLickNotes = [
            { f: 293.66, t: 0, d: 0.2 },     // D4
            { f: 329.63, t: 0.25, d: 0.2 },  // E4
            { f: 349.23, t: 0.5, d: 0.2 },   // F4
            { f: 392.00, t: 0.75, d: 0.2 },  // G4
            { f: 329.63, t: 1.0, d: 0.4 },   // E4
            { f: 261.63, t: 1.5, d: 0.2 },   // C4
            { f: 293.66, t: 1.75, d: 0.8 }   // D4
        ];

        jazzLickNotes.forEach(note => {
            playNote(note.f, lickStart + note.t, note.d, 'sawtooth', 0.05);
            playNote(note.f / 2, lickStart + note.t, note.d, 'square', 0.03);
            playNote(note.f * 1.5, lickStart + note.t, note.d, 'triangle', 0.03);
        });
    };

    if (stage === 'idle') {
        return (
            <button
                onClick={startJazzify}
                className="btn-jazzify"
            >
                Jazzify My Resume (Don't Click)
            </button>
        );
    }

    return (
        <div className="jazzify-overlay">
            {stage === 'hacking' && (
                <div className="hacking-screen">
                    {/* Sidebar */}
                    <div className="hacking-sidebar">
                        <div className="absolute inset-0 scanlines pointer-events-none" style={{ opacity: 0.8 }}></div>
                        <div className="hacking-sidebar-text animate-scroll-y">
                            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>TERMINAL OVERRIDE _ </span>
                            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>SYSTEM FAILURE _ </span>
                            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>JAZZIFYING RESUME _ </span>
                        </div>
                    </div>

                    {/* Main Hacking Area */}
                    <div className="hacking-main">
                        <div className="absolute inset-0 scanlines" style={{ opacity: 0.6 }}></div>
                        <div className="absolute inset-0 bg-green-900" style={{ mixBlendMode: 'overlay', opacity: 0.2 }}></div>

                        {/* Flashing Moving Runner */}
                        <div className={`runner-overlay ${showRunner ? 'show' : 'hide'}`}>
                            <img
                                src="/runner.jpg"
                                alt="Marathon Runner"
                                className="runner-image"
                                style={{
                                    filter: 'hue-rotate(80deg) saturate(200%) contrast(150%) brightness(1.2)'
                                }}
                            />
                        </div>

                        <div className="marathon-text hacking-logs-container">
                            {hackingLogs.map((log, i) => (
                                <div key={i} className="animate-pulse" style={{ animationDuration: '0.4s' }}>{log}</div>
                            ))}
                            <div className="animate-pulse font-black">_</div>
                        </div>
                    </div>
                </div>
            )}

            {stage === 'glitch' && (
                <div className="glitch-overlay">
                    {Array.from({ length: 80 }).map((_, i) => (
                        <div
                            key={i}
                            className="glitch-note"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDuration: `${0.1 + Math.random() * 0.5}s`,
                                animationDelay: `${Math.random()}s`
                            }}
                        >
                            {Math.random() > 0.3 ? '🎺' : '🎶'}
                        </div>
                    ))}
                    <div className="glitch-blend"></div>
                </div>
            )}

            {stage === 'error' && (
                <div className="error-screen">
                    <div className="absolute inset-0 scanlines pointer-events-none" style={{ opacity: 0.5 }}></div>
                    <div className="error-dialog">
                        <h1 className="error-heading" style={{ textShadow: '0 0 20px red' }}>
                            CRITICAL SYSTEM FAILURE
                        </h1>
                        <p className="error-text">
                            WARNING: APPLIED TO ALL AVAILABLE JOBS ON LINKEDIN AND INDEED
                        </p>
                        <button
                            className="btn-accept"
                            onClick={() => window.location.reload()}
                        >
                            ACCEPT FATE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
