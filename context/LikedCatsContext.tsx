import { useToast } from "@chakra-ui/react";
import { useLocalStorage } from "hooks/useLocalStorage";
import { createContext, FC, ReactNode, useCallback } from "react";
import { Cat } from "services/cats/cats.types";

interface LikedCatsContextType {
  /** The list of liked cats from state */
  likedCats: Cat[];
  /** Function to add a liked cat */
  addLikedCat: (cat: Cat) => void;
  /** Function to remove a liked cat */
  removeLikedCat: (catId: string) => void;
  /** Function to check whether a particular cat is liked */
  isCatLiked: (catId: string) => boolean;
}

const defaultContext: LikedCatsContextType = {
  likedCats: [],
  addLikedCat: () => {},
  removeLikedCat: () => {},
  isCatLiked: () => false,
};

export const LikedCatsContext =
  createContext<LikedCatsContextType>(defaultContext);

interface LikedCatsContextProviderProps {
  children: ReactNode;
}

/**
 * @component LikedCatsContextProvider
 *
 * A provider for the LikedCatsContext that sets up the initial state and passes it down
 */
export const LikedCatContextProvider: FC<LikedCatsContextProviderProps> = ({
  children,
}) => {
  const [likedCats, updateValue] = useLocalStorage<Cat[]>("likedCats", []);

  // Show notifications using toast
  const toast = useToast();

  const addLikedCat = useCallback(
    (cat: Cat) => {
      if (likedCats.includes(cat)) return;
      updateValue([...likedCats, cat]);

      toast({
        title: "Cat added to favourites!",
      });
    },
    [likedCats, updateValue, toast]
  );

  const removeLikedCat = useCallback(
    (catId: string) => {
      updateValue(likedCats.filter((cat) => cat.id !== catId));

      toast({
        title: "Cat removed from favourites!",
      });
    },
    [updateValue, likedCats, toast]
  );

  /** Function to check if a cat is liked based on a check for their ID */
  const isCatLiked = useCallback(
    (catId: string) => likedCats.some((cat) => cat.id === catId),
    [likedCats]
  );

  return (
    <LikedCatsContext.Provider
      value={{
        likedCats,
        addLikedCat,
        removeLikedCat,
        isCatLiked,
      }}
    >
      {children}
    </LikedCatsContext.Provider>
  );
};
