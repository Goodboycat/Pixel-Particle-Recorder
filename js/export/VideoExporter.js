/**
 * Video Export System
 * Export animations as WebM, GIF, or MP4
 */

class VideoExporter {
    constructor(canvas) {
        this.canvas = canvas;
        this.recording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.stream = null;
    }

    // Start recording WebM video
    startWebMRecording(options = {}) {
        const {
            videoBitsPerSecond = 2500000,
            mimeType = 'video/webm;codecs=vp9'
        } = options;

        try {
            // Get canvas stream
            this.stream = this.canvas.captureStream(60); // 60 FPS
            
            // Create media recorder
            this.mediaRecorder = new MediaRecorder(this.stream, {
                mimeType: mimeType,
                videoBitsPerSecond: videoBitsPerSecond
            });

            this.recordedChunks = [];

            // Handle data available
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };

            // Handle stop
            this.mediaRecorder.onstop = () => {
                this.downloadWebM();
            };

            this.mediaRecorder.start();
            this.recording = true;

            console.log('🎥 Started WebM recording');
            return true;
        } catch (error) {
            console.error('Failed to start recording:', error);
            return false;
        }
    }

    stopWebMRecording() {
        if (this.mediaRecorder && this.recording) {
            this.mediaRecorder.stop();
            this.recording = false;
            console.log('⏹️ Stopped WebM recording');
            
            // Stop all tracks
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
        }
    }

    downloadWebM() {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `particle-animation-${Date.now()}.webm`;
        link.click();
        
        URL.revokeObjectURL(url);
        console.log('✅ WebM video downloaded');
    }

    // Export as GIF using frames
    async exportGIF(frames, options = {}) {
        const {
            fps = 30,
            quality = 10,
            width = this.canvas.width,
            height = this.canvas.height
        } = options;

        console.log('🎬 Starting GIF export...');
        console.log(`Frames: ${frames.length}, FPS: ${fps}`);

        // We would need a GIF encoder library like gif.js
        // For now, provide instructions to user
        alert(`GIF Export:\n\nTo export as GIF, you need to:\n1. Install gif.js library\n2. Use the ${frames.length} recorded frames\n3. Set FPS to ${fps}\n\nFrames are ready in memory!`);
        
        return {
            success: false,
            message: 'GIF export requires gif.js library',
            frames: frames
        };
    }

    // Export sprite sheet
    exportSpriteSheet(frames, options = {}) {
        const {
            columns = 8,
            padding = 2,
            backgroundColor = 'transparent'
        } = options;

        if (frames.length === 0) {
            console.warn('No frames to export');
            return;
        }

        const frameWidth = this.canvas.width;
        const frameHeight = this.canvas.height;
        const rows = Math.ceil(frames.length / columns);

        // Create sprite sheet canvas
        const sheetCanvas = document.createElement('canvas');
        sheetCanvas.width = (frameWidth + padding) * columns;
        sheetCanvas.height = (frameHeight + padding) * rows;
        const ctx = sheetCanvas.getContext('2d');

        // Fill background
        if (backgroundColor !== 'transparent') {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);
        }

        // Load and draw each frame
        let loadedCount = 0;
        const promises = frames.map((frameDataURL, index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    const col = index % columns;
                    const row = Math.floor(index / columns);
                    const x = col * (frameWidth + padding);
                    const y = row * (frameHeight + padding);
                    
                    ctx.drawImage(img, x, y, frameWidth, frameHeight);
                    loadedCount++;
                    resolve();
                };
                img.src = frameDataURL;
            });
        });

        Promise.all(promises).then(() => {
            // Download sprite sheet
            const link = document.createElement('a');
            link.download = `sprite-sheet-${Date.now()}.png`;
            link.href = sheetCanvas.toDataURL('image/png');
            link.click();
            
            console.log(`✅ Sprite sheet exported (${columns}x${rows}, ${frames.length} frames)`);
        });
    }

    // Export individual frames as ZIP
    async exportFramesAsZip(frames) {
        console.log('📦 Preparing frames for ZIP export...');
        
        // Would need JSZip library for this
        alert(`Frame Export:\n\nTo export frames as ZIP, you need JSZip library.\n\nReady to export ${frames.length} frames!`);
        
        return {
            success: false,
            message: 'ZIP export requires JSZip library',
            frameCount: frames.length
        };
    }

    // Create image sequence for video editing software
    downloadFrameSequence(frames) {
        frames.forEach((frameDataURL, index) => {
            const link = document.createElement('a');
            const paddedIndex = String(index).padStart(4, '0');
            link.download = `frame-${paddedIndex}.png`;
            link.href = frameDataURL;
            
            // Delay downloads to avoid browser blocking
            setTimeout(() => {
                link.click();
            }, index * 100);
        });
        
        console.log(`✅ Started downloading ${frames.length} frames`);
    }

    // Generate thumbnail from current canvas
    generateThumbnail(width = 320, height = 240) {
        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.width = width;
        thumbCanvas.height = height;
        const ctx = thumbCanvas.getContext('2d');
        
        ctx.drawImage(this.canvas, 0, 0, width, height);
        return thumbCanvas.toDataURL('image/png');
    }

    // Get recording status
    isRecording() {
        return this.recording;
    }

    // Get supported formats
    static getSupportedFormats() {
        const formats = {
            webm: false,
            mp4: false,
            gif: false
        };

        if (typeof MediaRecorder !== 'undefined') {
            formats.webm = MediaRecorder.isTypeSupported('video/webm');
            formats.mp4 = MediaRecorder.isTypeSupported('video/mp4');
        }

        // GIF requires external library
        formats.gif = typeof GIF !== 'undefined';

        return formats;
    }
}

// Frame Recorder for capturing individual frames
class FrameRecorder {
    constructor(canvas) {
        this.canvas = canvas;
        this.frames = [];
        this.recording = false;
        this.fps = 30;
        this.frameCount = 0;
        this.lastCaptureTime = 0;
    }

    start(fps = 30) {
        this.frames = [];
        this.recording = true;
        this.fps = fps;
        this.frameCount = 0;
        this.lastCaptureTime = performance.now();
        console.log(`📹 Started frame recording at ${fps} FPS`);
    }

    stop() {
        this.recording = false;
        console.log(`⏹️ Stopped frame recording (${this.frames.length} frames captured)`);
        return this.frames;
    }

    captureFrame(currentTime) {
        if (!this.recording) return;

        const frameDuration = 1000 / this.fps;
        if (currentTime - this.lastCaptureTime >= frameDuration) {
            const frameData = this.canvas.toDataURL('image/png');
            this.frames.push({
                data: frameData,
                timestamp: currentTime,
                frameNumber: this.frameCount
            });
            
            this.frameCount++;
            this.lastCaptureTime = currentTime;
        }
    }

    getFrames() {
        return this.frames;
    }

    getFrameCount() {
        return this.frames.length;
    }

    clear() {
        this.frames = [];
        this.frameCount = 0;
    }

    isRecording() {
        return this.recording;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VideoExporter, FrameRecorder };
}
