export class Input {
  constructor(placeholder, value, onInput) {
    this.value = value;
    this.onInput = onInput;
    this.placeholder = placeholder;
  }

  render() {
    const input = document.createElement("input");
    input.style.width = "100%";
    input.style.marginBottom = "16px";
    input.style.marginTop = "16px";
    input.style.borderRadius = "4px";
    input.style.border = "1px solid gray";
    input.style.boxSizing = "border-box";
    input.style.fontSize = "1.5rem";
    input.style.padding = "8px";
    input.placeholder = this.placeholder;
    input.value = this.value;
    input.addEventListener("input", this.onInput);

    setTimeout(() => input.focus(), 0);
    return input;
  }
}
