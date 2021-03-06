let canvas = document.getElementById("myCanvas");
let brush = canvas.getContext("2d");

let turn = false;
let boxPos;

let playerX;
let playerO;

let xPoints = 0;
let oPoints = 0;

// Event that catches the click to select the box

function startMenu() {
  playerX = document.querySelector("#p1").value;
  playerO = document.querySelector("#p2").value;

  createHeader(playerX, playerO);
  restart();
}

function start() {
  boxPos = [
    {
      id: 1,
      sx: 0,
      sy: 0,
      ex: 166,
      ey: 166,
      active: false,
      type: 2,
      pos: { x: 83, y: 83 },
    },
    {
      id: 2,
      sx: 166,
      sy: 0,
      ex: 332,
      ey: 166,
      active: false,
      type: 2,
      pos: { x: 250, y: 83 },
    },
    {
      id: 3,
      sx: 332,
      sy: 0,
      ex: 500,
      ey: 166,
      active: false,
      type: 2,
      pos: { x: 416, y: 83 },
    },
    {
      id: 4,
      sx: 0,
      sy: 166,
      ex: 166,
      ey: 332,
      active: false,
      type: 2,
      pos: { x: 83, y: 250 },
    },
    {
      id: 5,
      sx: 166,
      sy: 166,
      ex: 332,
      ey: 332,
      active: false,
      type: 2,
      pos: { x: 250, y: 250 },
    },
    {
      id: 6,
      sx: 332,
      sy: 166,
      ex: 500,
      ey: 332,
      active: false,
      type: 2,
      pos: { x: 416, y: 250 },
    },
    {
      id: 7,
      sx: 0,
      sy: 332,
      ex: 166,
      ey: 500,
      active: false,
      type: 2,
      pos: { x: 83, y: 416 },
    },
    {
      id: 8,
      sx: 166,
      sy: 332,
      ex: 332,
      ey: 500,
      active: false,
      type: 2,
      pos: { x: 250, y: 416 },
    },
    {
      id: 9,
      sx: 332,
      sy: 332,
      ex: 500,
      ey: 500,
      active: false,
      type: 2,
      pos: { x: 416, y: 416 },
    },
  ];
  turn = false;

  const pointStart = 166;
  brush.beginPath();
  brush.lineWidth = 7;
  brush.lineCap = "round";
  brush.strokeStyle = "#3B50D9";
  brush.moveTo(pointStart, 10);
  brush.lineTo(pointStart, 490);
  brush.stroke();
  brush.beginPath();
  brush.moveTo(pointStart * 2, 10);
  brush.lineTo(pointStart * 2, 490);
  brush.stroke();
  brush.beginPath();
  brush.moveTo(10, pointStart);
  brush.lineTo(490, pointStart);
  brush.stroke();
  brush.beginPath();
  brush.moveTo(10, pointStart * 2);
  brush.lineTo(490, pointStart * 2);
  brush.stroke();

  pointTurn();
}

function restart() {
  const modal = document.querySelector(".modal");
  canvas = document.getElementById("myCanvas");
  brush = canvas.getContext("2d");

  canvas.addEventListener("click", (ev) => {
    const mousePos = getMousePos(ev);
    boxActive(mousePos);
  });

  brush.clearRect(0, 0, canvas.width, canvas.height);
  modal.remove();
  start();
}

function createCircle(x, y) {
  let arcLength = 0;
  // brush.beginPath();
  // brush.lineWidth = 7;
  // brush.strokeStyle = "#eee";
  // brush.arc(x, y, 50, 0, Math.PI * 2, true);
  // brush.stroke();

  do {
    const arc = arcLength;
    setTimeout(() => {
      brush.beginPath();
      brush.strokeStyle = "#eee";
      brush.lineWidth = arc + 2;
      brush.arc(x, y, 50, arc, arc + 0.1, false);
      brush.stroke();
    }, arcLength * 100);
    arcLength = arcLength + 0.1;
  } while (arcLength < 6);
}

function createX(x, y) {
  const lineLength = 40;
  const timeCreateLine = 0.5;

  const startX = x - lineLength;
  const startY = y - lineLength;
  const endX = x + lineLength;
  const endY = y + lineLength;

  let line = 0;
  do {
    const x = startX + line;
    const y = startY + line;
    const widthLine = (line + 6) / 6;

    setTimeout(() => {
      brush.strokeStyle = "#333";
      brush.beginPath();
      brush.lineWidth = widthLine;
      brush.moveTo(x, y);
      brush.lineTo(x + 1, y + 1);
      brush.stroke();
    }, line * timeCreateLine);

    line++;
  } while (endY > startY + line + 1);

  line = 0;
  do {
    const x = startX + line;
    const y = endY - line;
    const widthLine = (line + 5) / 5;

    setTimeout(() => {
      brush.strokeStyle = "#333";
      brush.beginPath();
      brush.lineWidth = widthLine;
      brush.moveTo(x, y);
      brush.lineTo(x + 1, y + 1);
      brush.stroke();
    }, line * timeCreateLine);

    line++;
  } while (endX > startX + line + 1);
}

function createLineWin(xs, ys, xd, yd) {
  let line = 1;
  let directionX;
  let directionY;

  if (xs < xd) {
    directionX = 1;
  } else if (xs === xd) {
    directionX = 0;
  } else {
    directionX = -1;
  }

  if (ys < yd) {
    directionY = 1;
  } else if (ys === yd) {
    directionY = 0;
  } else {
    directionY = -1;
  }

  do {
    const x = xs + line * directionX;
    const y = ys + line * directionY;
    const widthLine = Math.sin(line * 0.01) * 15;

    setTimeout(() => {
      brush.strokeStyle = "#000";
      brush.beginPath();
      brush.lineWidth = widthLine;
      brush.moveTo(x, y);
      brush.lineTo(x + 1, y + 1);
      brush.stroke();
    }, 500);

    line++;
  } while (line !== 331);
}

function createHeader(p1, p2) {
  const header = document.querySelector(".header");
  const playerStatus = `
  <div class="header_item" id="p2">
  <strong class="header_item-icon">⭕</strong><span>${p2}</span>
  </div>
  <div class="header_item" id="p1">
  <strong class="header_item-icon">✖️</strong><span>${p1}</span>
  </div>`;
  header.innerHTML += playerStatus;
}

function createModal(result, winner) {
  //if result is true then it's win
  const container = document.querySelector(".container");
  const pl1 = document.querySelector("#p1");
  const pl2 = document.querySelector("#p2");
  const titleWin = `Congratulations ${winner}, it was a great victory`;
  const titleTie = "It was a great tied";
  const modal = `
  <div class="modal">
  <div><p class="modal__text">${result ? titleWin : titleTie}</p></div>
  <div><button onclick="restart()" class="modal__button">Restart</button></div>
  </div>
  `;

  if (result) {
    turn
      ? (pl1.innerHTML = `<strong class="header_item-icon">✖️</strong><span>${playerX}</span><div class="header_item-point">${xPoints}</div>`)
      : (pl2.innerHTML = `<strong class="header_item-icon">⭕</strong><span>${playerO}</span><div class="header_item-point">${oPoints}</div>`);
  }

  setTimeout(() => {
    container.innerHTML += modal;
  }, 2000);
}

function pointTurn() {
  const canvasBg = document.getElementById("canvasBg");
  const brushBg = canvasBg.getContext("2d");

  const lineLength = 220;
  const x = 250;
  const y = 250;

  brushBg.clearRect(0, 0, canvasBg.width, canvas.height);

  brushBg.lineWidth = 20;
  brushBg.strokeStyle = "#5F45ED66";
  brushBg.lineCap = "round";
  brushBg.beginPath();

  if (turn) {
    brushBg.moveTo(x - lineLength, y - lineLength);
    brushBg.lineTo(x + lineLength, y + lineLength);
    brushBg.moveTo(x - lineLength, y + lineLength);
    brushBg.lineTo(x + lineLength, y - lineLength);
  } else {
    brushBg.arc(x, y, lineLength, 0, Math.PI * 2, true);
  }
  brushBg.stroke();
}

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

function boxActive(mousePos) {
  const { x, y } = mousePos;
  let invokePos = { x: 0, y: 0 };
  let invoke = false;

  for (const box of boxPos) {
    if (box.sx < x && box.ex > x && box.sy < y && box.ey > y && !box.active) {
      box.active = true;
      box.type = turn ? 1 : 0;
      invoke = true;
      invokePos = box.pos;
      break;
    }
  }

  if (invoke) {
    turn
      ? createX(invokePos.x, invokePos.y)
      : createCircle(invokePos.x, invokePos.y);

    for (const box of boxPos) {
      if (!box.active) {
        break;
      }
      if (box.id === 9) {
        tie();
      }
    }
    win(turn);
    turn = !turn;
  }

  pointTurn();
}

function win(turn) {
  // true == x false = circle
  const player = turn ? playerX : playerO;
  let result = false;

  for (let i = 0; i < boxPos.length; i += 3) {
    if (boxPos[i].active && boxPos[i + 1].active && boxPos[i + 2].active) {
      if (
        boxPos[i].type === boxPos[i + 1].type &&
        boxPos[i].type === boxPos[i + 2].type
      ) {
        result = true;
        createLineWin(
          boxPos[i].pos.x,
          boxPos[i].pos.y,
          boxPos[i + 2].pos.x,
          boxPos[i + 2].pos.y
        );
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    if (boxPos[i].active && boxPos[i + 3].active && boxPos[i + 6].active) {
      if (
        boxPos[i].type === boxPos[i + 3].type &&
        boxPos[i].type === boxPos[i + 6].type
      ) {
        result = true;
        createLineWin(
          boxPos[i].pos.x,
          boxPos[i].pos.y,
          boxPos[i + 6].pos.x,
          boxPos[i + 6].pos.y
        );
      }
    }
  }

  for (let i = 0; i < 3; i += 2) {
    if (boxPos[i].active && boxPos[4].active && boxPos[8 - i].active) {
      if (
        boxPos[i].type === boxPos[4].type &&
        boxPos[i].type === boxPos[8 - i].type
      ) {
        result = true;
        createLineWin(
          boxPos[i].pos.x,
          boxPos[i].pos.y,
          boxPos[8 - i].pos.x,
          boxPos[8 - i].pos.y
        );
      }
    }
  }

  if (result) {
    turn ? xPoints++ : oPoints++;
    createModal(true, player);
  }
}

function tie() {
  createModal(false, "");
}
