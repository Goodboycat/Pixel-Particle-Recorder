/**
 * Main Application - Particle Animation Studio
 */

class ParticleApp {
    constructor() {
        // Setup canvas
        this.canvas = document.getElementById('mainCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 640;
        this.height = 480;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Initialize systems
        this.engine = new ParticleEngine();
        this.engine.bounds = { width: this.width, height: this.height };
        this.effects = new ParticleEffects(this.engine);
        this.ui = new UIControls('controlPanel');

        // State
        this.fps = 60;
        this.lastTime = performance.now();
        this.frameCount = 0;

        // Setup UI and events
        this.setupUI();
        this.setupEvents();

        // Start
        this.loop();
        console.log('✨ Particle Animation Studio ready!');
    }

    setupUI() {
        // Effects section
        const effectsSection = this.ui.createSection('🎆 Effects');
        this.ui.addButton(effectsSection, '💥 Explosion', () => this.triggerEffect('explosion'));
        this.ui.addButton(effectsSection, '🎆 Fireworks', () => this.triggerEffect('fireworks'));
        this.ui.addButton(effectsSection, '🌀 Spiral', () => this.triggerEffect('spiral'));
        this.ui.addButton(effectsSection, '🌪️ Vortex', () => this.triggerEffect('vortex'));
        this.ui.addButton(effectsSection, '⚡ Lightning', () => this.triggerEffect('lightning'));
        this.ui.addButton(effectsSection, '❄️ Snow', () => this.triggerEffect('snow'));
        this.ui.addButton(effectsSection, '💖 Hearts', () => this.triggerEffect('hearts'));
        this.ui.addButton(effectsSection, '🎊 Confetti', () => this.triggerEffect('confetti'));

        // Emitters section
        const emittersSection = this.ui.createSection('🔄 Emitters');
        this.ui.addButton(emittersSection, '🔥 Fire', () => this.addEmitter('fire'));
        this.ui.addButton(emittersSection, '💨 Smoke', () => this.addEmitter('smoke'));
        this.ui.addButton(emittersSection, '✨ Sparkles', () => this.addEmitter('sparkles'));
        this.ui.addButton(emittersSection, '⛲ Fountain', () => this.addEmitter('fountain'));
        this.ui.addButton(emittersSection, '🗑️ Clear Emitters', () => {
            this.engine.emitters = [];
        });

        // Physics section
        const physicsSection = this.ui.createSection('⚙️ Physics');
        this.ui.addSlider(physicsSection, 'Gravity', 'gravity', -0.2, 0.2, 0.05, (val) => {
            this.engine.gravity.y = val;
        });
        this.ui.addSlider(physicsSection, 'Wind', 'wind', -0.2, 0.2, 0, (val) => {
            this.engine.wind.x = val;
        });
        this.ui.addSlider(physicsSection, 'Friction', 'friction', 0.8, 1, 0.99, (val) => {
            this.engine.friction = val;
        });
    }

    setupEvents() {
        // Canvas click
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.effects.explosion(x, y);
        });

        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportPNG();
        });

        // Clear button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.engine.clear();
        });
    }

    triggerEffect(type) {
        const x = this.width / 2;
        const y = this.height / 2;
        
        if (typeof this.effects[type] === 'function') {
            this.effects[type](x, y);
        }
    }

    addEmitter(preset) {
        const config = EmitterPresets[preset];
        if (config) {
            const emitter = new ParticleEmitter(
                this.width / 2,
                this.height / 2,
                config
            );
            this.engine.addEmitter(emitter);
        }
    }

    exportPNG() {
        const link = document.createElement('a');
        link.download = `particles-${Date.now()}.png`;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
        console.log('✅ PNG exported');
    }

    loop() {
        const currentTime = performance.now();
        const deltaTime = Math.min((currentTime - this.lastTime) / 16.67, 2);
        this.lastTime = currentTime;

        // Clear
        this.ctx.fillStyle = 'rgba(10, 10, 26, 0.15)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update and render
        this.engine.update(deltaTime);
        this.engine.render(this.ctx);

        // Update stats
        this.frameCount++;
        if (this.frameCount % 30 === 0) {
            document.getElementById('fps').textContent = Math.round(this.fps);
            document.getElementById('particleCount').textContent = this.engine.getParticleCount();
        }

        requestAnimationFrame(() => this.loop());
    }
}

// Start app when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.app = new ParticleApp();
});
