const pacMen = [];
let gameStarted = false;

function setPosition(image, position) {
  image.style.left = position.x + "px";
  image.style.top = position.y + "px";
}

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan
function makePac() {
  // returns an object with values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "./images/PacMan1.png";
  newimg.width = 100;
  setPosition(newimg, position);
  game.appendChild(newimg);
  // new style of creating an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  if (!gameStarted) {
    gameStarted = true;
  }

  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    setPosition(item.newimg, item.position);
  });
  setTimeout(update, 20);
}

function startGame() {
  if (!gameStarted) {
    update();
  }
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  )
    item.velocity.x = -item.velocity.x;
  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
