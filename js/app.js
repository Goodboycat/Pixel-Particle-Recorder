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
        this.ui = new UIControls('controlPanel');
        this.recorder = new ParticleRecorder(this.canvas);
        
        // Setup effect loader
        effectLoader.setEngine(this.engine);

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
        // Recorder section
        const recorderSection = this.ui.createSection('🎬 Recorder');
        this.recordBtn = this.ui.addButton(recorderSection, '🔴 Start Recording', () => this.toggleRecording());
        this.ui.addButton(recorderSection, '💾 Save Sprite Sheet', () => this.saveSprite());
        
        // Effects section - Dynamically load from effectLoader
        const effectsSection = this.ui.createSection('🎆 Effects');
        
        // Continuous mode toggle
        this.ui.addCheckbox(effectsSection, '🔁 Continuous Mode', 'continuousMode', false, (checked) => {
            continuousMode.setEnabled(checked);
        });
        
        // Add clear continuous effects button
        this.ui.addButton(effectsSection, '⏹️ Stop All Continuous', () => {
            continuousMode.clearAll();
        });
        
        // Dynamic effect buttons
        const effectNames = effectLoader.getEffectNames();
        effectNames.forEach(effectName => {
            const icon = effectLoader.getIcon(effectName);
            const displayName = effectLoader.getDisplayName(effectName);
            this.ui.addButton(effectsSection, `${icon} ${displayName}`, () => this.triggerEffect(effectName));
        });

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
            effectLoader.runEffect('explosion', x, y);
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

    triggerEffect(effectName) {
        const x = this.width / 2;
        const y = this.height / 2;
        continuousMode.startEffect(effectName, x, y);
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

    toggleRecording() {
        if (this.recorder.isRecording) {
            this.recorder.stop();
            this.recordBtn.textContent = '🔴 Start Recording';
            this.recordBtn.classList.remove('recording');
        } else {
            this.recorder.start();
            this.recordBtn.textContent = '⏹️ Stop Recording';
            this.recordBtn.classList.add('recording');
        }
    }

    saveSprite() {
        this.recorder.exportSpriteSheet();
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

        // Capture frame if recording
        this.recorder.captureFrame(currentTime);

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
