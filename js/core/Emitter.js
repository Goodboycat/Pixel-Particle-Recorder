/**
 * Particle Emitter System
 * Creates and manages particle emission patterns
 */

class ParticleEmitter {
    constructor(x, y, config = {}) {
        this.x = x;
        this.y = y;
        this.active = true;
        this.config = {
            rate: config.rate || 10, // particles per update
            rateVariance: config.rateVariance || 0,
            lifetime: config.lifetime || Infinity,
            angle: config.angle || 0,
            angleVariance: config.angleVariance || Math.PI * 2,
            speed: config.speed || 1,
            speedVariance: config.speedVariance || 0.5,
            size: config.size || 2,
            sizeVariance: config.sizeVariance || 1,
            life: config.life || 60,
            lifeVariance: config.lifeVariance || 20,
            colors: config.colors || ['#FFFFFF'],
            alpha: config.alpha || 1,
            alphaDecay: config.alphaDecay || 0.01,
            type: config.type || 'pixel',
            blendMode: config.blendMode || 'source-over',
            emissionShape: config.emissionShape || 'point', // point, circle, rectangle, line
            shapeSize: config.shapeSize || 10,
            burst: config.burst || false,
            burstCount: config.burstCount || 50,
            ...config
        };
        this.age = 0;
        this.emitCounter = 0;
    }

    update(particleEngine, deltaTime = 1) {
        this.age += deltaTime;

        // Check lifetime
        if (this.age >= this.config.lifetime) {
            this.active = false;
            return;
        }

        // Burst emission
        if (this.config.burst) {
            for (let i = 0; i < this.config.burstCount; i++) {
                this.emitParticle(particleEngine);
            }
            this.active = false;
            return;
        }

        // Continuous emission
        const rate = this.config.rate + (Math.random() - 0.5) * this.config.rateVariance;
        this.emitCounter += rate * deltaTime;

        while (this.emitCounter >= 1) {
            this.emitParticle(particleEngine);
            this.emitCounter--;
        }
    }

    emitParticle(particleEngine) {
        // Calculate emission position based on shape
        let emitX = this.x;
        let emitY = this.y;

        switch (this.config.emissionShape) {
            case 'circle':
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * this.config.shapeSize;
                emitX += Math.cos(angle) * radius;
                emitY += Math.sin(angle) * radius;
                break;

            case 'rectangle':
                emitX += (Math.random() - 0.5) * this.config.shapeSize;
                emitY += (Math.random() - 0.5) * this.config.shapeSize;
                break;

            case 'line':
                emitX += (Math.random() - 0.5) * this.config.shapeSize;
                break;

            case 'ring':
                const ringAngle = Math.random() * Math.PI * 2;
                emitX += Math.cos(ringAngle) * this.config.shapeSize;
                emitY += Math.sin(ringAngle) * this.config.shapeSize;
                break;
        }

        // Calculate velocity
        const particleAngle = this.config.angle + (Math.random() - 0.5) * this.config.angleVariance;
        const speed = this.config.speed + (Math.random() - 0.5) * this.config.speedVariance;
        
        const vx = Math.cos(particleAngle) * speed;
        const vy = Math.sin(particleAngle) * speed;

        // Calculate size
        const size = Math.max(0.5, this.config.size + (Math.random() - 0.5) * this.config.sizeVariance);

        // Calculate life
        const life = Math.max(1, this.config.life + (Math.random() - 0.5) * this.config.lifeVariance);

        // Select color
        const color = this.config.colors[Math.floor(Math.random() * this.config.colors.length)];

        // Create particle
        particleEngine.createParticle({
            x: emitX,
            y: emitY,
            vx: vx,
            vy: vy,
            size: size,
            life: life,
            maxLife: life,
            color: color,
            alpha: this.config.alpha,
            alphaDecay: this.config.alphaDecay,
            type: this.config.type,
            blendMode: this.config.blendMode,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: this.config.rotationSpeed || 0,
            customData: this.config.customData || {},
            behaviors: this.config.behaviors || []
        });
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    stop() {
        this.active = false;
    }

    restart() {
        this.active = true;
        this.age = 0;
        this.emitCounter = 0;
    }
}

// Preset emitter configurations
const EmitterPresets = {
    fire: {
        rate: 20,
        angle: -Math.PI / 2,
        angleVariance: 0.5,
        speed: 1.5,
        speedVariance: 0.5,
        size: 3,
        sizeVariance: 1,
        life: 40,
        lifeVariance: 15,
        colors: ['#FF4500', '#FF6347', '#FFA500', '#FFFF00'],
        alphaDecay: 0.02,
        type: 'pixel',
        blendMode: 'lighter',
        emissionShape: 'line',
        shapeSize: 10
    },

    smoke: {
        rate: 8,
        angle: -Math.PI / 2,
        angleVariance: 0.3,
        speed: 0.5,
        speedVariance: 0.2,
        size: 4,
        sizeVariance: 2,
        life: 80,
        lifeVariance: 20,
        colors: ['#222222', '#444444', '#666666', '#888888'],
        alpha: 0.6,
        alphaDecay: 0.008,
        type: 'circle',
        emissionShape: 'circle',
        shapeSize: 5
    },

    sparkle: {
        rate: 15,
        angle: 0,
        angleVariance: Math.PI * 2,
        speed: 2,
        speedVariance: 1,
        size: 2,
        sizeVariance: 1,
        life: 30,
        lifeVariance: 10,
        colors: ['#FFFFFF', '#FFFACD', '#FFD700'],
        alphaDecay: 0.03,
        type: 'star',
        blendMode: 'lighter',
        emissionShape: 'point'
    },

    rain: {
        rate: 30,
        angle: Math.PI / 2,
        angleVariance: 0.1,
        speed: 3,
        speedVariance: 0.5,
        size: 1,
        sizeVariance: 0.5,
        life: 60,
        lifeVariance: 10,
        colors: ['#4DA6FF', '#66B2FF', '#80BFFF'],
        type: 'line',
        emissionShape: 'line',
        shapeSize: 100,
        customData: { lineLength: 3 }
    },

    snow: {
        rate: 20,
        angle: Math.PI / 2,
        angleVariance: 0.2,
        speed: 0.5,
        speedVariance: 0.3,
        size: 2,
        sizeVariance: 1,
        life: 120,
        lifeVariance: 30,
        colors: ['#FFFFFF', '#F0F8FF'],
        type: 'circle',
        emissionShape: 'line',
        shapeSize: 100,
        behaviors: [
            (p, dt) => {
                p.x += Math.sin(p.y * 0.1) * 0.5 * dt;
            }
        ]
    },

    explosion: {
        burst: true,
        burstCount: 100,
        angle: 0,
        angleVariance: Math.PI * 2,
        speed: 3,
        speedVariance: 2,
        size: 2,
        sizeVariance: 1,
        life: 40,
        lifeVariance: 15,
        colors: ['#FF4500', '#FF0000', '#FFA500', '#FFFF00', '#FFFFFF'],
        alphaDecay: 0.025,
        type: 'pixel',
        blendMode: 'lighter'
    },

    fountain: {
        rate: 25,
        angle: -Math.PI / 2,
        angleVariance: 0.8,
        speed: 5,
        speedVariance: 2,
        size: 2,
        sizeVariance: 1,
        life: 60,
        lifeVariance: 20,
        colors: ['#00BFFF', '#1E90FF', '#4169E1', '#0000FF'],
        alphaDecay: 0.015,
        type: 'circle',
        blendMode: 'source-over',
        emissionShape: 'point'
    },

    magic: {
        rate: 12,
        angle: 0,
        angleVariance: Math.PI * 2,
        speed: 1,
        speedVariance: 0.5,
        size: 3,
        sizeVariance: 1,
        life: 50,
        lifeVariance: 20,
        colors: ['#9932CC', '#8A2BE2', '#FF00FF', '#FFFFFF'],
        alphaDecay: 0.02,
        type: 'star',
        blendMode: 'lighter',
        emissionShape: 'circle',
        shapeSize: 8,
        rotationSpeed: 0.1
    },

    laser: {
        rate: 50,
        angle: 0,
        angleVariance: 0.1,
        speed: 8,
        speedVariance: 1,
        size: 2,
        sizeVariance: 0.5,
        life: 20,
        lifeVariance: 5,
        colors: ['#FF0000', '#FF6666', '#FFCCCC'],
        alphaDecay: 0.05,
        type: 'line',
        blendMode: 'lighter',
        emissionShape: 'line',
        shapeSize: 2,
        customData: { lineLength: 5 }
    },

    bubbles: {
        rate: 10,
        angle: -Math.PI / 2,
        angleVariance: 0.3,
        speed: 1,
        speedVariance: 0.5,
        size: 4,
        sizeVariance: 2,
        life: 100,
        lifeVariance: 30,
        colors: ['#87CEEB', '#B0E0E6', '#ADD8E6'],
        alpha: 0.5,
        alphaDecay: 0.005,
        type: 'ring',
        emissionShape: 'line',
        shapeSize: 20,
        behaviors: [
            (p, dt) => {
                p.x += Math.sin(p.age * 0.1) * 0.3 * dt;
                p.age = (p.age || 0) + dt;
            }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ParticleEmitter, EmitterPresets };
}
