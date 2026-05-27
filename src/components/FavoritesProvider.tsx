"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FavoritesCtx = {
  favorites:      string[];
  toggleFavorite: (postId: string) => void;
  isFavorite:     (postId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesCtx>({
  favorites:      [],
  toggleFavorite: () => {},
  isFavorite:     () => false,
});

export function useFavorites() {
  return useContext(FavoritesContext);
}

const STORAGE_KEY = "wiplog-favorites";

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setFavorites(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const toggleFavorite = (postId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (postId: string) => favorites.includes(postId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
