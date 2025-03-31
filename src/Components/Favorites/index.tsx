import React, { createContext, useState, useContext, ReactNode } from "react";

type FavoritosType = {
  favoritos: string[];
  addFavorito: (nome: string) => void;
  removeFavorito: (nome: string) => void;
};

const Favoritos = createContext<FavoritosType | undefined>(
  undefined
);

interface FavoritosProviderProps {
  children: ReactNode;
}

export const FavoritosProvider: React.FC<FavoritosProviderProps> = ({
  children,
}) => {
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const addFavorito = (nome: string) => {
    setFavoritos((prevFavoritos) => [...prevFavoritos, nome]);
  };

  const removeFavorito = (nome: string) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.filter((fav) => fav !== nome)
    );
  };

  return (
    <Favoritos.Provider
      value={{ favoritos, addFavorito, removeFavorito }}
    >
      {children}
    </Favoritos.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(Favoritos);
  if (!context) {
    throw new Error("useFavoritos must be used within a FavoritosProvider");
  }
  return context;
};