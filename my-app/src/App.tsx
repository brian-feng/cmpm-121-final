import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const App: React.FC = () => {
    const pixiContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Create a Pixi.js Application
        const app = new PIXI.Application({
            width: 800, // Width of the canvas
            height: 600, // Height of the canvas
            backgroundColor: 0x1099bb, // Background color
        });

        // Append the Pixi.js canvas to the container
        if (pixiContainer.current) {
            pixiContainer.current.appendChild(app.view);
        }

        // Create a red rectangle
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xde3249); // Red color
        graphics.drawRect(50, 50, 100, 100); // Position and size
        graphics.endFill();
        app.stage.addChild(graphics);

        // Clean up on unmount
        return () => {
            app.destroy(true, { children: true });
        };
    }, []);

    return <div ref={pixiContainer} style={{ width: '100%', height: '100%' }} />;
};

export default App;