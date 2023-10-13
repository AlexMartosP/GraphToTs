import { stdout } from "process";

const loadingStyles = {
  spinner: ["◜", "◠", "◝", "◞", "◡", "◟"],
};

class Loading {
  private intervalId: NodeJS.Timeout | null = null;
  frame: string[] | keyof typeof loadingStyles;
  label: string;

  constructor({
    frame,
    label,
  }: {
    frame?: string[] | keyof typeof loadingStyles;
    label: string;
  }) {
    if (frame) {
      this.frame = frame;
    } else {
      this.frame = loadingStyles["spinner"];
    }
    this.label = label;
  }

  start() {
    let style: string[];
    if (typeof this.frame === "string") {
      style = loadingStyles[this.frame];
    } else {
      style = this.frame;
    }

    let currentIndex = 0;

    this.intervalId = setInterval(() => {
      stdout.clearLine(0);
      stdout.cursorTo(0);

      currentIndex = (currentIndex + 1) % style.length;
      stdout.write(`${style[currentIndex]} ${this.label}`);
    }, 100);

    return this;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      stdout.clearLine(0);
      stdout.cursorTo(0);
    }
  }
}

export default Loading;
