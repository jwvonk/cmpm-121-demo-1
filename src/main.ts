import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Will's game";
const buttonEmoji = "🌴";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const mainButton = document.createElement("button");
mainButton.innerHTML = buttonEmoji;
app.append(mainButton);
