/**
 * Core Particle Engine - Simplified and Working
 */

class ParticleEngine {
    constructor() {
        this.particles = [];
        this.emitters = [];
        this.maxParticles = 5000;
        
        // Physics settings
        this.gravity = { x: 0, y: 0.05 };
        this.wind = { x: 0, y: 0 };
        this.friction = 0.99;
        this.bounds = { width: 640, height: 480 };
    }

    createParticle(config) {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift();
        }

        this.particles.push({
            x: config.x || 0,
            y: config.y || 0,
            vx: config.vx || 0,
            vy: config.vy || 0,
            size: config.size || 2,
            life: config.life || 60,
            maxLife: config.life || 60,
            color: config.color || '#FFFFFF',
            alpha: 1,
            type: config.type || 'circle'
        });
    }

    update(deltaTime = 1) {
        // Update emitters
        for (const emitter of this.emitters) {
            if (emitter.active) {
                emitter.update(this, deltaTime);
            }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Apply physics
            p.vx += this.gravity.x + this.wind.x;
            p.vy += this.gravity.y + this.wind.y;
            p.vx *= this.friction;
            p.vy *= this.friction;

            // Update position
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;

            // Update life
            p.life -= deltaTime;
            p.alpha = p.life / p.maxLife;

            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    render(ctx) {
        for (const p of this.particles) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;

            if (p.type === 'circle') {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
            }

            ctx.restore();
        }
    }

    addEmitter(emitter) {
        this.emitters.push(emitter);
    }

    clear() {
        this.particles = [];
        this.emitters = [];
    }

    getParticleCount() {
        return this.particles.length;
    }
}
