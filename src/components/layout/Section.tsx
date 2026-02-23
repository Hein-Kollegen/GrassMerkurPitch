"use client";

import { forwardRef } from "react";

type SectionProps = {
  as?: "section" | "div";
  className?: string;
  innerClassName?: string;
  useContentWrap?: boolean;
  centerY?: boolean;
  children: React.ReactNode;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    as = "section",
    className = "",
    innerClassName = "",
    useContentWrap = true,
    centerY = false,
    children
  },
  ref
) {
  const Component = as;
  const outerClassName = [
    "min-h-[100svh] w-full px-8 py-32 flex justify-center",
    centerY ? "items-center" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const innerClasses = useContentWrap
    ? ["content-wrap w-full", innerClassName].filter(Boolean).join(" ")
    : innerClassName;

  return (
    <Component ref={ref} className={outerClassName}>
      <div className={innerClasses}>{children}</div>
    </Component>
  );
});
