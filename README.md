# Lego Map 2021 Scraper

Simple p5 sketch to scrape the color data from a lego world map image. 

## To run: 
```npm install```

```node serve.js```

Then navigate to localhost:3000

## Notes: 
Color data is logged to the console. 

Color data can also be found in the output folder in the file `data.json`

The color indexes are mapped to the following array:

```
[
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
```


