import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Coco Clicker";
const buttonEmoji = "🌴";
const upgradeText = "🐵: 10 coconuts";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainButton = document.createElement("button");
mainButton.innerHTML = buttonEmoji;
app.append(mainButton);

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = upgradeText;
upgradeButton.disabled = true;
app.append(upgradeButton);

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

upgradeButton.addEventListener("click", () => {
  g_counter -= 10;
  g_growthRate++;
});

let g_lastCalledTime = performance.now();
let g_growthRate = 0;

function tick() {
  const delta = performance.now() - g_lastCalledTime;
  g_lastCalledTime = performance.now();
  IncrementCounter((g_growthRate * delta) / 1000);
  requestAnimationFrame(tick);

  upgradeButton.disabled = g_counter < 10;
}
requestAnimationFrame(tick);
