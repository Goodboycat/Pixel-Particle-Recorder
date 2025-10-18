/**
 * Advanced Control Panel System
 * Provides comprehensive UI for particle system control
 */

class ControlPanel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.callbacks = {};
        this.currentValues = {};
        this.panels = {};
    }

    createSection(title, id) {
        const section = document.createElement('div');
        section.className = 'control-section';
        section.id = `section-${id}`;
        
        const header = document.createElement('div');
        header.className = 'section-header';
        header.innerHTML = `
            <h3>${title}</h3>
            <button class="toggle-btn" onclick="this.parentElement.parentElement.classList.toggle('collapsed')">▼</button>
        `;
        
        const content = document.createElement('div');
        content.className = 'section-content';
        
        section.appendChild(header);
        section.appendChild(content);
        this.container.appendChild(section);
        
        this.panels[id] = content;
        return content;
    }

    addSlider(parentId, label, id, min, max, value, step = 1, callback) {
        const parent = this.panels[parentId];
        if (!parent) return;

        const container = document.createElement('div');
        container.className = 'control-item slider-control';
        
        container.innerHTML = `
            <label for="${id}">${label}</label>
            <div class="slider-container">
                <input type="range" 
                       id="${id}" 
                       min="${min}" 
                       max="${max}" 
                       value="${value}" 
                       step="${step}" 
                       class="slider">
                <input type="number" 
                       id="${id}-value" 
                       value="${value}" 
                       min="${min}" 
                       max="${max}" 
                       step="${step}"
                       class="slider-value">
            </div>
        `;
        
        parent.appendChild(container);
        
        const slider = container.querySelector('.slider');
        const valueInput = container.querySelector('.slider-value');
        
        slider.addEventListener('input', (e) => {
            valueInput.value = e.target.value;
            this.currentValues[id] = parseFloat(e.target.value);
            if (callback) callback(parseFloat(e.target.value));
        });
        
        valueInput.addEventListener('input', (e) => {
            slider.value = e.target.value;
            this.currentValues[id] = parseFloat(e.target.value);
            if (callback) callback(parseFloat(e.target.value));
        });
        
        this.currentValues[id] = parseFloat(value);
        return container;
    }

    addColorPicker(parentId, label, id, value, callback) {
        const parent = this.panels[parentId];
        if (!parent) return;

        const container = document.createElement('div');
        container.className = 'control-item color-control';
        
        container.innerHTML = `
            <label for="${id}">${label}</label>
            <div class="color-container">
                <input type="color" id="${id}" value="${value}" class="color-picker">
                <input type="text" id="${id}-hex" value="${value}" class="color-hex" maxlength="7">
            </div>
        `;
        
        parent.appendChild(container);
        
        const colorInput = container.querySelector('.color-picker');
        const hexInput = container.querySelector('.color-hex');
        
        colorInput.addEventListener('input', (e) => {
            hexInput.value = e.target.value;
            this.currentValues[id] = e.target.value;
            if (callback) callback(e.target.value);
        });
        
        hexInput.addEventListener('input', (e) => {
            if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                colorInput.value = e.target.value;
                this.currentValues[id] = e.target.value;
                if (callback) callback(e.target.value);
            }
        });
        
        this.currentValues[id] = value;
        return container;
    }

    addDropdown(parentId, label, id, options, value, callback) {
        const parent = this.panels[parentId];
        if (!parent) return;

        const container = document.createElement('div');
        container.className = 'control-item dropdown-control';
        
        const optionsHTML = options.map(opt => 
            `<option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>${opt.label}</option>`
        ).join('');
        
        container.innerHTML = `
            <label for="${id}">${label}</label>
            <select id="${id}" class="dropdown">
                ${optionsHTML}
            </select>
        `;
        
        parent.appendChild(container);
        
        const select = container.querySelector('.dropdown');
        select.addEventListener('change', (e) => {
            this.currentValues[id] = e.target.value;
            if (callback) callback(e.target.value);
        });
        
        this.currentValues[id] = value;
        return container;
    }

    addButton(parentId, label, id, callback, className = '') {
        const parent = this.panels[parentId];
        if (!parent) return;

        const button = document.createElement('button');
        button.id = id;
        button.textContent = label;
        button.className = `control-button ${className}`;
        button.addEventListener('click', callback);
        
        parent.appendChild(button);
        return button;
    }

    addCheckbox(parentId, label, id, checked, callback) {
        const parent = this.panels[parentId];
        if (!parent) return;

        const container = document.createElement('div');
        container.className = 'control-item checkbox-control';
        
        container.innerHTML = `
            <label class="checkbox-label">
                <input type="checkbox" id="${id}" ${checked ? 'checked' : ''}>
                <span>${label}</span>
            </label>
        `;
        
        parent.appendChild(container);
        
        const checkbox = container.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            this.currentValues[id] = e.target.checked;
            if (callback) callback(e.target.checked);
        });
        
        this.currentValues[id] = checked;
        return container;
    }

    addButtonGroup(parentId, buttons, id) {
        const parent = this.panels[parentId];
        if (!parent) return;

        const container = document.createElement('div');
        container.className = 'button-group';
        container.id = id;
        
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn.label;
            button.className = btn.className || '';
            button.addEventListener('click', btn.callback);
            container.appendChild(button);
        });
        
        parent.appendChild(container);
        return container;
    }

    addTextInput(parentId, label, id, value, callback, placeholder = '') {
        const parent = this.panels[parentId];
        if (!parent) return;

        const container = document.createElement('div');
        container.className = 'control-item text-control';
        
        container.innerHTML = `
            <label for="${id}">${label}</label>
            <input type="text" 
                   id="${id}" 
                   value="${value}"
                   placeholder="${placeholder}"
                   class="text-input">
        `;
        
        parent.appendChild(container);
        
        const input = container.querySelector('.text-input');
        input.addEventListener('input', (e) => {
            this.currentValues[id] = e.target.value;
            if (callback) callback(e.target.value);
        });
        
        this.currentValues[id] = value;
        return container;
    }

    addVector2(parentId, label, id, x, y, callback) {
        const parent = this.panels[parentId];
        if (!parent) return;

        const container = document.createElement('div');
        container.className = 'control-item vector2-control';
        
        container.innerHTML = `
            <label>${label}</label>
            <div class="vector2-inputs">
                <input type="number" 
                       id="${id}-x" 
                       value="${x}" 
                       placeholder="X"
                       class="vector-input">
                <input type="number" 
                       id="${id}-y" 
                       value="${y}" 
                       placeholder="Y"
                       class="vector-input">
            </div>
        `;
        
        parent.appendChild(container);
        
        const xInput = container.querySelector(`#${id}-x`);
        const yInput = container.querySelector(`#${id}-y`);
        
        const updateVector = () => {
            this.currentValues[id] = {
                x: parseFloat(xInput.value),
                y: parseFloat(yInput.value)
            };
            if (callback) callback(this.currentValues[id]);
        };
        
        xInput.addEventListener('input', updateVector);
        yInput.addEventListener('input', updateVector);
        
        this.currentValues[id] = { x, y };
        return container;
    }

    addSeparator(parentId) {
        const parent = this.panels[parentId];
        if (!parent) return;

        const separator = document.createElement('div');
        separator.className = 'separator';
        parent.appendChild(separator);
        return separator;
    }

    addInfo(parentId, content) {
        const parent = this.panels[parentId];
        if (!parent) return;

        const info = document.createElement('div');
        info.className = 'info-box';
        info.innerHTML = content;
        parent.appendChild(info);
        return info;
    }

    getValue(id) {
        return this.currentValues[id];
    }

    setValue(id, value) {
        this.currentValues[id] = value;
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = value;
            } else {
                element.value = value;
            }
        }
    }

    removeSection(id) {
        const section = document.getElementById(`section-${id}`);
        if (section) {
            section.remove();
            delete this.panels[id];
        }
    }

    clear() {
        this.container.innerHTML = '';
        this.panels = {};
        this.currentValues = {};
    }

    // Preset management
    exportPreset() {
        return JSON.stringify(this.currentValues, null, 2);
    }

    importPreset(json) {
        try {
            const preset = JSON.parse(json);
            Object.keys(preset).forEach(key => {
                this.setValue(key, preset[key]);
            });
            return true;
        } catch (e) {
            console.error('Failed to import preset:', e);
            return false;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ControlPanel;
}
