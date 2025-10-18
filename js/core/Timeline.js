/**
 * Timeline Animation System
 * Keyframe-based animation control
 */

class Timeline {
    constructor() {
        this.keyframes = [];
        this.duration = 10000; // 10 seconds in ms
        this.currentTime = 0;
        this.isPlaying = false;
        this.loop = false;
        this.fps = 60;
        this.onUpdate = null;
        this.onKeyframe = null;
    }

    addKeyframe(time, data) {
        const keyframe = {
            time: time,
            data: data,
            id: `keyframe-${Date.now()}-${Math.random()}`
        };
        
        this.keyframes.push(keyframe);
        this.keyframes.sort((a, b) => a.time - b.time);
        
        return keyframe.id;
    }

    removeKeyframe(id) {
        const index = this.keyframes.findIndex(k => k.id === id);
        if (index !== -1) {
            this.keyframes.splice(index, 1);
            return true;
        }
        return false;
    }

    updateKeyframe(id, newData) {
        const keyframe = this.keyframes.find(k => k.id === id);
        if (keyframe) {
            keyframe.data = { ...keyframe.data, ...newData };
            return true;
        }
        return false;
    }

    getKeyframe(id) {
        return this.keyframes.find(k => k.id === id);
    }

    getAllKeyframes() {
        return [...this.keyframes];
    }

    play() {
        this.isPlaying = true;
    }

    pause() {
        this.isPlaying = false;
    }

    stop() {
        this.isPlaying = false;
        this.currentTime = 0;
    }

    seek(time) {
        this.currentTime = Math.max(0, Math.min(this.duration, time));
    }

    update(deltaTime) {
        if (!this.isPlaying) return;

        this.currentTime += deltaTime;

        // Handle looping
        if (this.currentTime >= this.duration) {
            if (this.loop) {
                this.currentTime = 0;
            } else {
                this.currentTime = this.duration;
                this.isPlaying = false;
            }
        }

        // Trigger keyframes
        this.keyframes.forEach(keyframe => {
            const timeDiff = this.currentTime - keyframe.time;
            if (timeDiff >= 0 && timeDiff < deltaTime * 2) {
                if (this.onKeyframe) {
                    this.onKeyframe(keyframe);
                }
            }
        });

        // Interpolate between keyframes
        const interpolatedData = this.interpolate(this.currentTime);
        if (this.onUpdate && interpolatedData) {
            this.onUpdate(interpolatedData);
        }
    }

    interpolate(time) {
        if (this.keyframes.length === 0) return null;

        // Find surrounding keyframes
        let prevKeyframe = null;
        let nextKeyframe = null;

        for (let i = 0; i < this.keyframes.length; i++) {
            if (this.keyframes[i].time <= time) {
                prevKeyframe = this.keyframes[i];
            }
            if (this.keyframes[i].time >= time && !nextKeyframe) {
                nextKeyframe = this.keyframes[i];
                break;
            }
        }

        // No interpolation needed
        if (!prevKeyframe) return nextKeyframe?.data || null;
        if (!nextKeyframe) return prevKeyframe.data;
        if (prevKeyframe === nextKeyframe) return prevKeyframe.data;

        // Calculate interpolation factor
        const totalTime = nextKeyframe.time - prevKeyframe.time;
        const elapsedTime = time - prevKeyframe.time;
        const t = totalTime > 0 ? elapsedTime / totalTime : 0;

        // Interpolate data
        return this.interpolateData(prevKeyframe.data, nextKeyframe.data, t);
    }

    interpolateData(data1, data2, t) {
        const result = {};

        const keys = new Set([...Object.keys(data1), ...Object.keys(data2)]);

        keys.forEach(key => {
            const val1 = data1[key];
            const val2 = data2[key];

            if (typeof val1 === 'number' && typeof val2 === 'number') {
                // Numeric interpolation
                result[key] = val1 + (val2 - val1) * this.easeInOutCubic(t);
            } else if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
                // Object interpolation (for vectors, colors, etc.)
                result[key] = this.interpolateData(val1, val2, t);
            } else if (typeof val1 === 'string' && typeof val2 === 'string') {
                // Color interpolation
                if (val1.startsWith('#') && val2.startsWith('#')) {
                    result[key] = this.interpolateColor(val1, val2, t);
                } else {
                    result[key] = t < 0.5 ? val1 : val2;
                }
            } else {
                // Default: switch at midpoint
                result[key] = t < 0.5 ? val1 : val2;
            }
        });

        return result;
    }

    interpolateColor(color1, color2, t) {
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);

        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);

        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Easing functions
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    linear(t) {
        return t;
    }

    // Export/Import
    export() {
        return {
            keyframes: this.keyframes,
            duration: this.duration,
            loop: this.loop,
            fps: this.fps
        };
    }

    import(data) {
        this.keyframes = data.keyframes || [];
        this.duration = data.duration || 10000;
        this.loop = data.loop || false;
        this.fps = data.fps || 60;
        this.currentTime = 0;
        this.isPlaying = false;
    }

    clear() {
        this.keyframes = [];
        this.currentTime = 0;
        this.isPlaying = false;
    }

    getDuration() {
        return this.duration;
    }

    setDuration(duration) {
        this.duration = duration;
    }

    getCurrentTime() {
        return this.currentTime;
    }

    getProgress() {
        return this.duration > 0 ? this.currentTime / this.duration : 0;
    }

    // Record mode - automatically add keyframes
    startRecording() {
        this.recording = true;
        this.recordingStartTime = Date.now();
    }

    stopRecording() {
        this.recording = false;
    }

    recordState(data) {
        if (!this.recording) return;
        const time = Date.now() - this.recordingStartTime;
        this.addKeyframe(time, data);
    }
}

// Timeline track for managing multiple timelines
class TimelineTrack {
    constructor() {
        this.timelines = new Map();
        this.masterTime = 0;
        this.isPlaying = false;
    }

    addTimeline(id, timeline) {
        this.timelines.set(id, timeline);
    }

    removeTimeline(id) {
        return this.timelines.delete(id);
    }

    getTimeline(id) {
        return this.timelines.get(id);
    }

    play() {
        this.isPlaying = true;
        this.timelines.forEach(timeline => timeline.play());
    }

    pause() {
        this.isPlaying = false;
        this.timelines.forEach(timeline => timeline.pause());
    }

    stop() {
        this.isPlaying = false;
        this.masterTime = 0;
        this.timelines.forEach(timeline => timeline.stop());
    }

    update(deltaTime) {
        if (!this.isPlaying) return;
        
        this.masterTime += deltaTime;
        this.timelines.forEach(timeline => timeline.update(deltaTime));
    }

    seek(time) {
        this.masterTime = time;
        this.timelines.forEach(timeline => timeline.seek(time));
    }

    export() {
        const data = {};
        this.timelines.forEach((timeline, id) => {
            data[id] = timeline.export();
        });
        return data;
    }

    import(data) {
        Object.keys(data).forEach(id => {
            const timeline = new Timeline();
            timeline.import(data[id]);
            this.timelines.set(id, timeline);
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Timeline, TimelineTrack };
}
