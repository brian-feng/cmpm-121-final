# cmpm-121-final devlogs
##Devlog Entry - 12/9/24
### How we satisfied the software requirements.
 #### F0+F1+F2
 No major changes were made to any of the F0 F1 or F2 requirements.

 #### Internationalization
 To internationalize our game, we decided to use the help of i18next.js, which is an internalization framework built for javascript and typescript. Within i18n.ts, we handled all the interation with the i18next, and exported three functions: 
 ```typescript
export function setLocale(lng: string) {
  language = lng;
}
export function getLocale() {
  return language;
}
export function to_current_language(key: string) {
  return i18next.t(key, { lng: language });
}
```
 In other files, instead of sending English text to buttons' innerHTML or textContent values, we can call to_current_language() to provide a key for the desired text and be returned a localized version of the desired text. Each English text that appeared before F3 has been identified with a unique key like "advance_time" or "save_game". With this framework in hand, we were able to redesign the entire project to not strictly use English in any text box, but rather uses the return of to_current_language()
 
 #### Localization
 Our game supports English, Chinese, and Arabic. Chinese is a logographic language and Arabic is read from right to left, so many considerations have to be made to accommodate for these differences. To accomplish this, we created three .json files in the locales directory that contain maps from keys used in to_current_languages() to translated text. We sourced the translated text from Google Translate. Brian used his personal knowledge in Chinese to slightly adjust the translations, though he could not directly provide translations since he could not write in symbolic Chinese. However, Arabic was completely sourced from Google Translate. WE tried our best to generalize the text in our game in such a way symbolic languages and right to left languages could be read comfortably. For example, instead of using string concatenation, we tended to use line breaks to avoid the differences in right to left and left to right languages.

 The user selects their language by pressing a button marked with that language, written in that language. This is for ease of use for the player, since it wouldn't make sense to write "Chinese" in English. The language button for Chinese is always written in Chinese, to ensure that people who only speak Chinese can easily identify what button to push to change the language. The game always launches with English, but the buttons are easily spotted for the user to change their language.

  
 #### Mobile Installation
 Our mobile installation works by updating our index.html file to include a link to download the game. We also created a webmanifest file that has all the application info needed to download the game. This includes the app's full name, shortened name, description, launch file, display mode, and an icon.

 We used this example by Adam Smith to guide us on how to accomplish this:
 https://canvas.ucsc.edu/courses/76391/discussion_topics/647812
 
 #### Mobile Play (Offline)
 The provided guide conveniently provides support for offline gameplay. No changes were required to accomplish this. We verified that our game works offline by setting our phones to airplane mode temporarily and continuing to play the game, even force quitting and reloading to ensure that our game is fully functional while offline. We believe this is because we save our game through browser local storage, which should be unaffected by internet connection.

 ## Reflection
 Since in F2 we tried to make our game look better by including several emojis to prevent our game from being a giant wall of text, we had to go back on that and make some of the back into text to ensure we showed enough internationalization and localization. We were planning on using React Pixi typescript because there are many different libraries to use that would have made F3 easier, but decided against it because there are still many libraries in Deno typescript. This made it slightly more difficult, but was a better choice than changing our language entirely.

##Devlog Entry - 12/9/24
### How we satisfied the software requirements.
#### F0 + F1
 No major changes were made to any of the F0 or F1 requirements.

#### External DSL for Scenario Design
 For the external DSL we used a TOML file with a few variables to define the win conditions and the board information. Below is the TOML file:

```javascript
[win]
  win_condition = 10
  human_instructions = "Grow at least 10 plants."

[board_info]
  board_size_pixels = [1280, 720]
  board_colors = ["green", "lime"]
  plant_colors = ["purple", "brown", "white", "red"]
```

In order to extract the information, some helper functions were created in order to parse the through the TOML file and return an interface called GameSettings, and children interfaces for each category of game information.
```javascript
export interface WinData {
  win_condition: number;
  human_instructions: string;
}

export interface BoardInfo {
  board_size_pixels: [number, number];
  board_colors: string[];
  plant_colors: string[];
}

export interface GameSettings {
  win: WinData;
  board_info: BoardInfo;
}
```
The end result of this is as follows:
 
a TOML file holds all the data in an easy to edit way
the TOML file gets parsed and outputs a variable of type GameSettings which holds all the information
our project uses GameSettings's values in place of the "magic numbers" code smell
the TOML file can be changed as needed to update important variables across the project

#### Internal DSL for Plants and Growth Conditions
 For our internal plant DSL we used a very simple interface in TypeScript. The interface describes a flower as being a simple ID number, a color, a name, and a function to calculate its growth rate.
  ```typescript
  interface PlantType {
    index: number;
    color: string;
    name: string;
    gainXP: (board: Board, tileParam: BoardTile) => number;
  }
  ```
 
We then created an array of PlantTypes, and helper functions to access specific data in the array using only the ID of the plant. This was very important to us to have all the data accessible through a single number variable as we didn't want to increase the size of our save file at all and we were already saving this plantID data previously but under a different name. 

A benefit to using our host language for this DSL is that we are able to create functions that can directly reference our board and use them in our DSL. 
```typescript
function increaseXPForAdjacentSamePlants(Board: Board, tileParam: BoardTile) {
  let tempXP = 0;
  Board.getAdjacentTiles(tileParam).forEach((tile) => {
    if (tile.cropLevel > 0 && tile.plantID == tileParam.plantID) {
      tempXP += 2;
    }
  });
  return tempXP;

const plants: PlantType[] = [
  { index: 2, color: "purple", name: "Purple", gainXP: (board: Board, tileParam: BoardTile) => increaseXPForAdjacentSamePlants(board, tileParam) },
}
```

This is a function that required a Board object and a BoardTile on that board to determine which spaces around the plant are the same plant as the initial plant. The function is then put into our PlantType array so that we will then be able to call the function from anywhere and apply the XP amount it returns directly onto the BoardTile.

#### Switch to Alternate Platform
We did not end up implementing this part of the project. We attempted to convert our project to React + Pixi Typescript, but ultimately failed. To save ourselves from the headache, we remained in Deno typescript for the entire project.
    
## Reflection
When we first started this project, we were going to use Unity and convert to Godot. We were talked out of that, and used Deno Typescript and were planning to swap to React + Pixi Typescript. That plan fell apart when we realized how vastly different React is from base Typescript, and how little we knew about React. Thus, we made the group decision to not change languages. In retrospect, we should have put more research into the many options we considered so that our project could successfully undergo a langauge change. In the end we were happy with what we could accomplish with just Deno and Typescript, though we are a bit disappointed in ourselves for not preparing ahead of time. Our game looks slightly more polished now since we added more colors, and used emojis to not have a giant wall of text given to the player. We hope that the colors more effectively communicate the different types of plants in our game.

##Devlog Entry - 12/5/24
### How we satisfied the software requirements.
 - F0.a - same as last week
 - F0.b - same as last week
 - F0.c - same as last week
 - F0.d - same as last week
 - F0.e - same as last week
 - F0.f - same as last week
 - F0.g - same as last week
 - F1.a - Our game’s grid is saved in an AoS format. Each tile of our game contains data from a structure, which contains a lot of data the tile needs such as position, water and sun levels, plant information, tile color, the plant data, and if the tile has the player. All of those previous values are numbers, and the player being on the tile is a boolean. This means that each structure uses 45 bytes of data, since we have 11 numbers (4 bytes each) and 1 boolean value (1 byte). Since our grid is a 25 wide and 14 tall board of tiles, this means we have 350 structures in our array, for a total size of 15750 bytes in the save file. Below is a visual representation of our breakdown for a single index of our array.
![F1.a data structure diagram](./f1_a_diagram.png)
 - F1.b - We introduced a button into our game labeled as “Save game” which prompts the player to choose a save slot, allowing them to choose between save slots 1, 2, and 3. This works by saving our data to local storage using a key in the format of “saveData[fileNumber].[saveNumber]” where file number is the entered save slot. 
 - F1.c - The autosave system is tied with the undo and redo system as well as the advanceTime button. By default, the game creates autosaves in the format “saveData[fileNumber].[saveNumber]” using localStorage. The currently active saveNumber is saved in localStorage for each fileNumber as well and is used to load the state of the previous session while allowing the previous undo and redo stack to still be functional. A boardTile array is encoded into base64 to save space in saves, and decoded when loading. An autosave is generated every time the advanceTime button is pressed.
 - F1.d - Undo simply increments the undo stack pointer, which is saved to the variable index, which is loaded from local storage when refreshing the game, then loads the save that the stack pointer points to. As a consequence, saving a game results in all saveData entities with a saveNumber higher than index being flushed. Redo is also simple, decrementing index to load the previous autosave. 

### Reflection
We retroactively redefined the properties of a boardTile to accommodate for the AoS format. For example, we had to remove plantColor and calculate its color upon creation using plantName to make space for other information. This was key to saving data because when serialized, strings take up a lot more space than numbers. While it took a lot of work going through all of our different files in order to accomodate this change, we are glad that we made this change. The biggest takeaway from this is that we had many variables that we didn't actually *need* when we could repurpose the variables we already had to have multiple different uses.

## Devlog Entry - 12/2/24
### How we satisfied the software requirements.
Our character (the black square) can move over a 2D grid by using either WASD or the arrow keys. Time gets advanced by the user pressing a button marked as "advance time" below the grid. When the character is standing on a tile, the space bar will allow a plant to be planted. If a plant is already on that square, then the plant gets harvested. Sun is randomly generated each turn on a tile, but water gets randomly assigned in the beginning of the game before being updated based on the water of adjacent tiles each turn. There are 3 plants which can be selected by pressing a button for each plant, and the sizes of the plants change based on their growth levels. In order to grow, plants are assigned XP points each turn based on their incoming sunlight and water levels, with the water level being determined by spatial rules. The game is decided to be won when the player has 10 or more plants at level 3.

### Reflection
We at first wanted to make our game based around the idea of having a hand of cards representing plants, water, sun, etc. but were quickly dissuaded from that idea. We also were told that trying to implement the game in Unity would make some of the later steps of the project much harder to implement. In order to accommodate both of these changes, we swapped our project to typescript and tried to stick to completing the requirements without increasing the scope of the project.

## Devlog Entry - 11/15/24

### The Team:
 - Tools Lead: Brian Feng
 - Engine Co-Lead: Eion Ling
 - Engine Co-Lead: Connor Lowe
 - Design Co-Lead: Charlize Serrano
 - Design Co-Lead: Annie McKay 

### Tools & Materials:
  Our main engine/framework that we plan to use is TypeScript + HTML5. We chose to use this since we’re familiar with working with it from this CMPM 121 class. 
  We’ll be scripting in TypeScript + HTML5. We've coded in Typescript for this entire class, so we will be able to fulfill our requirements. 
  We chose to use VSCode for our IDE because we are all familiar with it from using it in this class, and the plugins will be useful for keeping a consistent coding style. For art we will use aseprite. We chose to make our game with pixel art because it’s easy to have a consistent style across artists, and we believe that it is easier to animate pixel art sprites than 3D or hand drawn sprites.
  For our alternate platform of choice we will be using TypeScript + ThreeJS to Adam's recommendation! Our goal is to create a reasonably scoped browser game within these next couple of weeks.

### Outlook:
  We’re hoping to learn more about creating games in a group setting and becoming familiar with using these tools with multiple people. I think the hardest and riskiest part of the project is coordinating our coding. Some of our parts of the project relies on a teammate’s code. We also cannot have 2 people working on the same part of the project otherwise conflicts may occur.
  For a spin on our game, we were thinking we would take the general game loop and turn it into a deck builder. We would start out with a base pack of cards and a small grid and as the player progresses they unlock new seeds to obtain. While we would maintain the general game loop of a person going over tile-grids and planting, the player-view would be top down with a hand of cards at the bottom of the screen. To play a hand the player will move around and place a selected card on the open grid, which would apply to the ground in front of them.

