/**
 * Lightning Effect
 */
function lightning(engine, x, y) {
    const colors = ['#FFFFFF', '#00FFFF', '#87CEFA'];
    
    for (let bolt = 0; bolt < 3; bolt++) {
        let currentX = x;
        let currentY = y;

        for (let i = 0; i < 15; i++) {
            const nextX = currentX + (Math.random() - 0.5) * 15;
            const nextY = currentY + 5;

            for (let j = 0; j < 3; j++) {
                engine.createParticle({
                    x: currentX + (nextX - currentX) * (j / 3),
                    y: currentY + (nextY - currentY) * (j / 3),
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: 2,
                    life: 15,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    type: 'circle'
                });
            }

            currentX = nextX;
            currentY = nextY;
        }
    }
}

// Auto-register effect
if (typeof effectLoader !== 'undefined') {
    effectLoader.registerEffect('lightning', lightning);
}
