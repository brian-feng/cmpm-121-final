
import { BlurFilter, TextStyle } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';


function Board(){

    return (
      <Stage width={800} height={600} options={{ background: 0x1099bb }}>
        {/* <Sprite image={bunnyUrl} x={300} y={150} />
        <Sprite image={bunnyUrl} x={500} y={150} />
        <Sprite image={bunnyUrl} x={400} y={200} /> */}
  
        <Container x={200} y={200}>
          <Text
            text="Hello World"
            anchor={0.5}
            x={220}
            y={150}
            style={
              new TextStyle({
                align: 'center',
                fill: '0xffffff',
                fontSize: 50,
                letterSpacing: 20,
                dropShadow: true,
                dropShadowColor: '#E72264',
                dropShadowDistance: 6,
              })
            }
          />
        </Container>
      </Stage>
    );
  };
  
  export default Board;
  

// const App: React.FC = () => {
//     const pixiContainer = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         // Create a Pixi.js Application
//         const app = new PIXI.Application({
//             width: 800, // Width of the canvas
//             height: 600, // Height of the canvas
//             backgroundColor: 0x1099bb, // Background color
//         });

//         // Append the Pixi.js canvas to the container
//         if (pixiContainer.current) {
//             pixiContainer.current.appendChild(app.view);
//         }

//         // Create a red rectangle
//         const graphics = new PIXI.Graphics();
//         graphics.beginFill(0xde3249); // Red color
//         graphics.drawRect(50, 50, 100, 100); // Position and size
//         graphics.endFill();
//         app.stage.addChild(graphics);

//         // Clean up on unmount
//         return () => {
//             app.destroy(true, { children: true });
//         };
//     }, []);

//     return <div ref={pixiContainer} style={{ width: '100%', height: '100%' }} />;
// };

// export default App;