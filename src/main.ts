import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Coco Clicker";
const buttonEmoji = "🌴";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainButton = document.createElement("button");
mainButton.innerHTML = buttonEmoji;
app.append(mainButton);

let counter: number = 0;

function UpdateCounterElem() {
  counterElem.innerHTML = `Coconuts: ${counter}`;
}

const counterElem = document.createElement("div");
UpdateCounterElem();
app.append(counterElem);

mainButton.addEventListener("click", () => {
  counter++;
  UpdateCounterElem();
});
