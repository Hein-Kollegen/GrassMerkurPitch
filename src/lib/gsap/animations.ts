import gsap from "gsap";

type ElementTarget = Element | Element[] | NodeListOf<Element>;

type RevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
};

export function revealFadeUp(
  targets: ElementTarget,
  {
    y = 24,
    duration = 0.8,
    stagger = 0.08,
    delay = 0,
    ease = "power3.out"
  }: RevealOptions = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, delay, ease }
  );
}

type SplitRevealOptions = RevealOptions & {
  opacity?: number;
};

export function revealSplit(
  targets: ElementTarget,
  {
    y = 18,
    duration = 0.7,
    stagger = 0.04,
    delay = 0,
    ease = "power3.out",
    opacity = 0
  }: SplitRevealOptions = {}
) {
  return gsap.fromTo(
    targets,
    { opacity, y },
    { opacity: 1, y: 0, duration, stagger, delay, ease }
  );
}
