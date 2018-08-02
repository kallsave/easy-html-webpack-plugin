
export function canvasAnimFrame () {

  window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 30);
  };

  function getRandomColor() {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
  }

  let canvas = document.createElement('canvas');

  document.getElementsByTagName('body')[0].appendChild(canvas);

  let c = canvas.getContext('2d');
  let particles = {};
  let particleIndex = 0;
  let particleNum = 0.2;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    constructor(options) {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;

      this.vx = Math.random() * 6 - 3;
      this.vy = Math.random() * 4 - 2;

      this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.007;

      particleIndex++;
      particles[particleIndex] = this;
      this.id = particleIndex;

      this.size = Math.random() * 1;
      this.color = getRandomColor();
    }

    draw() {
      this.x += this.vx;
      this.y += this.vy;

      this.size += this.growth;

      if(this.x > canvas.width || this.y > canvas.height) {
        delete particles[this.id];
      }

      c.fillStyle = this.color;
      c.beginPath();
      c.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      c.fill();
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    if(Math.random() > particleNum) {
      new Particle();
    }

    for(let i in particles) {
      particles[i].draw();
    }
  }

  requestAnimationFrame(animate);

  window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
  };

}

