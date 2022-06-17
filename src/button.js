export const Button = class {
  constructor(label, onClick) {
    this.label = label;
    this.onClick = onClick;
  }

  render() {
    const button = document.createElement("button");
    button.style.width = "100%";
    button.style.marginBottom = "16px";
    button.style.cursor = "pointer";
    button.style.fontSize = "1.5rem";
    button.style.padding = "8px";
    button.innerText = this.label;
    button.addEventListener("click", () => this.onClick());
    return button;
  }
};
