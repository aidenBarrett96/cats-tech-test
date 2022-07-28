import {
  Button,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";
import { useRandomCats } from "hooks/useRandomCats";
import { LikedCatsContext } from "context/LikedCatsContext";
import { CatImageList } from "components/CatImageList";

const HomePage: NextPage = () => {
  const { cats, getRandomCats, replaceCat } = useRandomCats();

  const { likedCats } = useContext(LikedCatsContext);

  return (
    <Container py="80px" maxW="container.lg">
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing="80px"
        align={{ base: "center", lg: "flex-start" }}
        justify="center"
      >
        <VStack flex={1} justify="center" align="center">
          <Heading>Enjoy your images of cats!</Heading>
          <Text>
            Click on a cat to save it to your{" "}
            <Link href="#favourites" textDecor="underline">
              favourites!
            </Link>
          </Text>

          <CatImageList cats={cats} onRefreshCat={replaceCat} />

          <Button onClick={getRandomCats}>Refresh</Button>
        </VStack>
        <VStack id="favourites" flex={1} justify="center">
          <Heading>Favourite Cats</Heading>
          <Text>View and manage your favourite cat images here!</Text>
          {!likedCats.length && <Text>You haven't liked any cats yet!</Text>}
          {likedCats.length && (
            <CatImageList cats={likedCats} isFavouriteList />
          )}
        </VStack>
      </Stack>
    </Container>
  );
};

export default HomePage;
