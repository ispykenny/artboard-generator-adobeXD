const { Artboard, Color } = require("scenegraph");
const { editDocument } = require("application");
const artboardSizes = require("./assets/artboard-lib");
let panel;

const addArtboard = () => {
  let btns = document.querySelectorAll("button");

  const getValues = event => {
    let activeBtn = event.currentTarget;
    let name = activeBtn.getAttribute("data-name");
    let width = activeBtn.getAttribute("data-width");
    let height = activeBtn.getAttribute("data-height");

    editDocument({ editLabel: "add artboard" }, (selection, documentRoot) => {
      let newArtboard = new Artboard();
      newArtboard.height = JSON.parse(height);
      newArtboard.width = JSON.parse(width);
      newArtboard.fill = new Color("#ffffff");
      newArtboard.name = name;
      documentRoot.addChild(newArtboard);
    });
  };

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", getValues);
  }
};

const panelMarkup = () => {
  let btn = "";
  for (let i = 0; i < artboardSizes.length; i++) {
    let { name, img, height, width } = artboardSizes[i];

    btn += `
      <style>
        .icon {
          max-width: 50px;
          width: 100%;
          margin: auto;
        }
        .icon img {
          width: 100%;
        }
        .btn-el {
          text-align: center;
          margin-bottom: 30px;
        }
      </style>
      <div class="btn-el">
        <div class="icon">
          <img src="${img}">
        </div>
        <p>${name}</p>
        <button
        data-name="${name}"
        data-height="${height}"
        data-width="${width}"
        >
        Add Artboard
        </button>
      </div>
    
    `;
  }

  let html = `
    <div>
      <div>
        <h1 style="margin-bottom: 30px;">Select Artboards</h1>
      </div>
      <div class="btn-group">
        ${btn}
      </div>
    </div>
  `;
  panel = document.createElement("div");
  panel.innerHTML = html;
  return panel;
};

const show = async event => {
  if (!panel) {
    await event.node.appendChild(panelMarkup());
    await addArtboard();
  }
};

const hide = event => console.log("plugin is hiding");

module.exports = {
  panels: {
    artboardGenerator: {
      show,
      hide
    }
  }
};
