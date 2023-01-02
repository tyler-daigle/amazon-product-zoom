/*
  This works by starting the image at the top of the containter at 0,0
  It then calculates how much of the image is not showing and outside of the viewport.
  So we shift the image up and left by negative amounts to pan the image around the container.
  The values are clamped between the negative value and 0.
  Once the x or y value is at 0 it means that the top left corner of the image is at the top of the
  viewport and we don't want to pan down any more.
  
  It is basically only panning in a negative direction. But this only works because the image 
  starts at (0,0).
*/

class Viewport {
  private xPos = 0;
  private yPos = 0;
  private image: HTMLImageElement;
  private viewPortContainer: HTMLDivElement;

  constructor(image: HTMLImageElement, viewPortWidth: number, viewPortHeight: number, container: HTMLDivElement) {
    this.image = image;

    this.viewPortContainer = container;

    container.style.backgroundImage = `url("${image.src}")`;
    container.style.width = viewPortWidth.toString() + "px";
    container.style.height = viewPortHeight.toString() + "px";
  }

  panImage(x: number, y: number, miniViewPortWidth: number, miniViewPortHeight: number) {
    // just use a ratio to calculate where the x and y position is on the large image when
    // the mouse is moved over the small image:
    // (smallImageWidth / largeImageWidth) = (x position on small image / x position on large image to find)
    // If you do the math on paper it will make sense. 

    // You are finding out how many pixels in the small image it takes to equal one pixel in the 
    // large image (it isn't exact but it is close enough). So divide the number of small pixels 
    // into how many large pixels there are. It should be a fractional value

    const heightRatio = miniViewPortHeight / this.image.height;
    const widthRatio = miniViewPortWidth / this.image.width;

    this.xPos = (x / widthRatio) * -1;
    this.yPos = (y / heightRatio) * -1;

    this.viewPortContainer.style.backgroundPosition = `${this.xPos}px ${this.yPos}px`;
  }
}

const image = new Image();
image.src = "mouse-large.webp";
image.onload = () => {
  // if you don't wait for image.onload then you can't get the width and height of the image

  const viewPort = new Viewport(image, 800, 800, document.getElementById("viewport-container") as HTMLDivElement);

  document.getElementById("thumbnail-container")?.addEventListener("mousemove", (e: MouseEvent) => {
    // Have to adjust the coordinates recieved from the mousemove event since they give the 
    // x and y position based on the position on the screen. Not just relative to the inside
    // of the div.

    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    const [x, y] = [e.clientX - rect.x, e.clientY - rect.y];

    const miniViewPortHeight = 646;
    const miniViewPortWidth = 679;

    viewPort.panImage(x, y, miniViewPortWidth, miniViewPortHeight);
  });

  document.getElementById("thumbnail-container")?.addEventListener("mouseenter", () => {
    document.getElementById("viewport-container")!.style.display = "block";
  })

  document.getElementById("thumbnail-container")?.addEventListener("mouseleave", () => {
    document.getElementById("viewport-container")!.style.display = "none";
  })
}
export { };

