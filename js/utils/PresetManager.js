/**
 * Preset Management System
 * Save, load, and share particle effect presets
 */

class PresetManager {
    constructor() {
        this.presets = new Map();
        this.categories = new Map();
        this.loadBuiltInPresets();
    }

    loadBuiltInPresets() {
        // Explosive Presets
        this.addPreset('classic-explosion', {
            name: 'Classic Explosion',
            category: 'explosive',
            description: 'Traditional explosion with fire and smoke',
            effects: [
                { type: 'nuclearExplosion', delay: 0 }
            ],
            emitters: [],
            physics: {
                gravity: { x: 0, y: 0.05 },
                wind: { x: 0, y: 0 }
            }
        });

        this.addPreset('chain-reaction', {
            name: 'Chain Reaction',
            category: 'explosive',
            description: 'Multiple explosions in sequence',
            effects: [
                { type: 'supernovaChain', delay: 0 }
            ],
            emitters: [],
            physics: {
                gravity: { x: 0, y: 0.03 },
                wind: { x: 0, y: 0 }
            }
        });

        // Magic Presets
        this.addPreset('magic-portal', {
            name: 'Magic Portal',
            category: 'magic',
            description: 'Swirling magical portal effect',
            effects: [
                { type: 'plasmaVortex', delay: 0 },
                { type: 'dimensionalRift', delay: 500 }
            ],
            emitters: [
                { type: 'magic', position: 'center', lifetime: 5000 }
            ],
            physics: {
                gravity: { x: 0, y: 0 },
                wind: { x: 0, y: 0 }
            }
        });

        this.addPreset('phoenix-rebirth', {
            name: 'Phoenix Rebirth',
            category: 'magic',
            description: 'Phoenix rising from flames',
            effects: [
                { type: 'phoenixRise', delay: 0 }
            ],
            emitters: [
                { type: 'fire', position: 'center', lifetime: 2000 }
            ],
            physics: {
                gravity: { x: 0, y: -0.02 },
                wind: { x: 0, y: 0 }
            }
        });

        // Weather Presets
        this.addPreset('thunderstorm', {
            name: 'Thunderstorm',
            category: 'weather',
            description: 'Lightning and rain',
            effects: [
                { type: 'lightningStorm', delay: 0 }
            ],
            emitters: [
                { type: 'rain', position: 'top', lifetime: 10000 }
            ],
            physics: {
                gravity: { x: 0.02, y: 0.15 },
                wind: { x: 0.1, y: 0 }
            }
        });

        this.addPreset('northern-lights', {
            name: 'Northern Lights',
            category: 'weather',
            description: 'Aurora borealis effect',
            effects: [
                { type: 'auroraBorealis', delay: 0 }
            ],
            emitters: [],
            physics: {
                gravity: { x: 0, y: 0 },
                wind: { x: 0.05, y: 0 }
            }
        });

        // Cosmic Presets
        this.addPreset('supernova', {
            name: 'Supernova',
            category: 'cosmic',
            description: 'Exploding star',
            effects: [
                { type: 'celestialNova', delay: 0 }
            ],
            emitters: [
                { type: 'sparkle', position: 'center', lifetime: 3000 }
            ],
            physics: {
                gravity: { x: 0, y: 0 },
                wind: { x: 0, y: 0 }
            }
        });

        this.addPreset('black-hole-event', {
            name: 'Black Hole Event',
            category: 'cosmic',
            description: 'Matter being pulled into black hole',
            effects: [
                { type: 'blackHole', delay: 0 }
            ],
            emitters: [],
            physics: {
                gravity: { x: 0, y: 0 },
                wind: { x: 0, y: 0 }
            }
        });

        this.addPreset('meteor-impact', {
            name: 'Meteor Impact',
            category: 'cosmic',
            description: 'Meteors crashing down',
            effects: [
                { type: 'meteorShower', delay: 0 }
            ],
            emitters: [],
            physics: {
                gravity: { x: 0, y: 0.1 },
                wind: { x: 0, y: 0 }
            }
        });

        // Quantum Presets
        this.addPreset('quantum-field', {
            name: 'Quantum Field',
            category: 'quantum',
            description: 'Quantum entanglement visualization',
            effects: [
                { type: 'quantumEntanglement', delay: 0 }
            ],
            emitters: [],
            physics: {
                gravity: { x: 0, y: 0 },
                wind: { x: 0, y: 0 }
            }
        });

        this.addPreset('wormhole', {
            name: 'Wormhole',
            category: 'quantum',
            description: 'Space-time wormhole',
            effects: [
                { type: 'dimensionalRift', delay: 0 },
                { type: 'gravityWell', delay: 500 }
            ],
            emitters: [],
            physics: {
                gravity: { x: 0, y: 0 },
                wind: { x: 0, y: 0 }
            }
        });

        // Elemental Presets
        this.addPreset('fire-storm', {
            name: 'Fire Storm',
            category: 'elemental',
            description: 'Raging firestorm',
            effects: [
                { type: 'infernoTornado', delay: 0 }
            ],
            emitters: [
                { type: 'fire', position: 'center', lifetime: 5000 }
            ],
            physics: {
                gravity: { x: 0, y: -0.03 },
                wind: { x: 0.1, y: 0 }
            }
        });

        this.addPreset('ice-age', {
            name: 'Ice Age',
            category: 'elemental',
            description: 'Freezing ice effect',
            effects: [
                { type: 'frostNova', delay: 0 }
            ],
            emitters: [
                { type: 'snow', position: 'top', lifetime: 8000 }
            ],
            physics: {
                gravity: { x: 0, y: 0.05 },
                wind: { x: 0.08, y: 0 }
            }
        });

        this.addPreset('crystal-cavern', {
            name: 'Crystal Cavern',
            category: 'elemental',
            description: 'Shimmering crystals',
            effects: [
                { type: 'crystallineBurst', delay: 0 }
            ],
            emitters: [
                { type: 'sparkle', position: 'center', lifetime: 4000 }
            ],
            physics: {
                gravity: { x: 0, y: 0.02 },
                wind: { x: 0, y: 0 }
            }
        });

        console.log(`✅ Loaded ${this.presets.size} built-in presets`);
    }

    addPreset(id, preset) {
        this.presets.set(id, {
            id: id,
            ...preset,
            createdAt: preset.createdAt || Date.now(),
            custom: preset.custom || false
        });

        // Add to category
        const category = preset.category || 'misc';
        if (!this.categories.has(category)) {
            this.categories.set(category, []);
        }
        this.categories.get(category).push(id);
    }

    getPreset(id) {
        return this.presets.get(id);
    }

    getAllPresets() {
        return Array.from(this.presets.values());
    }

    getPresetsByCategory(category) {
        const presetIds = this.categories.get(category) || [];
        return presetIds.map(id => this.presets.get(id)).filter(p => p);
    }

    getCategories() {
        return Array.from(this.categories.keys());
    }

    removePreset(id) {
        const preset = this.presets.get(id);
        if (!preset) return false;

        // Don't allow removing built-in presets
        if (!preset.custom) {
            console.warn('Cannot remove built-in preset');
            return false;
        }

        this.presets.delete(id);

        // Remove from category
        const categoryPresets = this.categories.get(preset.category);
        if (categoryPresets) {
            const index = categoryPresets.indexOf(id);
            if (index > -1) {
                categoryPresets.splice(index, 1);
            }
        }

        return true;
    }

    exportPreset(id) {
        const preset = this.presets.get(id);
        if (!preset) return null;

        return JSON.stringify(preset, null, 2);
    }

    importPreset(json) {
        try {
            const preset = JSON.parse(json);
            
            // Generate unique ID for imported preset
            const id = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            preset.id = id;
            preset.custom = true;
            preset.imported = true;
            preset.importedAt = Date.now();

            this.addPreset(id, preset);
            
            console.log(`✅ Imported preset: ${preset.name}`);
            return id;
        } catch (error) {
            console.error('Failed to import preset:', error);
            return null;
        }
    }

    saveToLocalStorage() {
        const customPresets = this.getAllPresets().filter(p => p.custom);
        const data = JSON.stringify(customPresets);
        
        try {
            localStorage.setItem('particleStudio_customPresets', data);
            console.log(`✅ Saved ${customPresets.length} custom presets to localStorage`);
            return true;
        } catch (error) {
            console.error('Failed to save presets:', error);
            return false;
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('particleStudio_customPresets');
            if (!data) return 0;

            const customPresets = JSON.parse(data);
            let loadedCount = 0;

            customPresets.forEach(preset => {
                this.addPreset(preset.id, preset);
                loadedCount++;
            });

            console.log(`✅ Loaded ${loadedCount} custom presets from localStorage`);
            return loadedCount;
        } catch (error) {
            console.error('Failed to load presets:', error);
            return 0;
        }
    }

    searchPresets(query) {
        const lowerQuery = query.toLowerCase();
        return this.getAllPresets().filter(preset => {
            return preset.name.toLowerCase().includes(lowerQuery) ||
                   preset.description.toLowerCase().includes(lowerQuery) ||
                   preset.category.toLowerCase().includes(lowerQuery);
        });
    }

    duplicatePreset(id) {
        const original = this.presets.get(id);
        if (!original) return null;

        const duplicate = JSON.parse(JSON.stringify(original));
        const newId = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        duplicate.id = newId;
        duplicate.name = `${original.name} (Copy)`;
        duplicate.custom = true;
        duplicate.createdAt = Date.now();

        this.addPreset(newId, duplicate);
        return newId;
    }

    renamePreset(id, newName) {
        const preset = this.presets.get(id);
        if (!preset || !preset.custom) return false;

        preset.name = newName;
        return true;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PresetManager;
}
