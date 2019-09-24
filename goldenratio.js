/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
  id: "log-selection",
  title: browser.i18n.getMessage("menuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);

browser.menus.create({
  id: "leftRatio",
  type: "radio",
  title: browser.i18n.getMessage("menuItemLeftRatio"),
  contexts: ["all"],
  checked: false
}, onCreated);

browser.menus.create({
  id: "rightRatio",
  type: "radio",
  title: browser.i18n.getMessage("menuItemBluify"),
  contexts: ["all"],
  checked: false
}, onCreated);

browser.menus.create({
  id: "threeColumns",
  type: "radio",
  title: browser.i18n.getMessage("menuItemThreeColumns"),
  contexts: ["all"],
  checked: false
}, onCreated);

browser.menus.create({
  id: "fourColumns",
  type: "radio",
  title: "Four Columns",
  contexts: ["all"],
  checked: false
}, onCreated);

browser.menus.create({
  id: "imgFibRectL",
  type: "radio",
  title: "Show Fib Rect (L)",
  contexts: ["all"],
  checked: false
}, onCreated);

browser.menus.create({
  id: "imgFibRectR",
  type: "radio",
  title: "Show Fib Rect (R)",
  contexts: ["all"],
  checked: false
}, onCreated);

browser.menus.create({
  id: "turnOff",
  type: "radio",
  title: browser.i18n.getMessage("menuItemTurnOff"),
  contexts: ["all"],
  checked: true
}, onCreated);

var checkedState = true;

browser.menus.create({
  id: "tools-menu",
  title: browser.i18n.getMessage("menuItemToolsMenu"),
  contexts: ["tools_menu"],
}, onCreated);

/*
Set a colored border on the document in the given tab.

Note that this only work on normal web pages, not special pages
like about:debugging.
*/
var blue = 'document.body.style.border = "5px solid blue"';
var green = 'document.body.style.border = "5px solid green"';

function borderify(tabId, color) {
  browser.tabs.executeScript(tabId, {
    code: color
  });
}

/*
function handleLeftRatio(tabId) {
    var div = document.createElement("div");
    var leftDiv = '<div style="float:left; width:61.8%; height:100%; opacity:0.1; z-index: 9999; background:red;"></div>';
    var rightDiv = '<div style="float:left; width:38.2%; height:100%; opacity:0.1; z-index: 9999; background:green;"></div>';
    var divContainer = '<div style="position:absolute;width:100%; height:100%; z-index: 99999">' + rightDiv + leftDiv + '</div>';
    div.innerHTML = divContainer;
    document.body.insertBefore(div, document.body.firstChild);
}

var div = document.createElement('div');
div.innerHTML = 'jose';
document.body.insertBefore(div, document.body.firstChild);
*/

var left = `
if (document.getElementById("divisionID") !== null) {
  document.getElementById("divisionID").remove();
}
var div = document.createElement("div");
div.setAttribute('id', 'divisionID');
var leftDiv = '<div style="float:left; width:61.8%; height:100%; opacity:0.1; z-index: 9999; background:red;"></div>';
var rightDiv = '<div style="float:left; width:38.2%; height:100%; opacity:0.1; z-index: 9999; background:green;"></div>';
var divContainer = '<div style="position:absolute;width:100%; height:100%; z-index: 99999">' + leftDiv + rightDiv + '</div>';
div.innerHTML = divContainer;
document.body.insertBefore(div, document.body.firstChild);
`;

function handleLeftRatio(tabId) {
  browser.tabs.executeScript(tabId, {
    code: left
  });
}

var right = `
if (document.getElementById("divisionID") !== null) {
  document.getElementById("divisionID").remove();
}
var div = document.createElement("div");
div.setAttribute('id', 'divisionID')
var leftDiv = '<div style="float:left; width:61.8%; height:100%; opacity:0.1; z-index: 9999; background:red;"></div>';
var rightDiv = '<div style="float:left; width:38.2%; height:100%; opacity:0.1; z-index: 9999; background:green;"></div>';
var divContainer = '<div style="position:absolute;width:100%; height:100%; z-index: 99999">' + rightDiv + leftDiv + '</div>';
div.innerHTML = divContainer;
document.body.insertBefore(div, document.body.firstChild);
`;

function handleRightRatio(tabId) {
  browser.tabs.executeScript(tabId, {
    code: right
  });
}

var three = `
if (document.getElementById("divisionID") !== null) {
  document.getElementById("divisionID").remove();
}
var div = document.createElement("div");
div.setAttribute('id', 'divisionID')
var leftDiv = '<div style="float:left; width:33.3%; height:100%; opacity:0.1; z-index: 9999; background:red;"></div>';
var centerDiv = '<div style="float:left; width:33.3%; height:100%; opacity:0.1; z-index: 9999; background:yellow;"></div>';
var rightDiv = '<div style="float:left; width:33.3%; height:100%; opacity:0.1; z-index: 9999; background:green;"></div>';
var divContainer = '<div style="position:absolute;width:100%; height:100%; z-index: 99999">' + leftDiv + centerDiv + rightDiv + '</div>';
div.innerHTML = divContainer;
document.body.insertBefore(div, document.body.firstChild);
`
function handleThreeColumns(tabId) {
  browser.tabs.executeScript(tabId, {
    code: three
  });
}

function handleFourColumns(tabId) {
  var four = `
  if (document.getElementById("divisionID") !== null) {
    document.getElementById("divisionID").remove();
  }
  var div = document.createElement("div");
  div.setAttribute('id', 'divisionID')
  var divOne = '<div style="float:left; width:25%; height:100%; opacity:0.1; z-index: 9999; background:red;"></div>';
  var divTwo = '<div style="float:left; width:25%; height:100%; opacity:0.1; z-index: 9999; background:yellow;"></div>';
  var divThree = '<div style="float:left; width:25%; height:100%; opacity:0.1; z-index: 9999; background:green;"></div>';
  var divFour = '<div style="float:left; width:25%; height:100%; opacity:0.1; z-index: 9999; background:blue;"></div>';
  var divContainer = '<div style="position:absolute;width:100%; height:100%; z-index: 99999">' + divOne + divTwo + divThree + divFour + '</div>';
  div.innerHTML = divContainer;
  document.body.insertBefore(div, document.body.firstChild);
  `
  browser.tabs.executeScript(tabId, {
    code: four
  });
}


function handleShowFibRectL(tabId, side) {
  var img = `
  var img = document.createElement("img");
  img.setAttribute('id', 'imgIDL');
  img.src = "http://localhost:8000/CP202/Fall2019/W4/Sept24/img/Fibonacci_spiral_34.svg";
  img.style.opacity = "0.2";
  img.style.marginLeft = "auto";
  img.style.width = "100%";
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  img.style.zIndex = "10001";
  document.body.insertBefore(img, document.body.firstChild);
  `

//  img.style.transform = "rotate(90deg)";

  browser.tabs.executeScript(tabId, {
    code: img
  });
}

function handleShowFibRectR(tabId, side) {
  var img = `
  var img = document.createElement("img");
  img.setAttribute('id', 'imgIDR');
  img.src = "http://localhost:8000/CP202/Fall2019/W4/Sept24/img/Fibonacci_spiral_34.svg";
  img.style.opacity = "0.2";
  img.style.marginLeft = "auto";
  img.style.width = "100%";
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  img.style.transform = "rotate(180deg)";
  img.style.zIndex = "10001";
  document.body.insertBefore(img, document.body.firstChild);
  `

//  img.style.transform = "rotate(90deg)";

  browser.tabs.executeScript(tabId, {
    code: img
  });
}

var off = `
if (document.getElementById("divisionID") !== null) {
  document.getElementById("divisionID").remove();
}

if (document.getElementById("imgIDL") !== null) {
  document.getElementById("imgIDL").remove();
}

if (document.getElementById("imgIDR") !== null) {
  document.getElementById("imgIDR").remove();
}
`
function handleTurnOff(tabId) {
  browser.tabs.executeScript(tabId, {
    code: off
  });
}

/*
Toggle checkedState, and update the menu item's title
appropriately.

Note that we should not have to maintain checkedState independently like
this, but have to because Firefox does not currently pass the "checked"
property into the event listener.
*/
function updateCheckUncheck() {
  checkedState = !checkedState;
  if (checkedState) {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemUncheckMe"),
    });
  } else {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemCheckMe"),
    });
  }
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText);
      break;
    case "rightRatio":
      handleRightRatio(tab.id);
      // borderify(tab.id, blue);
      break;
    case "leftRatio":
      handleLeftRatio(tab.id);
      // borderify(tab.id, green);
      break;
    case "threeColumns":
      handleThreeColumns(tab.id);
      break;
    case "fourColumns":
      handleFourColumns(tab.id);
      break;
    case "imgFibRectL":
      handleShowFibRectL(tab.id);
      break;
    case "imgFibRectR":
      handleShowFibRectR(tab.id);
      break;
    case "turnOff":
      handleTurnOff(tab.id);
      break;

  }
});
