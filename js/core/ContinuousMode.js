/**
 * Continuous Mode - Makes any effect repeat continuously like emitters
 */

class ContinuousMode {
    constructor() {
        this.enabled = false;
        this.activeEffects = [];
        this.repeatInterval = 1000; // milliseconds between repeats
    }

    setEnabled(enabled) {
        this.enabled = enabled;
        if (!enabled) {
            this.clearAll();
        }
        console.log(`${enabled ? '▶️' : '⏸️'} Continuous mode ${enabled ? 'enabled' : 'disabled'}`);
    }

    isEnabled() {
        return this.enabled;
    }

    /**
     * Start repeating an effect continuously
     * @param {string} effectName - Name of effect
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    startEffect(effectName, x, y) {
        if (!this.enabled) {
            // If continuous mode is off, just run effect once
            effectLoader.runEffect(effectName, x, y);
            return;
        }

        // Check if already running
        const existing = this.activeEffects.find(e => e.name === effectName);
        if (existing) {
            console.log(`⚠️ Effect "${effectName}" is already running continuously`);
            return;
        }

        // Run effect immediately
        effectLoader.runEffect(effectName, x, y);

        // Set up interval for continuous repetition
        const intervalId = setInterval(() => {
            effectLoader.runEffect(effectName, x, y);
        }, this.repeatInterval);

        this.activeEffects.push({
            name: effectName,
            intervalId: intervalId,
            x: x,
            y: y
        });

        console.log(`🔁 Started continuous effect: ${effectName}`);
    }

    /**
     * Stop a specific continuous effect
     * @param {string} effectName - Name of effect to stop
     */
    stopEffect(effectName) {
        const index = this.activeEffects.findIndex(e => e.name === effectName);
        if (index !== -1) {
            clearInterval(this.activeEffects[index].intervalId);
            this.activeEffects.splice(index, 1);
            console.log(`⏹️ Stopped continuous effect: ${effectName}`);
        }
    }

    /**
     * Clear all continuous effects
     */
    clearAll() {
        this.activeEffects.forEach(effect => {
            clearInterval(effect.intervalId);
        });
        this.activeEffects = [];
        console.log('🧹 Cleared all continuous effects');
    }

    /**
     * Get count of active continuous effects
     * @returns {number}
     */
    getActiveCount() {
        return this.activeEffects.length;
    }

    /**
     * Set repeat interval (milliseconds)
     * @param {number} interval - Milliseconds between repeats
     */
    setRepeatInterval(interval) {
        this.repeatInterval = Math.max(100, interval); // Min 100ms
    }
}

// Global instance
const continuousMode = new ContinuousMode();
