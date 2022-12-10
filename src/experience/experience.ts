import { Scene } from "three";
import Camera from "./camera";
import Renderer from "./renderer";
import Sizes from "./utils/sizes";
import Time from "./utils/time";

declare global {
  interface Window {
    experience: any;
  }
}

let instance: Experience | null = null;

export default class Experience {
  canvas: HTMLCanvasElement;
  sizes: Sizes;
  time: Time;
  scene: Scene;
  camera: Camera;
  renderer: Renderer;

  constructor(canvas: HTMLCanvasElement) {
    window.experience = this;

    if (instance) {
      return instance;
    }

    instance = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();

    // Resize event
    this.sizes.on("resize", () => this.resize());
    // Time tick event
    this.time.on("tick", () => this.update());
  }

  resize() {
    // Window resize do what
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    // Animate
    this.camera.update();
    this.renderer.update();
  }
}
