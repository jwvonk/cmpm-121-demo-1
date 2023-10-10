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

function IncrementCounter(step: number) {
  counter += step;
  counterElem.innerHTML = `Coconuts: ${counter}`;
}

const counterElem = document.createElement("div");
IncrementCounter(0);
app.append(counterElem);

mainButton.addEventListener("click", () => {
  IncrementCounter(1);
});

setInterval(IncrementCounter, 1000, 1);
