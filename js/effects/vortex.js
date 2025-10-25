/**
 * Vortex Effect
 */
function vortex(engine, x, y) {
    const colors = ['#00FFFF', '#87CEEB', '#1E90FF', '#4169E1'];
    
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 30;
        
        engine.createParticle({
            x: x + Math.cos(angle) * radius,
            y: y + Math.sin(angle) * radius,
            vx: -Math.cos(angle) * 1.5,
            vy: -Math.sin(angle) * 1.5,
            size: 1 + Math.random(),
            life: 50,
            color: colors[Math.floor(Math.random() * colors.length)],
            type: 'circle'
        });
    }
}

// Auto-register effect
if (typeof effectLoader !== 'undefined') {
    effectLoader.registerEffect('vortex', vortex);
}
