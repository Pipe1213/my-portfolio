import Image from "next/image";
import { Column } from "@once-ui-system/core";
import styles from "./ProjectCover.module.scss";

interface ProjectCoverProps {
  src: string;
  alt: string;
  priority?: boolean;
  radius?: React.ComponentProps<typeof Column>["radius"];
  sizes?: string;
}

export function ProjectCover({
  src,
  alt,
  priority = false,
  radius = "l",
  sizes = "(max-width: 800px) 100vw, 800px",
}: ProjectCoverProps) {
  return (
    <Column
      className={styles.viewport}
      fillWidth
      border="neutral-alpha-weak"
      radius={radius}
      overflow="hidden"
    >
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        width={1200}
        height={675}
        sizes={sizes}
        priority={priority}
      />
    </Column>
  );
}
