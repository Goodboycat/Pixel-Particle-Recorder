/**
 * Explosion Effect
 */
function explosion(engine, x, y) {
    const colors = ['#FF4500', '#FF0000', '#FFA500', '#FFFF00', '#FFFFFF'];
    
    for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        
        engine.createParticle({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 2 + Math.random() * 2,
            life: 40 + Math.random() * 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: 'circle'
        });
    }
}

// Auto-register effect
if (typeof effectLoader !== 'undefined') {
    effectLoader.registerEffect('explosion', explosion);
}
