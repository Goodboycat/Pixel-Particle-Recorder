/**
 * UI Controls - Simple and Functional
 */

class UIControls {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.values = {};
    }

    createSection(title) {
        const section = document.createElement('div');
        section.className = 'control-section';
        section.innerHTML = `<h3>${title}</h3>`;
        this.container.appendChild(section);
        return section;
    }

    addButton(parent, label, callback) {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.className = 'control-btn';
        btn.onclick = callback;
        parent.appendChild(btn);
        return btn;
    }

    addSlider(parent, label, id, min, max, value, callback) {
        const wrapper = document.createElement('div');
        wrapper.className = 'slider-wrapper';
        wrapper.innerHTML = `
            <label>${label}</label>
            <div class="slider-container">
                <input type="range" id="${id}" min="${min}" max="${max}" 
                       value="${value}" step="0.01" class="slider">
                <span class="slider-value">${value}</span>
            </div>
        `;
        parent.appendChild(wrapper);

        const slider = wrapper.querySelector('input');
        const valueSpan = wrapper.querySelector('.slider-value');

        slider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            valueSpan.textContent = val.toFixed(2);
            this.values[id] = val;
            if (callback) callback(val);
        });

        this.values[id] = value;
        return slider;
    }

    addCheckbox(parent, label, id, checked, callback) {
        const wrapper = document.createElement('div');
        wrapper.className = 'checkbox-wrapper';
        wrapper.innerHTML = `
            <label>
                <input type="checkbox" id="${id}" ${checked ? 'checked' : ''}>
                ${label}
            </label>
        `;
        parent.appendChild(wrapper);

        const checkbox = wrapper.querySelector('input');
        checkbox.addEventListener('change', (e) => {
            this.values[id] = e.target.checked;
            if (callback) callback(e.target.checked);
        });

        this.values[id] = checked;
        return checkbox;
    }
}
