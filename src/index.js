import "./index.css";

function component() {
  const element = document.createElement("div");
  element.innerHTML = "Webpack Template Setup Complete";
  return element;
}

document.getElementById("content").appendChild(component());
