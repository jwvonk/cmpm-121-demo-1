import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Coco Clicker";
const buttonEmoji = "🌴";
// const upgradeText = "🐵: 10 coconuts";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let g_counter = 0;
let g_growthRate = 0;

const mainButton = document.createElement("button");
mainButton.innerHTML = buttonEmoji;
app.append(mainButton);

app.append(document.createElement("div"));

mainButton.addEventListener("click", () => {
  IncrementCounter(1);
});

class Upgrade {
  cost: number;
  rate: number;
  text: string;
  count: number;
  button: HTMLButtonElement;

  constructor(cost: number, rate: number, text: string) {
    this.cost = cost;
    this.rate = rate;
    this.text = text;
    this.count = 0;
    this.button = document.createElement("button");
    this.updateCount();
    this.button.disabled = true;
    this.button.addEventListener("click", () => {
      g_counter -= this.cost;
      g_growthRate += this.rate;
      this.count++;
      this.updateCount();
    });
  }

  updateCount() {
    this.button.innerHTML = `${this.text}<br>Owned: ${this.count}`;
  }
}

const upgrades: Upgrade[] = [
  new Upgrade(10, 0.1, "Upgrade 1: 10 units"),
  new Upgrade(100, 2, "Upgrade 2: 100 units"),
  new Upgrade(1000, 50, "Upgrade 3: 1000 units"),
];

upgrades.forEach((upgrade) => app.append(upgrade.button));

const counterElem = document.createElement("div");
IncrementCounter(0);
app.append(counterElem);

const rateElem = document.createElement("div");
app.append(rateElem);

const purchaseCountElem = document.createElement("div");
app.append(purchaseCountElem);

let g_lastCalledTime = performance.now();

function tick() {
  const delta = performance.now() - g_lastCalledTime;
  g_lastCalledTime = performance.now();
  IncrementCounter((g_growthRate * delta) / 1000);
  requestAnimationFrame(tick);

  upgrades.forEach(
    (upgrade) => (upgrade.button.disabled = g_counter < upgrade.cost),
  );

  rateElem.innerHTML = `${g_growthRate.toFixed(2)} units/sec`;
}

function IncrementCounter(step: number) {
  g_counter += step;
  counterElem.innerHTML = `${g_counter.toFixed(2)} units`;
}

requestAnimationFrame(tick);
