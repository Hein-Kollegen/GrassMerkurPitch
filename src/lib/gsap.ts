import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { EasePack } from "gsap/EasePack";

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  ScrambleTextPlugin,
  MorphSVGPlugin,
  EasePack
);

export {
  gsap,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  ScrambleTextPlugin,
  MorphSVGPlugin,
  EasePack
};
