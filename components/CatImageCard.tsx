import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import { FC, MouseEventHandler, useCallback, useContext, useMemo } from "react";
import { useLottie } from "lottie-react";
import likeAnimationData from "lottie/like.json";
import { LikedCatsContext } from "context/LikedCatsContext";
import { Cat } from "services/cats/cats.types";
import { BiTrash } from "react-icons/bi";
import { HiOutlineRefresh } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";

interface ImageCardProps {
  /** The cat object for this card */
  cat: Cat;
  /** Whether to render the cat card as a favourite */
  isFavourited?: boolean;
  /** Callback function to trigger refreshing the cat */
  onRefreshCat?: (catId: string) => void;
}

export const CatImageCard: FC<ImageCardProps> = ({
  cat,
  isFavourited,
  onRefreshCat,
}) => {
  // Bring in lottie to play out an animation when the cat is liked
  const { View, goToAndPlay, getDuration } = useLottie({
    animationData: likeAnimationData,
    loop: false,
    autoplay: false,
  });

  // Manage the favourited cats from the context to keep a global state
  const { addLikedCat, isCatLiked, removeLikedCat } =
    useContext(LikedCatsContext);

  // Determine whether this particular cat is liked
  const liked = useMemo(() => isCatLiked(cat.id), [cat.id, isCatLiked]);

  const handleLike = useCallback(() => {
    if (liked) return;

    // Restart the animation when clicked
    goToAndPlay(0);

    setTimeout(() => {
      addLikedCat(cat);
    }, getDuration()! * 1000);
  }, [goToAndPlay, getDuration, addLikedCat, cat, liked]);

  const handleUnfavourite = useCallback(() => {
    if (!liked) return;

    removeLikedCat(cat.id);
  }, [liked, removeLikedCat, cat]);

  const handleRefresh = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      // Ensure the like cat function is not called as this is attatched to the parent element
      e.stopPropagation();
      onRefreshCat?.(cat.id);
    },
    [cat.id, onRefreshCat]
  );

  return (
    <Button
      onClick={handleLike}
      shadow="md"
      as={liked ? "div" : undefined}
      borderRadius="md"
      width="148px"
      height="148px"
      position="relative"
      overflow="hidden"
      _hover={{
        shadow: "dark-lg",
        transform: "scale(1.05)",
      }}
      _focusWithin={{
        shadow: "dark-lg",
        transform: "scale(1.05)",
      }}
      aria-label="Like this cat"
    >
      <Image objectFit="cover" src={cat.full_url} alt="cat" layout="fill" />

      {/* Render out the animation */}
      <Box position="absolute" pointerEvents="none" inset={0}>
        {View}
      </Box>

      <HStack spacing="1" position="absolute" top={0} right={0} p="2">
        {!isFavourited && (
          <IconButton
            aria-label="Refresh this cat"
            icon={<HiOutlineRefresh />}
            onClick={handleRefresh}
            size="xs"
          />
        )}
        {isFavourited && (
          <IconButton
            aria-label="Remove from favourites"
            icon={<BiTrash />}
            onClick={handleUnfavourite}
            size="xs"
          />
        )}
      </HStack>

      {/* Show a heart in the bottom left if liked and not rendered in favourite list */}
      {liked && !isFavourited && (
        <Box position="absolute" bottom={0} left={0} p="2">
          <AiFillHeart color="red" />
        </Box>
      )}
    </Button>
  );
};
