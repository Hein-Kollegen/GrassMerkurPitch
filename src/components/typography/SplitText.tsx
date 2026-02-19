import type { ElementType } from "react";

type SplitTextProps = {
  text: string;
  split?: "words" | "chars";
  as?: ElementType;
  className?: string;
  childClassName?: string;
};

export default function SplitText({
  text,
  split = "words",
  as: Component = "span",
  className,
  childClassName
}: SplitTextProps) {
  const parts = split === "words" ? text.split(" ") : Array.from(text);

  return (
    <Component className={className} data-split={split}>
      {parts.map((part, index) => (
        <span
          key={`${part}-${index}`}
          className={childClassName}
          data-split-child
        >
          {split === "chars" && part === " " ? "\u00A0" : part}
          {split === "words" && index < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </Component>
  );
}
