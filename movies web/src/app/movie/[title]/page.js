"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import moviesData from "@/data/movies.json";

const allMovies = moviesData.movies;

function StarRating({ rating }) {
  const stars = Math.round(rating / 2);
  return (
    <span className="tracking-[0.3em] text-lg" style={{ color: "var(--color-gold)" }}>
      {Array.from({ length: 5 }, (_, i) => (i < stars ? "★" : "☆"))}
    </span>
  );
}

export default function MovieDetail() {
  const { title } = useParams();
  const movie = allMovies.find((m) => m.title === decodeURIComponent(title));

  if (!movie) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center py-20">
          <p className="text-6xl mb-6 font-display opacity-30" style={{ color: "var(--color-gold)" }}>◆</p>
          <p className="text-2xl font-display italic mb-4" style={{ color: "var(--color-gold)" }}>Film Not Found</p>
          <p className="opacity-50 italic mb-8" style={{ color: "var(--color-text-muted)" }}>
            This masterpiece has been lost to time
          </p>
          <Link href="/" className="inline-block px-8 py-3 text-sm tracking-[0.15em] uppercase transition-all duration-300
            hover:shadow-[0_0_25px_rgba(201,168,76,0.2)]"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-gold)",
              color: "var(--color-gold)",
            }}>
            Return to Archive
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 mx-auto max-w-4xl w-full px-6 py-12 animate-fade-in">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase mb-12 opacity-50 hover:opacity-100 transition-all duration-300"
        style={{ color: "var(--color-gold)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Archive
      </Link>

      <article>
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="block h-px flex-1" style={{
              background: "linear-gradient(to right, transparent, var(--color-gold))"
            }} />
            <span className="text-2xl opacity-50" style={{ color: "var(--color-gold)" }}>❦</span>
            <span className="block h-px flex-1" style={{
              background: "linear-gradient(to left, transparent, var(--color-gold))"
            }} />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold italic leading-tight mb-6"
            style={{ color: "var(--color-gold)" }}>
            {movie.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1 p-6 flex flex-col items-center justify-center text-center"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}>
            <p className="text-6xl font-display font-bold italic mb-2"
              style={{ color: "var(--color-gold)" }}>
              {movie.rating}
            </p>
            <StarRating rating={movie.rating} />
            <p className="text-xs tracking-[0.2em] uppercase mt-3 opacity-50"
              style={{ color: "var(--color-text-muted)" }}>Rating</p>
          </div>

          <div className="md:col-span-2 p-6 flex flex-col justify-center"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-1"
                  style={{ color: "var(--color-text-muted)" }}>Year</p>
                <p className="text-lg font-display italic">{movie.year}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-1"
                  style={{ color: "var(--color-text-muted)" }}>Duration</p>
                <p className="text-lg font-display italic">{movie.duration} min</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-1"
                  style={{ color: "var(--color-text-muted)" }}>Genre</p>
                <p className="text-lg font-display italic">{movie.genre.join(" / ")}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-1"
                  style={{ color: "var(--color-text-muted)" }}>Region</p>
                <p className="text-lg font-display italic">{movie.region.join(" / ")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}>
            <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3"
              style={{ color: "var(--color-text-muted)" }}>Director</p>
            <p className="text-2xl font-display italic mb-1" style={{ color: "var(--color-gold)" }}>
              {movie.director.name}
            </p>
            <p className="text-sm opacity-50 italic" style={{ color: "var(--color-text-muted)" }}>
              {movie.director.region}
            </p>
          </div>

          <div className="p-6"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}>
            <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-3"
              style={{ color: "var(--color-text-muted)" }}>Synopsis</p>
            <p className="text-lg leading-relaxed italic opacity-80"
              style={{ color: "var(--color-text)" }}>
              {movie.summary}
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
