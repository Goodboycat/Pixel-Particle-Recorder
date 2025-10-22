/**
 * Particle Emitter - Simplified
 */

class ParticleEmitter {
    constructor(x, y, config = {}) {
        this.x = x;
        this.y = y;
        this.active = true;
        this.rate = config.rate || 10;
        this.counter = 0;
        this.config = {
            speed: config.speed || 2,
            size: config.size || 2,
            life: config.life || 60,
            colors: config.colors || ['#FFFFFF'],
            angle: config.angle || 0,
            spread: config.spread || Math.PI * 2,
            ...config
        };
    }

    update(engine, deltaTime = 1) {
        this.counter += this.rate * deltaTime * 0.1;

        while (this.counter >= 1) {
            const angle = this.config.angle + (Math.random() - 0.5) * this.config.spread;
            const speed = this.config.speed * (0.5 + Math.random() * 0.5);

            engine.createParticle({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: this.config.size + Math.random() * 2,
                life: this.config.life + Math.random() * 20,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
                type: this.config.type || 'circle'
            });

            this.counter--;
        }
    }
}

// Preset Emitters
const EmitterPresets = {
    fire: {
        rate: 15,
        speed: 1.5,
        angle: -Math.PI / 2,
        spread: 0.5,
        size: 3,
        life: 40,
        colors: ['#FF4500', '#FF6347', '#FFA500', '#FFFF00']
    },
    
    smoke: {
        rate: 8,
        speed: 0.5,
        angle: -Math.PI / 2,
        spread: 0.3,
        size: 4,
        life: 80,
        colors: ['#444444', '#666666', '#888888']
    },
    
    sparkles: {
        rate: 12,
        speed: 2,
        spread: Math.PI * 2,
        size: 2,
        life: 40,
        colors: ['#FFFFFF', '#FFFACD', '#FFD700']
    },

    fountain: {
        rate: 20,
        speed: 4,
        angle: -Math.PI / 2,
        spread: 0.6,
        size: 2,
        life: 50,
        colors: ['#00BFFF', '#1E90FF', '#4169E1']
    }
};
