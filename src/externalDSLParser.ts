import * as toml from 'toml';

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

// Function to load the TOML file using fetch
async function loadTOMLFile(url: string): Promise<GameSettings | null> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch TOML file: ${response.statusText}`);
      }
      const tomlData = await response.text();
      
      // Parse the TOML data using toml-js
      const parsedData = toml.parse(tomlData);
            
      const gameSettings = parsedData as GameSettings;
  
      if (gameSettings.win && gameSettings.board_info) {
        return gameSettings;
      } else {
        throw new Error("Invalid TOML structure");
      }
    } catch (error) {
      console.error("Error loading or parsing TOML file:", error);
      return null;
    }
  }

// Example usage to initialize game settings
export async function initGameSettings(): Promise<GameSettings | null> {
  const gameSettings = await loadTOMLFile('/project/externalDSL.toml');
  if (gameSettings) {
    console.log('Win Condition:', gameSettings.win.win_condition);
    console.log('Human Instructions:', gameSettings.win.human_instructions);
    console.log('Board Size:', gameSettings.board_info.board_size_pixels);
    console.log('Board Colors:', gameSettings.board_info.board_colors);
    console.log('Plant Colors:', gameSettings.board_info.plant_colors);
    return gameSettings;
  }
  console.log('No TOML file found');
  return null;
}
