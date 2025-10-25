/**
 * Recorder System - Captures frames and generates sprite sheets
 */

class ParticleRecorder {
    constructor(canvas) {
        this.canvas = canvas;
        this.isRecording = false;
        this.frames = [];
        this.frameInterval = 1000 / 30; // 30 FPS
        this.lastFrameTime = 0;
    }

    start() {
        this.isRecording = true;
        this.frames = [];
        this.lastFrameTime = performance.now();
        console.log('🔴 Recording started');
    }

    stop() {
        this.isRecording = false;
        console.log(`⏹️ Recording stopped - ${this.frames.length} frames captured`);
    }

    captureFrame(currentTime) {
        if (!this.isRecording) return;

        // Capture at specified frame rate
        if (currentTime - this.lastFrameTime >= this.frameInterval) {
            const imageData = this.canvas.toDataURL('image/png');
            this.frames.push(imageData);
            this.lastFrameTime = currentTime;
        }
    }

    async exportSpriteSheet() {
        if (this.frames.length === 0) {
            console.warn('⚠️ No frames to export');
            return;
        }

        console.log(`📦 Generating sprite sheet from ${this.frames.length} frames...`);

        // Load all frames as images
        const images = await Promise.all(
            this.frames.map(dataUrl => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.src = dataUrl;
                });
            })
        );

        // Calculate sprite sheet dimensions
        const frameWidth = this.canvas.width;
        const frameHeight = this.canvas.height;
        const columns = Math.ceil(Math.sqrt(this.frames.length));
        const rows = Math.ceil(this.frames.length / columns);

        // Create sprite sheet canvas
        const spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = frameWidth * columns;
        spriteCanvas.height = frameHeight * rows;
        const ctx = spriteCanvas.getContext('2d');

        // Fill with transparent background
        ctx.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);

        // Draw each frame
        images.forEach((img, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);
            const x = col * frameWidth;
            const y = row * frameHeight;
            ctx.drawImage(img, x, y, frameWidth, frameHeight);
        });

        // Download sprite sheet
        const link = document.createElement('a');
        link.download = `particle-sprite-${Date.now()}.png`;
        link.href = spriteCanvas.toDataURL('image/png');
        link.click();

        console.log(`✅ Sprite sheet exported: ${columns}x${rows} grid, ${this.frames.length} frames`);
    }

    getFrameCount() {
        return this.frames.length;
    }

    clear() {
        this.frames = [];
        this.isRecording = false;
    }
}
