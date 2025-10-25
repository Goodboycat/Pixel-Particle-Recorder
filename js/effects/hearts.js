/**
 * Hearts Effect
 */
function hearts(engine, x, y) {
    const colors = ['#FF69B4', '#FF1493', '#FFB7C5'];
    
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random();
        
        engine.createParticle({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1,
            size: 3,
            life: 60,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: 'circle'
        });
    }
}

// Auto-register effect
if (typeof effectLoader !== 'undefined') {
    effectLoader.registerEffect('hearts', hearts);
}
