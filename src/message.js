export class Message {
  constructor(text) {
    this.text = text;
  }

  render() {
    const div = document.createElement("div");
    div.innerText = this.text;
    return div;
  }
}
