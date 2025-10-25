/**
 * Effect Loader - Dynamically loads and manages particle effects
 */

class EffectLoader {
    constructor() {
        this.effects = new Map();
        this.engine = null;
    }

    setEngine(engine) {
        this.engine = engine;
    }

    /**
     * Register an effect function
     * @param {string} name - Effect name
     * @param {Function} effectFunction - The effect function
     */
    registerEffect(name, effectFunction) {
        this.effects.set(name, effectFunction);
        console.log(`✅ Registered effect: ${name}`);
    }

    /**
     * Get all registered effect names
     * @returns {Array<string>}
     */
    getEffectNames() {
        return Array.from(this.effects.keys());
    }

    /**
     * Check if effect exists
     * @param {string} name - Effect name
     * @returns {boolean}
     */
    hasEffect(name) {
        return this.effects.has(name);
    }

    /**
     * Execute an effect
     * @param {string} name - Effect name
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    runEffect(name, x, y) {
        const effectFn = this.effects.get(name);
        if (effectFn && this.engine) {
            effectFn(this.engine, x, y);
        } else {
            console.warn(`⚠️ Effect not found: ${name}`);
        }
    }

    /**
     * Get formatted display name for effect
     * @param {string} name - Effect name
     * @returns {string}
     */
    getDisplayName(name) {
        // Convert camelCase or snake_case to Title Case
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/_/g, ' ')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    /**
     * Get icon for effect based on name
     * @param {string} name - Effect name
     * @returns {string}
     */
    getIcon(name) {
        const icons = {
            'explosion': '💥',
            'fireworks': '🎆',
            'spiral': '🌀',
            'vortex': '🌪️',
            'lightning': '⚡',
            'snow': '❄️',
            'hearts': '💖',
            'confetti': '🎊'
        };
        return icons[name.toLowerCase()] || '✨';
    }
}

// Global instance
const effectLoader = new EffectLoader();
