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

let g_counter: number = 0;

function IncrementCounter(step: number) {
  g_counter += step;

  counterElem.innerHTML = `Coconuts: ${g_counter}`;
}

const counterElem = document.createElement("div");
IncrementCounter(0);
app.append(counterElem);

mainButton.addEventListener("click", () => {
  IncrementCounter(1);
});

let g_lastCalledTime = performance.now();

requestAnimationFrame(tick);

function tick() {
  const delta = performance.now() - g_lastCalledTime;
  g_lastCalledTime = performance.now();
  IncrementCounter(delta / 1000);
  requestAnimationFrame(tick);
}
