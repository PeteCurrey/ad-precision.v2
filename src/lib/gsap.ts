import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger, useGSAP, Flip);

export { gsap, ScrollTrigger, useGSAP, Flip };
