/**
 * Particle Effects Library - Working Effects Only
 */

class ParticleEffects {
    constructor(engine) {
        this.engine = engine;
    }

    explosion(x, y) {
        const colors = ['#FF4500', '#FF0000', '#FFA500', '#FFFF00', '#FFFFFF'];
        
        for (let i = 0; i < 80; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            
            this.engine.createParticle({
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

    fireworks(x, y) {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Launch trail
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.engine.createParticle({
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
                
                this.engine.createParticle({
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

    spiral(x, y) {
        const colors = ['#FF00FF', '#9400D3', '#4B0082', '#0000FF'];
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const angle = (i / 80) * Math.PI * 8;
                const radius = i * 0.4;
                
                this.engine.createParticle({
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

    vortex(x, y) {
        const colors = ['#00FFFF', '#87CEEB', '#1E90FF', '#4169E1'];
        
        for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 5 + Math.random() * 30;
            
            this.engine.createParticle({
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

    lightning(x, y) {
        const colors = ['#FFFFFF', '#00FFFF', '#87CEFA'];
        
        for (let bolt = 0; bolt < 3; bolt++) {
            let currentX = x;
            let currentY = y;

            for (let i = 0; i < 15; i++) {
                const nextX = currentX + (Math.random() - 0.5) * 15;
                const nextY = currentY + 5;

                for (let j = 0; j < 3; j++) {
                    this.engine.createParticle({
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

    snow(x, y) {
        const colors = ['#FFFFFF', '#F0F8FF', '#F5F5F5'];
        
        for (let i = 0; i < 40; i++) {
            this.engine.createParticle({
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

    hearts(x, y) {
        const colors = ['#FF69B4', '#FF1493', '#FFB7C5'];
        
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random();
            
            this.engine.createParticle({
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

    confetti(x, y) {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        
        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 2;
            
            this.engine.createParticle({
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
}
