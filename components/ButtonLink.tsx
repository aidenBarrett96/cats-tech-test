import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import Link from "next/link";

export type ButtonProps = ChakraButtonProps & {
  /** Target url for the link */
  href: string;
};

/**
 * @component ButtonLink
 *
 * A button that links to a specific page, using `next/link`.
 *
 * extends `Button` from `@chakra-ui/react`
 *  - [https://chakra-ui.com/components/button](https://chakra-ui.com/components/button)
 */
export const ButtonLink = ({ href, ...buttonProps }: ButtonProps) => {
  return (
    <Link href={href} passHref>
      <Button as="a" cursor="pointer" {...buttonProps} />
    </Link>
  );
};
