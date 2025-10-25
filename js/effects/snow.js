/**
 * Snow Effect
 */
function snow(engine, x, y) {
    const colors = ['#FFFFFF', '#F0F8FF', '#F5F5F5'];
    
    for (let i = 0; i < 40; i++) {
        engine.createParticle({
            x: x + (Math.random() - 0.5) * 100,
            y: y - 50,
            vx: (Math.random() - 0.5) * 0.5,
            vy: 0.5 + Math.random() * 0.5,
            size: 2 + Math.random(),
            life: 120,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: 'circle'
        });
    }
}

// Auto-register effect
if (typeof effectLoader !== 'undefined') {
    effectLoader.registerEffect('snow', snow);
}
