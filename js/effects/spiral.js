/**
 * Spiral Effect
 */
function spiral(engine, x, y) {
    const colors = ['#FF00FF', '#9400D3', '#4B0082', '#0000FF'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const angle = (i / 80) * Math.PI * 8;
            const radius = i * 0.4;
            
            engine.createParticle({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
                vx: Math.cos(angle) * 0.5,
                vy: Math.sin(angle) * 0.5,
                size: 2,
                life: 60,
                color: colors[Math.floor(Math.random() * colors.length)],
                type: 'circle'
            });
        }, i * 20);
    }
}

// Auto-register effect
if (typeof effectLoader !== 'undefined') {
    effectLoader.registerEffect('spiral', spiral);
}
