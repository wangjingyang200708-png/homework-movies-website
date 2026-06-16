"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import moviesData from "@/data/movies.json";

const allMovies = moviesData.movies;

function StarRating({ rating }) {
  const stars = Math.round(rating / 2);
  return (
    <span className="tracking-[0.2em] text-sm" style={{ color: "var(--color-gold)" }}>
      {Array.from({ length: 5 }, (_, i) => (i < stars ? "★" : "☆"))}
    </span>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allMovies;
    return allMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.director.name.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-12">
      <section className="mb-16 text-center animate-fade-in">
        <div className="inline-flex items-center gap-4 mb-6">
          <span className="block h-px w-12" style={{ background: "linear-gradient(to right, transparent, var(--color-gold))" }} />
          <span className="text-3xl opacity-60" style={{ color: "var(--color-gold)" }}>❦</span>
          <span className="block h-px w-12" style={{ background: "linear-gradient(to left, transparent, var(--color-gold))" }} />
        </div>
        <h2 className="text-5xl md:text-6xl font-display font-bold italic mb-4 tracking-tight"
          style={{ color: "var(--color-gold)" }}>
          The Grand Collection
        </h2>
        <p className="text-lg opacity-60 italic tracking-wide max-w-2xl mx-auto"
          style={{ color: "var(--color-text-muted)" }}>
          A curated treasury of the world&rsquo;s most celebrated cinematic masterpieces
        </p>
      </section>

      <div className="relative mb-12 max-w-xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, director, or genre..."
          className="w-full px-6 py-4 pl-14 text-lg font-body rounded-none
            outline-none transition-all duration-500
            placeholder:italic placeholder:opacity-40
            focus:shadow-[0_0_30px_rgba(201,168,76,0.15)]"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        />
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 opacity-50"
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          style={{ color: "var(--color-gold)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <p className="mt-3 text-sm italic opacity-50 text-center" style={{ color: "var(--color-text-muted)" }}>
            {filtered.length} film{filtered.length !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((movie, i) => (
          <Link
            key={movie.title}
            href={`/movie/${encodeURIComponent(movie.title)}`}
            className="group block no-underline"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <article
              className="relative p-6 h-full transition-all duration-500
                hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(92,10,30,0.3)]"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="absolute top-0 left-0 h-full w-1 transition-all duration-500 origin-top
                  group-hover:scale-y-100 scale-y-0"
                style={{ backgroundColor: "var(--color-gold)" }}
              />
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-display font-semibold italic leading-tight group-hover:opacity-90 transition-opacity"
                  style={{ color: "var(--color-gold)" }}>
                  {movie.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <StarRating rating={movie.rating} />
                <span className="text-lg font-bold font-display opacity-90"
                  style={{ color: "var(--color-gold)" }}>
                  {movie.rating}
                </span>
              </div>
              <p className="text-sm tracking-wide opacity-60 mb-3" style={{ color: "var(--color-text-muted)" }}>
                {movie.year} · {movie.genre.slice(0, 2).join(" / ")}
              </p>
              <p className="text-sm leading-relaxed line-clamp-3 opacity-50 italic"
                style={{ color: "var(--color-text-muted)" }}>
                {movie.summary}
              </p>
              <div className="mt-4 pt-3 flex items-center gap-2 text-xs tracking-[0.15em] uppercase opacity-0 group-hover:opacity-60 transition-all duration-300"
                style={{ borderTop: "1px solid var(--color-border)", color: "var(--color-gold)" }}>
                View Details →
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p className="text-5xl mb-4 font-display" style={{ color: "var(--color-gold)" }}>◆</p>
          <p className="text-lg italic" style={{ color: "var(--color-text-muted)" }}>
            No films match your search
          </p>
        </div>
      )}
    </main>
  );
}
