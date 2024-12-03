# cmpm-121-final devlogs

## Devlog Entry - 12/2/24
### How we satisfied the software requirements.
Our character (the black square) can move over a 2D grid by using either WASD or the arrow keys. Time gets advanced by the user pressing a button marked as "advance time" below the grid. When the character is standing on a tile, the space bar will allow a plant to be planted. If a plant is already on that square, then the plant gets harvested. Sun is randomly generated each turn on a tile, but water gets randomly assigned in the beginning of the game before being updated based on the water of adjacent tiles each turn. There are 3 plants which can be selected by pressing a button for each plant, and the sizes of the plants change based on their growth levels. In order to grow, plants are assigned XP points each turn based on their incoming sunlight and water levels, with the water level being determined by spatial rules. The game is decided to be won when the player has 10 or more plants at level 3.

### Reflection
We at first wanted to make our game based around the idea of having a hand of cards representing plants, water, sun, etc. but were quickly dissuaded from that idea. We also were told that trying to implement the game in Unity would make some of the later steps of the project much harder to implement. In order to accommodate both of these changes, we swapped our project to typescript and tried to stick to completing the requirements without increasing the scope of the project.

## Devlog Entry - 11/15/24

### The Team:
Tools Lead: Brian Feng
Engine Co-Lead: Eion Ling
Engine Co-Lead: Connor Lowe
Design Co-Lead: Charlize Serrano
Design Co-Lead: Annie McKay 

### Tools & Materials:
  Our main engine/framework that we plan to use is TypeScript + HTML5. We chose to use this since we’re familiar with working with it from this CMPM 121 class. 
  We’ll be scripting in TypeScript + HTML5. We've coded in Typescript for this entire class, so we will be able to fulfill our requirements. 
  We chose to use VSCode for our IDE because we are all familiar with it from using it in this class, and the plugins will be useful for keeping a consistent coding style. For art we will use aseprite. We chose to make our game with pixel art because it’s easy to have a consistent style across artists, and we believe that it is easier to animate pixel art sprites than 3D or hand drawn sprites.
  For our alternate platform of choice we will be using TypeScript + ThreeJS to Adam's recommendation! Our goal is to create a reasonably scoped browser game within these next couple of weeks.

### Outlook:
  We’re hoping to learn more about creating games in a group setting and becoming familiar with using these tools with multiple people. I think the hardest and riskiest part of the project is coordinating our coding. Some of our parts of the project relies on a teammate’s code. We also cannot have 2 people working on the same part of the project otherwise conflicts may occur.
  For a spin on our game, we were thinking we would take the general game loop and turn it into a deck builder. We would start out with a base pack of cards and a small grid and as the player progresses they unlock new seeds to obtain. While we would maintain the general game loop of a person going over tile-grids and planting, the player-view would be top down with a hand of cards at the bottom of the screen. To play a hand the player will move around and place a selected card on the open grid, which would apply to the ground in front of them.