const colors = [
  [238, 238, 238], // white
  [3, 43, 78],     // dark blue
  [3, 218, 242],   // light blue
  [4, 183, 177],   // turquoise
  [9, 180, 58],    // dark green
  [168, 219, 6],   // light green
  [238, 211, 155], // peach
  [247, 186, 12],  // light orange
  [238, 135, 33],  // dark orange
  [249, 97, 117]   // pink
]

function colorDist(c1, c2) {
  return dist(c1[0], c1[1], c1[2], c2[0], c2[1], c2[2])
}

function colorAvg(colors) {
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;

  for (const c of colors) {
    rSum += c[0];
    gSum += c[1];
    bSum += c[2];
  }

  const l = colors.length;
  const rAvg = Math.floor(rSum / l);
  const gAvg = Math.floor(gSum / l);
  const bAvg = Math.floor(bSum / l);

  return [rAvg, gAvg, bAvg];
}

let img;
function preload() {
  img = loadImage('./data/hires_warp.png');
}
const data = []
function setup() {
  createCanvas(128*5, 80*5);
  // image(img, 0, 0);
  // frameRate(3)

  img.loadPixels();


  // lego world map is 128 x 80 pieces
  for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 80; j++) {
      const curGrid = []
      // sample 8x8 pixel grids
      for (let xOff = 0; xOff < 8; xOff++) {
        for (let yOff = 0; yOff < 8; yOff++) {
          // those decimal offsets (ex: 18.06) are because the cells in the image 
          // are 18x18 pixels but every once in a while theres an extra pixel. 
          // probably bc of some lens distortion. I figured out those 
          // offsets by creating a debug view that cycled through cells, rendering 
          // one cell at a time. I tweaked them until the cells were lined up in  
          // the debug view across the whole width/height of the map. 
          const x = 4 + Math.floor(i * 18.06) + xOff;
          const y = 4 + Math.floor(j * 18.05) + yOff;

          const index = (x + y * img.width) * 4;

          const red = img.pixels[index];
          const green = img.pixels[index + 1];
          const blue = img.pixels[index + 2];

          // dont need alpha
          // const alpha = image.pixels[index + 3];

          curGrid.push([red, green, blue])

        }
      }

      const avgCol = colorAvg(curGrid)

      // calculate color distance between each of the possible 
      // colors and the current cell's average color.
      const mapFn = (c, idx) => ({ idx, dist: colorDist(c, avgCol) })
      const colDists = colors.map(mapFn);

      // sort those color distances 
      colDists.sort((a, b) => a.dist - b.dist)

      data.push({
        x: i,
        y: j,
        colorIdx: colDists[0].idx
      })
    }
  }

  background('#132019')

  noStroke()
  for (const d of data) {
    fill(colors[d.colorIdx])
    circle(d.x*5+2.5, d.y*5+2.5, 5, 5)
  }

  console.log(JSON.stringify(data));

}
