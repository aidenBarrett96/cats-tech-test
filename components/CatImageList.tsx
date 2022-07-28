import { Wrap, WrapItem } from "@chakra-ui/react";
import { FC } from "react";
import { Cat } from "services/cats/cats.types";
import { CatImageCard } from "./CatImageCard";

interface CatImageListProps {
  /** The list of cat objects to render out */
  cats: Cat[];
  /** The function to trigger refreshing the cat in this context */
  onRefreshCat?: (catID: string) => void;
  /** Whether or not this list is from the favourites */
  isFavouriteList?: boolean;
}

export const CatImageList: FC<CatImageListProps> = ({
  cats,
  onRefreshCat,
  isFavouriteList,
}) => {
  return (
    <Wrap overflow="visible" py="40px" spacing="4" justify="center">
      {cats.map((cat) => (
        <WrapItem key={cat.id}>
          <CatImageCard
            cat={cat}
            onRefreshCat={onRefreshCat}
            isFavourited={isFavouriteList}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};
