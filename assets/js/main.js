class Track {
  constructor(colours) {
    this.track = document.getElementById("track");
    this.btn = document.getElementById("start");
    this.colours = colours;
    this.horses = [];
    this.place = 0;
  }
  init() {
    this.colours.forEach((c) => this.addHorse(new Horse(c)));
  }
  reset() {
    this.horses = [];
    this.track.innerHTML = "";
    this.btn.innerHTML = "Go";
    this.init();
  }
  action() {
    if (this.btn.innerHTML == "Go") this.track.startRace();
    if (this.btn.innerHTML == "Reset") this.track.reset();
  }
  addHorse(horse) {
    this.horses.push(horse);
    this.track.appendChild(horse.box);
  }
  startRace() {
    this.place = 0;
    this.horses.forEach((h) => h.start());
  }
}

class Horse {
  constructor(colour) {
    this.box = document.createElement("div");
    this.img = document.createElement("img");
    this.img.src = "./assets/img/horse.png";
    this.box.style.backgroundColor = colour;
    this.box.classList.add("horse");
    this.box.appendChild(this.img);
    this.x = 0;
  }

  start() {
    const move = () => {
      this.x += Math.random() * 10;
      this.x = Math.floor(this.x);
      this.box.style.left = this.x + "px";
      if (this.x < 900) requestAnimationFrame(move);
      else this.box.dataset.position = ++track.place;
      if (track.place == track.colours.length) track.btn.innerHTML = "Reset";
    };
    move();
  }
}

const colours = ["red", "orange", "yellow", "white", "blue", "indigo", "violet", "black", "brown", "pink", "azure"];
const track = new Track(colours);
track.init();
