import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Coco Clicker";
const buttonEmoji = `<font size="+4">🌴</font>`;

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

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  emoji: string;
}

class Upgrade {
  cost: number;
  rate: number;
  name: string;
  desc: string;
  emoji: string;
  count: number;
  button: HTMLButtonElement;

  constructor(
    cost: number,
    rate: number,
    name: string,
    desc: string,
    emoji: string,
  ) {
    this.cost = cost;
    this.rate = rate;
    this.name = name;
    this.desc = desc;
    this.emoji = emoji;
    this.count = 0;
    this.button = document.createElement("button");
    this.update();
    this.button.disabled = true;
    this.button.addEventListener("click", () => {
      g_counter -= this.cost;
      g_growthRate += this.rate;
      this.count++;
      this.cost *= 1.15;
      this.update();
    });
  }

  update() {
    this.button.innerHTML = `
    <font size="+4">${this.emoji}</font><br>
    ${this.name}<br>
    ${this.cost.toFixed(0)} coconuts<br>
    <font size="-1">${this.desc}</font><br>
    Owned: ${this.count}`;
  }
}

const availableItems: Item[] = [
  {
    name: "Crab",
    cost: 10,
    rate: 0.1,
    description: "Can rip through coconot with their claws",
    emoji: "🦀",
  },
  {
    name: "Monkey",
    cost: 100,
    rate: 2,
    description: "Great at climbing palm trees",
    emoji: "🐒",
  },
  {
    name: "Gorilla",
    cost: 1000,
    rate: 40,
    description: "Strong Enough to break open coconuts",
    emoji: "🦍",
  },
  {
    name: "Elephant",
    cost: 10000,
    rate: 800,
    description: "Able to reach coconuts with their trunks",
    emoji: "🐘",
  },
  {
    name: "Sauropod",
    cost: 100000,
    rate: 16000,
    description: "Can uproot palm trees with ease!",
    emoji: "🦕",
  },
];

const upgrades: Upgrade[] = [];

availableItems.forEach((item) =>
  upgrades.push(
    new Upgrade(item.cost, item.rate, item.name, item.description, item.emoji),
  ),
);

// const upgrades: Upgrade[] = [
//   new Upgrade(
//     10,
//     0.1,
//     `<font size="+4">🐒</font><br>
//     Monkey<br>
//     <font size="-1">Great at Climbing</font>`,
//   ),
//   new Upgrade(
//     100,
//     2,
//     `<font size="+4">🦍</font><br>
//     Gorilla<br>
//     <font size="-1">Strong Enough to break open coconuts</font>`,
//   ),
//   new Upgrade(
//     1000,
//     50,
//     `<font size="+4">🐘</font><br>
//     Elephant<br>
//     <font size="-1">Able to reach coconuts with their trunks</font>`,
//   ),
// ];

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

  rateElem.innerHTML = `${g_growthRate.toFixed(2)} coconuts/sec`;
}

function IncrementCounter(step: number) {
  g_counter += step;
  counterElem.innerHTML = `${g_counter.toFixed(2)} coconuts`;
}

requestAnimationFrame(tick);
