"use client";

import { useState, useRef } from "react";
import { Terminal, ArrowUpRight, Sparkles, MonitorPlay, Play, X, Maximize2 } from "lucide-react";

interface GameDemo {
  title: string;
  category: string;
  description: string;
  embedId: string;
  itchUrl: string;
  engine: string;
}

const PLAYGROUND_GAMES: GameDemo[] = [
  {
    title: "Leap Lad",
    category: "Platformer / Game Coding",
    description: "Platformer Game",
    embedId: "17948360",
    itchUrl: "https://itch.io",
    engine: "Godot Engine",
  },
  {
    title: "Boids Flocking Simulation",
    category: "Simulation / Physics",
    description: "Boids Simulation (Click left mouse button to spawn agents)",
    embedId: "17949239",
    itchUrl: "https://itch.io",
    engine: "Godot Engine",
  },
];

export default function Playground() {
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);

  const handlePlayClick = async (embedId: string) => {
    setActiveEmbedId(embedId);

    setTimeout(async () => {
      if (gameContainerRef.current) {
        try {
          if (gameContainerRef.current.requestFullscreen) {
            await gameContainerRef.current.requestFullscreen();
          }
        } catch (err) {
          console.warn("Fullscreen request blocked or not supported:", err);
        }
      }
    }, 50);
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setActiveEmbedId(null);
  };

  return (
    <section className="py-12 border-t border-[var(--foreground)]/10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Terminal className="h-3.5 w-3.5" />
            INTERACTIVE
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Playground
          </h2>
        </div>
        <a
          href="https://pixelluke.itch.io/"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
        >
          <span>View all games</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {PLAYGROUND_GAMES.map((game) => (
          <div
            key={game.embedId}
            className="group relative flex flex-col justify-between rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  {game.category}
                </span>
                <a
                  href={game.itchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)]/40 group-hover:text-emerald-500 transition-colors"
                >
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
                </a>
              </div>

              <h3 className="mt-4 text-xl font-bold tracking-tight transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {game.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/70 leading-relaxed">
                {game.description}
              </p>
            </div>

            {/* Interactive Launcher Container */}
            <div className="mt-6">
              {activeEmbedId === game.embedId ? (
                /* Fullscreen Player Active State */
                <div
                  ref={gameContainerRef}
                  className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center"
                >
                  <button
                    onClick={handleExitFullscreen}
                    className="absolute top-4 right-4 z-50 rounded-full bg-black/80 border border-white/20 p-2 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all shadow-lg cursor-pointer"
                    title="Exit Fullscreen"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <iframe
                    src={`https://itch.io/embed-upload/${game.embedId}?color=111111`}
                    title={game.title}
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                /* Dynamic Cyber / Tech Card Background (Idle State) */
                <button
                  onClick={() => handlePlayClick(game.embedId)}
                  className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--foreground)]/10 group-hover:border-emerald-500/40 transition-all flex flex-col items-center justify-center gap-3 text-center p-4 cursor-pointer bg-neutral-950 group/btn"
                >
                  {/* Glowing Background Gradient Blobs */}
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl group-hover/btn:bg-emerald-500/30 group-hover/btn:scale-125 transition-all duration-500" />
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl group-hover/btn:bg-cyan-500/30 group-hover/btn:scale-125 transition-all duration-500" />

                  {/* Grid Overlay Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] group-hover/btn:opacity-80 transition-opacity" />

                  {/* Play Button Icon */}
                  <div className="relative z-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-400 group-hover/btn:scale-110 group-hover/btn:bg-emerald-500 group-hover/btn:text-black group-hover/btn:border-emerald-400 transition-all shadow-xl shadow-emerald-500/10">
                    <Play className="h-6 w-6 fill-current translate-x-0.5" />
                  </div>

                  {/* Label */}
                  <span className="relative z-10 font-mono text-xs font-semibold text-[var(--foreground)]/80 group-hover/btn:text-emerald-400 transition-colors flex items-center gap-1.5 tracking-wide">
                    <Maximize2 className="h-3.5 w-3.5" />
                    PLAY FULLSCREEN
                  </span>
                </button>
              )}
            </div>

            {/* Card Footer */}
            <div className="mt-6 flex items-center justify-between font-mono text-xs text-[var(--foreground)]/50">
              <span className="flex items-center gap-1.5">
                <MonitorPlay className="h-3.5 w-3.5 text-emerald-500" />
                {game.engine}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                Click to Launch
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}