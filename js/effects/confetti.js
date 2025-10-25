/**
 * Confetti Effect
 */
function confetti(engine, x, y) {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 2;
        
        engine.createParticle({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2,
            size: 2 + Math.random(),
            life: 60,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: 'square'
        });
    }
}

// Auto-register effect
if (typeof effectLoader !== 'undefined') {
    effectLoader.registerEffect('confetti', confetti);
}
