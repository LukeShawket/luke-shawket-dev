import { Nav } from "@/app/ui/nav";
import GalleryFrame from "../ui/gallery-frame";
import { fetchAllGalleryCategories } from "../lib/fetch-images";

export default async function Gallery() {
  const { photos, drawings, gadgets, games } = await fetchAllGalleryCategories();

  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white">
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />

      <Nav />

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <section className="relative flex flex-col justify-center pb-12">
          <div className="mb-4 flex items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
              <span>Personal Vault &amp; Collection</span>
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-[1.1]">
            Gallery &amp;{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Vault
            </span>
            .
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-[var(--foreground)]/70 leading-relaxed">
            A visual archive synced with my media repository. Click any card to view.
          </p>
        </section>

        {photos.length > 0 && (
          <GalleryFrame title="Photos" subtitle="Photography" items={photos} />
        )}

        {drawings.length > 0 && (
          <GalleryFrame title="Arts &amp; Drawings" subtitle="Artwork" items={drawings} />
        )}

        {gadgets.length > 0 && (
          <GalleryFrame title="Gadgets &amp; Tech" subtitle="Electronics" items={gadgets} />
        )}

        {games.length > 0 && (
          <GalleryFrame title="Game Collection" subtitle="Vault" items={games} />
        )}
      </main>
    </div>
  );
}