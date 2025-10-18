/**
 * Advanced Particle Engine
 * Handles particle physics, rendering, and management
 */

class ParticleEngine {
    constructor() {
        this.particles = [];
        this.emitters = [];
        this.forces = [];
        this.maxParticles = 10000;
        this.physics = {
            enabled: true,
            gravity: { x: 0, y: 0.05 },
            friction: 0.99,
            bounce: 0.8,
            wind: { x: 0, y: 0 }
        };
        this.bounds = { x: 0, y: 0, width: 320, height: 240 };
    }

    createParticle(config) {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift(); // Remove oldest particle
        }

        const particle = {
            x: config.x || 0,
            y: config.y || 0,
            vx: config.vx || 0,
            vy: config.vy || 0,
            ax: config.ax || 0,
            ay: config.ay || 0,
            life: config.life || 60,
            maxLife: config.maxLife || 60,
            size: config.size || 1,
            sizeVelocity: config.sizeVelocity || 0,
            color: config.color || '#FFFFFF',
            alpha: config.alpha !== undefined ? config.alpha : 1,
            alphaDecay: config.alphaDecay || 0,
            rotation: config.rotation || 0,
            rotationSpeed: config.rotationSpeed || 0,
            mass: config.mass || 1,
            type: config.type || 'circle',
            blendMode: config.blendMode || 'source-over',
            texture: config.texture || null,
            customData: config.customData || {},
            behaviors: config.behaviors || []
        };

        this.particles.push(particle);
        return particle;
    }

    addEmitter(emitter) {
        this.emitters.push(emitter);
    }

    addForce(force) {
        this.forces.push(force);
    }

    update(deltaTime = 1) {
        // Update emitters
        for (const emitter of this.emitters) {
            if (emitter.active) {
                emitter.update(this, deltaTime);
            }
        }

        // Apply forces and update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Apply forces
            for (const force of this.forces) {
                force.apply(p);
            }

            // Apply physics
            if (this.physics.enabled) {
                p.ax += this.physics.gravity.x + this.physics.wind.x;
                p.ay += this.physics.gravity.y + this.physics.wind.y;
                
                p.vx += p.ax * deltaTime;
                p.vy += p.ay * deltaTime;
                
                p.vx *= this.physics.friction;
                p.vy *= this.physics.friction;
                
                p.ax = 0;
                p.ay = 0;
            }

            // Update position
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;

            // Update rotation
            p.rotation += p.rotationSpeed * deltaTime;

            // Update size
            p.size += p.sizeVelocity * deltaTime;
            if (p.size < 0) p.size = 0;

            // Update alpha
            p.alpha -= p.alphaDecay * deltaTime;
            if (p.alpha < 0) p.alpha = 0;

            // Apply behaviors
            for (const behavior of p.behaviors) {
                behavior(p, deltaTime);
            }

            // Boundary collision
            if (this.physics.enabled && this.physics.bounce > 0) {
                if (p.x < 0 || p.x > this.bounds.width) {
                    p.vx *= -this.physics.bounce;
                    p.x = Math.max(0, Math.min(this.bounds.width, p.x));
                }
                if (p.y < 0 || p.y > this.bounds.height) {
                    p.vy *= -this.physics.bounce;
                    p.y = Math.max(0, Math.min(this.bounds.height, p.y));
                }
            }

            // Update life
            p.life -= deltaTime;

            // Remove dead particles
            if (p.life <= 0 || p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    render(ctx, options = {}) {
        const { 
            useBlendMode = true, 
            pixelated = true,
            debug = false 
        } = options;

        for (const p of this.particles) {
            ctx.save();

            // Set blend mode
            if (useBlendMode) {
                ctx.globalCompositeOperation = p.blendMode;
            }

            // Set alpha
            ctx.globalAlpha = p.alpha * (p.life / p.maxLife);

            // Translate to particle position
            ctx.translate(Math.floor(p.x), Math.floor(p.y));

            // Rotate
            if (p.rotation !== 0) {
                ctx.rotate(p.rotation);
            }

            // Set color
            ctx.fillStyle = p.color;
            ctx.strokeStyle = p.color;

            // Render based on type
            switch (p.type) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;

                case 'square':
                    const half = p.size / 2;
                    ctx.fillRect(-half, -half, p.size, p.size);
                    break;

                case 'pixel':
                    ctx.fillRect(0, 0, Math.max(1, Math.floor(p.size)), Math.max(1, Math.floor(p.size)));
                    break;

                case 'line':
                    ctx.lineWidth = Math.max(1, p.size);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(p.customData.lineLength || 5, 0);
                    ctx.stroke();
                    break;

                case 'star':
                    this.drawStar(ctx, 0, 0, 5, p.size, p.size / 2);
                    break;

                case 'triangle':
                    this.drawTriangle(ctx, 0, 0, p.size);
                    break;

                case 'ring':
                    ctx.lineWidth = Math.max(1, p.size / 4);
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    ctx.stroke();
                    break;

                case 'image':
                    if (p.texture) {
                        ctx.drawImage(p.texture, -p.size/2, -p.size/2, p.size, p.size);
                    }
                    break;

                default:
                    ctx.fillRect(-1, -1, 2, 2);
            }

            // Debug mode
            if (debug) {
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.5;
                ctx.beginPath();
                ctx.arc(0, 0, p.size + 2, 0, Math.PI * 2);
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }

        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }

    drawTriangle(ctx, cx, cy, size) {
        ctx.beginPath();
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx + size, cy + size);
        ctx.lineTo(cx - size, cy + size);
        ctx.closePath();
        ctx.fill();
    }

    clear() {
        this.particles = [];
    }

    getParticleCount() {
        return this.particles.length;
    }

    setBounds(width, height) {
        this.bounds.width = width;
        this.bounds.height = height;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleEngine;
}
