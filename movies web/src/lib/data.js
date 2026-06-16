import fs from "fs";
import path from "path";

export function getMovies() {
  const filePath = path.join(process.cwd(), "src", "data", "movies.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return data.movies;
}

export function getMovieByTitle(title) {
  const movies = getMovies();
  return movies.find((m) => m.title === decodeURIComponent(title));
}

export function searchMovies(query) {
  const movies = getMovies();
  const q = query.toLowerCase().trim();
  if (!q) return movies;
  return movies.filter((m) => {
    return (
      m.title.toLowerCase().includes(q) ||
      m.director.name.toLowerCase().includes(q) ||
      m.genre.some((g) => g.toLowerCase().includes(q))
    );
  });
}
