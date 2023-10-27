export default function sketch(p) {
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
    waveHeight = 200; // Initial value, will be updated dynamically
    seaFillHeight = waveHeight; // Initialize seaFillHeight
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
    let verticalOffset = p.map(waveHeight, 0, 100, 0, p.height);

    // Set up lighting
    p.directionalLight(255, 255, 255, 0, 1, -1);

    // Create a sunset-colored background using a large rectangle
    p.push();
    p.translate(0, 0, -10); // Move the rectangle behind the wave
    p.specularMaterial(255, 100, 0); // Sunset orange
    p.noStroke();
    p.rectMode(p.CENTER); // Draw the rectangle from the center
    p.rect(0, 0, p.width * 2, p.height * 2); // Make the rectangle larger to cover the canvas
    p.pop();

    // wave
    p.push();
    p.translate(0, seaFillHeight / 6, 0); // Adjust for 3D space

    p.noStroke();
    p.specularMaterial(50, 100, 255); // Color for the wave

    p.beginShape(p.TRIANGLE_STRIP); // Use TRIANGLE_STRIP to create a filled shape

    for (let x = -p.width / 2; x < p.width / 2 + 10; x += 10) {
      let noiseOffset = p.map(x, -p.width / 2, p.width / 2, 0, 8);
      let originalY = p.map(p.noise(noiseOffset, time), 0, 1, -waveHeight, waveHeight);

      let speedModifier = 1 + (0.5 * waveDirection * p.cos(p.map(x, -p.width / 2, p.width / 2, 0, p.PI)));
      originalY *= speedModifier;

      let decayedY = decayedWave[p.int((x + p.width / 2) / 10)] * decayFactor;
      let y = decayedY;

      if (x + p.width / 2 > wavePosition) {
        y += p.map(p.sin((x - wavePosition) * waveSpeed), -1, 1, 0, waveAmplitude);
      }

      p.vertex(x, y, 0);
      p.vertex(x, y + seaFillHeight, 0);

      decayedWave[p.int((x + p.width / 2) / 10)] = originalY;
      let targetDirection = animationPhase === 0 ? -1 : 1;
      waveDirection = p.lerp(waveDirection, targetDirection, directionTransitionSpeed);
      animationPhase = p.lerp(animationPhase, targetDirection, directionTransitionSpeed);
      animationPhase = p.constrain(animationPhase, 0, 1);
    }

    p.endShape(p.CLOSE);

    p.pop();

    wavePosition += animationSpeed * waveAmplitude * waveDirection;
    if (wavePosition > p.width / 2) {
      wavePosition = -p.width / 2;
    }

    time += animationSpeed;
  };
}
