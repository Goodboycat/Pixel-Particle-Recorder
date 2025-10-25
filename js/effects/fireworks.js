/**
 * Fireworks Effect
 */
function fireworks(engine, x, y) {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Launch trail
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            engine.createParticle({
                x, y: y + i * 3,
                vx: 0, vy: -6,
                size: 2,
                life: 20,
                color: '#FFA500',
                type: 'circle'
            });
        }, i * 30);
    }

    // Explosion
    setTimeout(() => {
        for (let i = 0; i < 60; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 2;
            
            engine.createParticle({
                x, y: y - 50,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random(),
                life: 50,
                color: color,
                type: 'circle'
            });
        }
    }, 450);
}

// Auto-register effect
if (typeof effectLoader !== 'undefined') {
    effectLoader.registerEffect('fireworks', fireworks);
}
