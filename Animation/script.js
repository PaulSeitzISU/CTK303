// Function to generate a random color based on X and Y coordinates
function generateColor(x, y) {
    // You can replace this logic with your own color generation algorithm
    const red = Math.floor(((x / 32) + 10) * 255);
    const green = Math.floor((y / 16) * 255);
    const blue = Math.floor(((x + y) / 48) * 255);
    return `rgb(${red}, ${green}, ${blue})`;
  }
  
  // Create the cubes and set their colors based on coordinates
  const cubeGrid = document.getElementById("cubeGrid");
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 32; x++) {
      const cosmicCube = document.createElement("div");
      cosmicCube.classList.add("cosmic-cube");
  
      // Create faces for the cube and set their colors
      const faces = ["front", "back", "left", "right", "top", "bottom"];
      faces.forEach((face) => {
        const cubeFace = document.createElement("div");
        cubeFace.classList.add("cube-face", `cube-${face}`);
        
        // Calculate the color based on X and Y coordinates
        const color = generateColor(x, y);
        cubeFace.style.backgroundColor = color;
  
        cosmicCube.appendChild(cubeFace);
      });
  
      // Append the cube to the grid
      cubeGrid.appendChild(cosmicCube);
    }
  }

  
  