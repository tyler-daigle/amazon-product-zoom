class Viewport {
  private xPos = 0;
  private yPos = 0;
  private image: HTMLImageElement;
  private viewPortHeight: number;
  private viewPortWidth: number;
  private viewPortContainer: HTMLDivElement;

  constructor(image: HTMLImageElement, viewPortWidth: number, viewPortHeight: number, container: HTMLDivElement) {
    this.image = image;
    this.viewPortHeight = viewPortHeight;
    this.viewPortWidth = viewPortWidth;
    this.viewPortContainer = container;

    container.style.backgroundImage = `url("${image.src}")`;
    container.style.width = viewPortWidth.toString() + "px";
    container.style.height = viewPortHeight.toString() + "px";
  }

  panImage(x: number, y: number) {
    this.xPos = this.clamp(-(this.image.width - this.viewPortWidth), 0, this.xPos + x);
    this.yPos = this.clamp(-(this.image.height - this.viewPortHeight), 0, this.yPos + y);

    this.viewPortContainer.style.backgroundPosition = `${this.xPos}px ${this.yPos}px`;
  }

  private clamp(min: number, max: number, val: number): number {
    if (val < min) {
      return min;
    }
    if (val > max) {
      return max;
    }
    return val;
  }
}



const image = new Image();
image.src = "mouse-large.webp";
image.onload = () => {

  const viewPort = new Viewport(image, 800, 800, document.getElementById("viewport-container") as HTMLDivElement);
  const step = 70;

  document.querySelectorAll(".move-button").forEach(button => {
    button.addEventListener("click", (event) => {
      const target = event.target as HTMLButtonElement;
      switch (target.name) {
        case "up":
          viewPort.panImage(0, -step);
          break;
        case "down":
          viewPort.panImage(0, step);
          break;
        case "left":
          viewPort.panImage(-step, 0);
          break;
        case "right":
          viewPort.panImage(step, 0);
          break;
      }
    })
  })
}
export { };

