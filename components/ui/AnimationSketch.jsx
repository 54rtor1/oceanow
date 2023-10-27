// Easing function for smoothing the transition
function cubicEaseInOut(t) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

// Extended easing function for values from 0 to 3
function extendedCubicEaseInOut(t) {
  if (t <= 1) {
    return cubicEaseInOut(t);
  } else {
    return map(t, 1, 3, 1, cubicEaseInOut(1));
  }
}

const AnimationSketch = (p) => {
  let waveHeight;
  let time = 0;
  let decayFactor = 1;
  let decayedWave = [];
  let animationPhase = 1; // 0 for right-to-left, 1 for left-to-right
  let animationSpeed = 0.005;
  let directionTransitionSpeed = 0.0025; // Adjust this for smoother transitions
  let waveAmplitude = 10; // Amplitude of the initial wave
  let waveSpeed = 0.01; // Speed of the initial wave
  let wavePosition = 0; // Initial position of the wave
  let seaFillHeight = 0; //
  let waveDirection = 1;

  p.setup = function () {
    const canvasWidth = 800;
    const canvasHeight = 390;
    p.createCanvas(canvasWidth, canvasHeight, p.WEBGL); // Use WEBGL renderer
    let APIvalue = 2; // to be dynamically updated
    let initialSeaHeight = APIvalue / 3; // adjusts value from API
    waveHeight = p.map(extendedCubicEaseInOut(initialSeaHeight), 0, 1, 10, 250); // Apply easing for smoothing
    waveDirection = 1; // Initialize waveDirection

    // Calculate seaFillHeight dynamically based on the initial sea height
    seaFillHeight = p.map(extendedCubicEaseInOut(initialSeaHeight), 0, 1, p.height / 3, p.height / 6); // Apply easing for smoothing

    p.noiseDetail(1.8);
    for (let i = 0; i < p.width / 8; i++) {
      decayedWave.push(0);
    }
  };

  p.draw = function () {
    // Set up camera
    p.camera();
    p.perspective(p.PI / 3.0, p.width / p.height, 0.1, 1000);

    // Set the background to cover the whole canvas
    p.background(0); // Black background

    // Calculate the vertical offset based on waveHeight
    let canvasHeight = p.height; // Store canvas height
    let verticalOffset = p.map(waveHeight, 0, 100, 0, canvasHeight);

    // Set up lighting
    p.directionalLight(227, 144, 54, -0, -1, -1); // Cor da Luz

    // Create a sunset-colored background using a large rectangle
    p.push();
    p.translate(0, 0, -10); // Move the rectangle behind the wave
    p.specularMaterial(252, 121, 228); // Cor do Fundo
    p.noStroke();
    p.rectMode(p.CENTER); // Draw the rectangle from the center
    p.rect(0, 0, p.width * 2, canvasHeight * 2); // Make the rectangle larger to cover the canvas
    p.pop();
    p.specularMaterial(227, 144, 54); // Cor da Onda

    // wave
    p.push();
    p.translate(0, seaFillHeight, 0); // Adjust for 3D space

    p.noStroke();

    p.beginShape(p.TRIANGLE_STRIP); // Use QUADS to create a filled shape

    for (let x = -p.width / 2; x < p.width / 2 + 10; x += 10) { // Adjust for 3D space and full width
      let noiseOffset = p.map(x, -p.width / 2, p.width / 2, 0, 8); // Adjust for 3D space and full width
      let originalY = p.map(p.noise(noiseOffset, time), 0, 1, -waveHeight, waveHeight);

      // Apply speed modulation based on wave direction
      let speedModifier = 1 + (0.5 * waveDirection * p.cos(p.map(x, -p.width / 2, p.width / 2, 0, p.PI))); // Adjust for 3D space and full width
      originalY *= speedModifier;

      let decayedY = decayedWave[p.int((x + p.width / 2) / 10)] * decayFactor; // Adjust index for full width
      let y = decayedY;

      // Apply the influence of the wave
      if (x + p.width / 2 > wavePosition) { // Adjust for full width
        y += p.map(p.sin((x - wavePosition) * waveSpeed), -1, 1, 0, waveAmplitude);
      }

      // Add vertices to the shape
      p.vertex(x, y, 0);
      p.vertex(x, canvasHeight / 2, 0); // Extend vertices to the bottom of the canvas

      decayedWave[p.int((x + p.width / 2) / 10)] = originalY; // Adjust index for full width

      // Smoothly transition animation direction and phase
      let targetDirection = extendedCubicEaseInOut(animationPhase) === 0 ? -1 : 1;
      waveDirection = p.lerp(waveDirection, targetDirection, directionTransitionSpeed);
      animationPhase = p.lerp(animationPhase, targetDirection, directionTransitionSpeed);

      // Ensure animation phase stays within limits
      animationPhase = p.constrain(animationPhase, 0, 1);
    }

    p.endShape(p.CLOSE);

    p.pop(); // Restore the transformation matrix

    // Update wave position
    wavePosition += animationSpeed * waveAmplitude * waveDirection;
    if (wavePosition > p.width / 2) {
      wavePosition = -p.width / 2; // Reset the wave position
    }

    time += animationSpeed;
  };
};

export default AnimationSketch;
