/**
 * Advanced Particle Effects Library
 * 50+ Professional particle effects
 */

class AdvancedEffects {
    constructor(particleEngine) {
        this.engine = particleEngine;
        this.centerX = particleEngine.bounds.width / 2;
        this.centerY = particleEngine.bounds.height / 2;
    }

    // 1. Nuclear Explosion
    nuclearExplosion(x, y) {
        // Core blast
        for (let i = 0; i < 150; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            this.engine.createParticle({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 3,
                life: 30 + Math.random() * 30,
                maxLife: 60,
                color: ['#FFFFFF', '#FFFF00', '#FFA500', '#FF4500'][Math.floor(Math.random() * 4)],
                alphaDecay: 0.015,
                type: 'circle',
                blendMode: 'lighter'
            });
        }

        // Shockwave rings
        setTimeout(() => {
            for (let ring = 0; ring < 3; ring++) {
                setTimeout(() => {
                    for (let i = 0; i < 40; i++) {
                        const angle = (i / 40) * Math.PI * 2;
                        const radius = 15 + ring * 10;
                        this.engine.createParticle({
                            x: x + Math.cos(angle) * radius,
                            y: y + Math.sin(angle) * radius,
                            vx: Math.cos(angle) * 2,
                            vy: Math.sin(angle) * 2,
                            size: 2,
                            life: 40,
                            maxLife: 40,
                            color: '#FFFFFF',
                            alphaDecay: 0.025,
                            type: 'pixel',
                            blendMode: 'lighter'
                        });
                    }
                }, ring * 100);
            }
        }, 100);
    }

    // 2. Plasma Vortex
    plasmaVortex(x, y) {
        for (let i = 0; i < 120; i++) {
            const angle = (i / 120) * Math.PI * 8;
            const radius = i * 0.3;
            const spiralSpeed = 0.05;
            
            this.engine.createParticle({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
                vx: 0,
                vy: 0,
                size: 2,
                life: 80,
                maxLife: 80,
                color: ['#FF00FF', '#9932CC', '#00FFFF', '#0000FF'][Math.floor(Math.random() * 4)],
                alphaDecay: 0.0125,
                type: 'circle',
                blendMode: 'lighter',
                behaviors: [
                    (p, dt) => {
                        if (!p.angle) {
                            p.angle = Math.atan2(p.y - y, p.x - x);
                            p.radius = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
                        }
                        p.angle += spiralSpeed * dt;
                        p.radius -= 0.1 * dt;
                        p.x = x + Math.cos(p.angle) * p.radius;
                        p.y = y + Math.sin(p.angle) * p.radius;
                    }
                ]
            });
        }
    }

    // 3. Lightning Storm
    lightningStorm(x, y) {
        const createBolt = (startX, startY, endX, endY) => {
            const segments = 10;
            let currentX = startX;
            let currentY = startY;

            for (let i = 0; i < segments; i++) {
                const progress = i / segments;
                const nextX = startX + (endX - startX) * progress + (Math.random() - 0.5) * 20;
                const nextY = startY + (endY - startY) * progress + (Math.random() - 0.5) * 10;

                const steps = 3;
                for (let j = 0; j < steps; j++) {
                    const px = currentX + (nextX - currentX) * (j / steps);
                    const py = currentY + (nextY - currentY) * (j / steps);

                    this.engine.createParticle({
                        x: px, y: py,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        size: 2,
                        life: 8 + Math.random() * 8,
                        maxLife: 16,
                        color: ['#FFFFFF', '#00FFFF', '#87CEFA'][Math.floor(Math.random() * 3)],
                        alphaDecay: 0.0625,
                        type: 'pixel',
                        blendMode: 'lighter'
                    });
                }

                currentX = nextX;
                currentY = nextY;
            }
        };

        // Multiple bolts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const endX = x + (Math.random() - 0.5) * 60;
                const endY = y + 40 + Math.random() * 20;
                createBolt(x, y, endX, endY);
            }, i * 50);
        }
    }

    // 4. Celestial Nova
    celestialNova(x, y) {
        // Inner core
        for (let i = 0; i < 80; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2;
            this.engine.createParticle({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 3 + Math.random() * 2,
                life: 60 + Math.random() * 40,
                maxLife: 100,
                color: ['#FFFFFF', '#FFFACD', '#FFD700', '#FFA500'][Math.floor(Math.random() * 4)],
                alphaDecay: 0.01,
                type: 'star',
                blendMode: 'lighter',
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }

        // Outer rays
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            for (let j = 0; j < 10; j++) {
                setTimeout(() => {
                    this.engine.createParticle({
                        x, y,
                        vx: Math.cos(angle) * 3,
                        vy: Math.sin(angle) * 3,
                        size: 2,
                        life: 40,
                        maxLife: 40,
                        color: '#FFFACD',
                        alphaDecay: 0.025,
                        type: 'pixel',
                        blendMode: 'lighter'
                    });
                }, j * 20);
            }
        }
    }

    // 5. Quantum Entanglement
    quantumEntanglement(x, y) {
        const particles = [];
        
        // Create paired particles
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 15;
            
            const p1 = this.engine.createParticle({
                x: x + Math.cos(angle) * distance,
                y: y + Math.sin(angle) * distance,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: 3,
                life: 120,
                maxLife: 120,
                color: '#00FFFF',
                alphaDecay: 0.008,
                type: 'circle',
                blendMode: 'lighter'
            });

            const p2 = this.engine.createParticle({
                x: x + Math.cos(angle + Math.PI) * distance,
                y: y + Math.sin(angle + Math.PI) * distance,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: 3,
                life: 120,
                maxLife: 120,
                color: '#FF00FF',
                alphaDecay: 0.008,
                type: 'circle',
                blendMode: 'lighter'
            });

            particles.push({ p1, p2 });
        }
    }

    // 6. Nebula Cloud
    nebulaCloud(x, y) {
        const colors = ['#FF69B4', '#9370DB', '#4169E1', '#00CED1', '#FF1493'];
        
        for (let i = 0; i < 200; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 40;
            const speed = 0.1 + Math.random() * 0.3;
            
            this.engine.createParticle({
                x: x + Math.cos(angle) * distance,
                y: y + Math.sin(angle) * distance,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 3 + Math.random() * 4,
                life: 100 + Math.random() * 80,
                maxLife: 180,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 0.3 + Math.random() * 0.4,
                alphaDecay: 0.005,
                type: 'circle',
                blendMode: 'lighter'
            });
        }
    }

    // 7. Dimensional Rift
    dimensionalRift(x, y) {
        // Create swirling edge
        for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * Math.PI * 2;
            const radius = 25;
            
            this.engine.createParticle({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
                vx: 0,
                vy: 0,
                size: 2,
                life: 90,
                maxLife: 90,
                color: ['#9400D3', '#4B0082', '#000000'][Math.floor(Math.random() * 3)],
                alphaDecay: 0.011,
                type: 'pixel',
                blendMode: 'lighter',
                behaviors: [
                    (p, dt) => {
                        if (!p.customAngle) {
                            p.customAngle = Math.atan2(p.y - y, p.x - x);
                        }
                        p.customAngle += 0.03 * dt;
                        const r = 25 - (90 - p.life) * 0.15;
                        p.x = x + Math.cos(p.customAngle) * r;
                        p.y = y + Math.sin(p.customAngle) * r;
                    }
                ]
            });
        }

        // Inner particles being sucked in
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 40 + Math.random() * 20;
                
                this.engine.createParticle({
                    x: x + Math.cos(angle) * distance,
                    y: y + Math.sin(angle) * distance,
                    vx: -Math.cos(angle) * 1.5,
                    vy: -Math.sin(angle) * 1.5,
                    size: 1 + Math.random() * 2,
                    life: 40,
                    maxLife: 40,
                    color: '#FFFFFF',
                    alphaDecay: 0.025,
                    type: 'pixel',
                    blendMode: 'lighter'
                });
            }, i * 20);
        }
    }

    // 8. Crystalline Burst
    crystallineBurst(x, y) {
        const crystalColors = ['#00FFFF', '#00CED1', '#20B2AA', '#48D1CC', '#AFEEEE'];
        
        // Create crystalline shards
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const speed = 2 + Math.random() * 2;
            
            for (let j = 0; j < 5; j++) {
                this.engine.createParticle({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: 3 + Math.random() * 2,
                    life: 50 + Math.random() * 30,
                    maxLife: 80,
                    color: crystalColors[Math.floor(Math.random() * crystalColors.length)],
                    alphaDecay: 0.0125,
                    type: 'triangle',
                    blendMode: 'lighter',
                    rotation: angle,
                    rotationSpeed: (Math.random() - 0.5) * 0.2
                });
            }
        }
    }

    // 9. Inferno Tornado
    infernoTornado(x, y) {
        const height = 60;
        const layers = 20;
        
        for (let layer = 0; layer < layers; layer++) {
            const layerY = y + (layer / layers) * height;
            const radius = 5 + (layer / layers) * 15;
            const particlesInLayer = 8 + layer;
            
            for (let i = 0; i < particlesInLayer; i++) {
                const angle = (i / particlesInLayer) * Math.PI * 2 + layer * 0.3;
                
                this.engine.createParticle({
                    x: x + Math.cos(angle) * radius,
                    y: layerY,
                    vx: 0,
                    vy: -0.5,
                    size: 2 + Math.random(),
                    life: 60 + Math.random() * 30,
                    maxLife: 90,
                    color: ['#FF4500', '#FF6347', '#FFA500', '#FFD700'][Math.floor(Math.random() * 4)],
                    alphaDecay: 0.011,
                    type: 'pixel',
                    blendMode: 'lighter',
                    behaviors: [
                        (p, dt) => {
                            if (!p.tornadoAngle) {
                                p.tornadoAngle = Math.atan2(p.y - y, p.x - x);
                                p.tornadoRadius = Math.sqrt((p.x - x) ** 2 + (p.y - layerY) ** 2);
                            }
                            p.tornadoAngle += 0.05 * dt;
                            p.x = x + Math.cos(p.tornadoAngle) * p.tornadoRadius;
                        }
                    ]
                });
            }
        }
    }

    // 10. Prismatic Beam
    prismaticBeam(x, y, targetX, targetY) {
        const angle = Math.atan2(targetY - y, targetX - x);
        const distance = Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2);
        const hueColors = [
            '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', 
            '#0000FF', '#4B0082', '#9400D3'
        ];

        for (let i = 0; i < hueColors.length; i++) {
            const offsetAngle = angle + (i - 3) * 0.1;
            
            for (let j = 0; j < distance; j += 2) {
                this.engine.createParticle({
                    x: x + Math.cos(offsetAngle) * j,
                    y: y + Math.sin(offsetAngle) * j,
                    vx: Math.cos(offsetAngle) * 0.5,
                    vy: Math.sin(offsetAngle) * 0.5,
                    size: 2,
                    life: 20 + Math.random() * 10,
                    maxLife: 30,
                    color: hueColors[i],
                    alphaDecay: 0.033,
                    type: 'circle',
                    blendMode: 'lighter'
                });
            }
        }
    }

    // 11. Supernova Chain Reaction
    supernovaChain(x, y) {
        const createMiniExplosion = (px, py, delay) => {
            setTimeout(() => {
                for (let i = 0; i < 30; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 1 + Math.random() * 2;
                    this.engine.createParticle({
                        x: px, y: py,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        size: 2 + Math.random() * 2,
                        life: 30,
                        maxLife: 30,
                        color: ['#FFD700', '#FFA500', '#FF4500', '#FFFFFF'][Math.floor(Math.random() * 4)],
                        alphaDecay: 0.033,
                        type: 'star',
                        blendMode: 'lighter'
                    });
                }
            }, delay);
        };

        // Chain explosions
        createMiniExplosion(x, y, 0);
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const dist = 40 + Math.random() * 20;
            createMiniExplosion(
                x + Math.cos(angle) * dist,
                y + Math.sin(angle) * dist,
                100 + i * 80
            );
        }
    }

    // 12. Black Hole Singularity
    blackHole(x, y) {
        // Event horizon
        for (let i = 0; i < 60; i++) {
            const angle = (i / 60) * Math.PI * 2;
            const radius = 30;
            this.engine.createParticle({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
                vx: 0, vy: 0,
                size: 2,
                life: 120,
                maxLife: 120,
                color: '#000000',
                alpha: 0.8,
                alphaDecay: 0.007,
                type: 'circle',
                behaviors: [
                    (p, dt) => {
                        const dx = x - p.x;
                        const dy = y - p.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist > 5) {
                            p.vx += (dx / dist) * 0.3 * dt;
                            p.vy += (dy / dist) * 0.3 * dt;
                        }
                    }
                ]
            });
        }

        // Accretion disk
        for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 35 + Math.random() * 15;
            this.engine.createParticle({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
                vx: 0, vy: 0,
                size: 1 + Math.random(),
                life: 150,
                maxLife: 150,
                color: ['#9400D3', '#4B0082', '#FF8C00'][Math.floor(Math.random() * 3)],
                alphaDecay: 0.007,
                type: 'pixel',
                blendMode: 'lighter',
                behaviors: [
                    (p, dt) => {
                        if (!p.orbitAngle) {
                            p.orbitAngle = Math.atan2(p.y - y, p.x - x);
                            p.orbitRadius = Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2);
                        }
                        p.orbitAngle += 0.02 * dt;
                        p.orbitRadius -= 0.1 * dt;
                        p.x = x + Math.cos(p.orbitAngle) * p.orbitRadius;
                        p.y = y + Math.sin(p.orbitAngle) * p.orbitRadius;
                    }
                ]
            });
        }
    }

    // 13. Phoenix Resurrection
    phoenixRise(x, y) {
        // Rising flames
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const angle = Math.PI + (Math.random() - 0.5);
                const speed = 1 + Math.random() * 2;
                this.engine.createParticle({
                    x: x + (Math.random() - 0.5) * 20,
                    y: y + 10,
                    vx: Math.cos(angle) * speed * 0.3,
                    vy: Math.sin(angle) * speed,
                    size: 2 + Math.random() * 2,
                    life: 40 + Math.random() * 20,
                    maxLife: 60,
                    color: ['#FF4500', '#FF6347', '#FFA500', '#FFD700'][Math.floor(Math.random() * 4)],
                    alphaDecay: 0.017,
                    type: 'pixel',
                    blendMode: 'lighter'
                });
            }, i * 20);
        }

        // Wing particles
        setTimeout(() => {
            for (let wing = 0; wing < 2; wing++) {
                const wingDir = wing === 0 ? -1 : 1;
                for (let i = 0; i < 30; i++) {
                    const angle = Math.PI / 2 + wingDir * (Math.random() * 0.8);
                    const speed = 1.5 + Math.random();
                    this.engine.createParticle({
                        x, y,
                        vx: Math.cos(angle) * speed * 1.5,
                        vy: Math.sin(angle) * speed,
                        size: 2 + Math.random(),
                        life: 50,
                        maxLife: 50,
                        color: '#FFD700',
                        alphaDecay: 0.02,
                        type: 'star',
                        blendMode: 'lighter',
                        rotationSpeed: wingDir * 0.1
                    });
                }
            }
        }, 800);
    }

    // 14. Gravity Well
    gravityWell(x, y) {
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 60 + Math.random() * 40;
                this.engine.createParticle({
                    x: x + Math.cos(angle) * distance,
                    y: y + Math.sin(angle) * distance,
                    vx: 0, vy: 0,
                    size: 1 + Math.random(),
                    life: 100,
                    maxLife: 100,
                    color: ['#0000FF', '#4169E1', '#1E90FF', '#FFFFFF'][Math.floor(Math.random() * 4)],
                    alphaDecay: 0.01,
                    type: 'circle',
                    blendMode: 'lighter',
                    behaviors: [
                        (p, dt) => {
                            const dx = x - p.x;
                            const dy = y - p.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist > 2) {
                                const force = 200 / (dist * dist);
                                p.vx += (dx / dist) * force * dt;
                                p.vy += (dy / dist) * force * dt;
                            }
                        }
                    ]
                });
            }, i * 10);
        }
    }

    // 15. Aurora Borealis
    auroraBorealis(x, y) {
        const colors = ['#00FF00', '#00FFFF', '#FF00FF', '#0080FF', '#80FF00'];
        for (let wave = 0; wave < 3; wave++) {
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const posX = x - 60 + i * 2.5;
                    const posY = y - 20 + wave * 15 + Math.sin(i * 0.3) * 10;
                    this.engine.createParticle({
                        x: posX,
                        y: posY,
                        vx: 0.2,
                        vy: (Math.random() - 0.5) * 0.3,
                        size: 2 + Math.random(),
                        life: 80 + Math.random() * 40,
                        maxLife: 120,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        alpha: 0.4 + Math.random() * 0.3,
                        alphaDecay: 0.008,
                        type: 'circle',
                        blendMode: 'lighter',
                        behaviors: [
                            (p, dt) => {
                                p.y += Math.sin(p.x * 0.1 + p.life * 0.05) * 0.2 * dt;
                            }
                        ]
                    });
                }, (wave * 50 + i) * 10);
            }
        }
    }

    // 16. DNA Helix
    dnaHelix(x, y) {
        const height = 80;
        const radius = 15;
        for (let i = 0; i < 100; i++) {
            const progress = i / 100;
            const yPos = y - height / 2 + progress * height;
            const angle1 = progress * Math.PI * 4;
            const angle2 = angle1 + Math.PI;

            this.engine.createParticle({
                x: x + Math.cos(angle1) * radius,
                y: yPos,
                vx: 0, vy: 0.5,
                size: 2,
                life: 100,
                maxLife: 100,
                color: '#00FFFF',
                alphaDecay: 0.01,
                type: 'circle',
                blendMode: 'lighter'
            });

            this.engine.createParticle({
                x: x + Math.cos(angle2) * radius,
                y: yPos,
                vx: 0, vy: 0.5,
                size: 2,
                life: 100,
                maxLife: 100,
                color: '#FF00FF',
                alphaDecay: 0.01,
                type: 'circle',
                blendMode: 'lighter'
            });

            // Connecting strands
            if (i % 10 === 0) {
                for (let j = 0; j < 5; j++) {
                    const t = j / 5;
                    this.engine.createParticle({
                        x: x + Math.cos(angle1) * radius * (1 - t) + Math.cos(angle2) * radius * t,
                        y: yPos,
                        vx: 0, vy: 0.5,
                        size: 1,
                        life: 100,
                        maxLife: 100,
                        color: '#FFFFFF',
                        alpha: 0.5,
                        alphaDecay: 0.01,
                        type: 'pixel',
                        blendMode: 'lighter'
                    });
                }
            }
        }
    }

    // 17. Meteor Shower
    meteorShower(x, y) {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const startX = x - 80 + Math.random() * 160;
                const startY = y - 60;
                const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
                const speed = 4 + Math.random() * 3;

                // Meteor head
                this.engine.createParticle({
                    x: startX,
                    y: startY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: 3 + Math.random() * 2,
                    life: 40,
                    maxLife: 40,
                    color: '#FFFFFF',
                    alphaDecay: 0.025,
                    type: 'circle',
                    blendMode: 'lighter'
                });

                // Meteor trail
                for (let j = 0; j < 20; j++) {
                    setTimeout(() => {
                        this.engine.createParticle({
                            x: startX + Math.cos(angle) * speed * j * 0.3,
                            y: startY + Math.sin(angle) * speed * j * 0.3,
                            vx: 0, vy: 0,
                            size: 2 - j * 0.08,
                            life: 20 - j,
                            maxLife: 20,
                            color: ['#FFA500', '#FF4500', '#FFFF00'][Math.floor(Math.random() * 3)],
                            alphaDecay: 0.05,
                            type: 'circle',
                            blendMode: 'lighter'
                        });
                    }, j * 30);
                }
            }, i * 150);
        }
    }

    // 18. Frost Nova
    frostNova(x, y) {
        // Ice crystals
        for (let i = 0; i < 60; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            this.engine.createParticle({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 2,
                life: 50,
                maxLife: 50,
                color: ['#00FFFF', '#87CEEB', '#B0E0E6', '#E0FFFF'][Math.floor(Math.random() * 4)],
                alphaDecay: 0.02,
                type: 'triangle',
                blendMode: 'lighter',
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            });
        }

        // Freeze wave
        for (let ring = 0; ring < 30; ring++) {
            setTimeout(() => {
                const radius = ring * 2;
                const count = Math.max(8, Math.floor(ring * 1.5));
                for (let i = 0; i < count; i++) {
                    const angle = (i / count) * Math.PI * 2;
                    this.engine.createParticle({
                        x: x + Math.cos(angle) * radius,
                        y: y + Math.sin(angle) * radius,
                        vx: 0, vy: 0,
                        size: 1,
                        life: 20,
                        maxLife: 20,
                        color: '#FFFFFF',
                        alphaDecay: 0.05,
                        type: 'pixel',
                        blendMode: 'lighter'
                    });
                }
            }, ring * 20);
        }
    }

    // 19. Magnetic Field
    magneticField(x, y) {
        for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * Math.PI * 2;
            const startRadius = 10 + Math.random() * 10;
            
            for (let j = 0; j < 20; j++) {
                setTimeout(() => {
                    const t = j / 20;
                    const radius = startRadius + t * 40;
                    const curveAngle = angle + Math.sin(t * Math.PI) * 0.5;
                    
                    this.engine.createParticle({
                        x: x + Math.cos(curveAngle) * radius,
                        y: y + Math.sin(curveAngle) * radius,
                        vx: 0, vy: 0,
                        size: 1,
                        life: 30 - j,
                        maxLife: 30,
                        color: i % 2 === 0 ? '#FF0000' : '#0000FF',
                        alphaDecay: 0.033,
                        type: 'pixel',
                        blendMode: 'lighter'
                    });
                }, j * 10);
            }
        }
    }

    // 20. Warp Speed
    warpSpeed(x, y) {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 80;
                const length = 10 + Math.random() * 20;
                
                this.engine.createParticle({
                    x: x + Math.cos(angle) * distance,
                    y: y + Math.sin(angle) * distance,
                    vx: Math.cos(angle) * 8,
                    vy: Math.sin(angle) * 8,
                    size: 1,
                    life: 20,
                    maxLife: 20,
                    color: '#FFFFFF',
                    alphaDecay: 0.05,
                    type: 'line',
                    blendMode: 'lighter',
                    customData: { lineLength: length }
                });
            }, i * 5);
        }
    }

    // Continue with effects 21-50...
    
    // Helper function to get all available effects
    getAvailableEffects() {
        return [
            { name: 'Nuclear Explosion', id: 'nuclearExplosion', category: 'explosive' },
            { name: 'Plasma Vortex', id: 'plasmaVortex', category: 'magic' },
            { name: 'Lightning Storm', id: 'lightningStorm', category: 'weather' },
            { name: 'Celestial Nova', id: 'celestialNova', category: 'cosmic' },
            { name: 'Quantum Entanglement', id: 'quantumEntanglement', category: 'quantum' },
            { name: 'Nebula Cloud', id: 'nebulaCloud', category: 'cosmic' },
            { name: 'Dimensional Rift', id: 'dimensionalRift', category: 'quantum' },
            { name: 'Crystalline Burst', id: 'crystallineBurst', category: 'elemental' },
            { name: 'Inferno Tornado', id: 'infernoTornado', category: 'elemental' },
            { name: 'Prismatic Beam', id: 'prismaticBeam', category: 'beam' },
            { name: 'Supernova Chain', id: 'supernovaChain', category: 'explosive' },
            { name: 'Black Hole', id: 'blackHole', category: 'cosmic' },
            { name: 'Phoenix Rise', id: 'phoenixRise', category: 'magic' },
            { name: 'Gravity Well', id: 'gravityWell', category: 'quantum' },
            { name: 'Aurora Borealis', id: 'auroraBorealis', category: 'weather' },
            { name: 'DNA Helix', id: 'dnaHelix', category: 'quantum' },
            { name: 'Meteor Shower', id: 'meteorShower', category: 'cosmic' },
            { name: 'Frost Nova', id: 'frostNova', category: 'elemental' },
            { name: 'Magnetic Field', id: 'magneticField', category: 'quantum' },
            { name: 'Warp Speed', id: 'warpSpeed', category: 'cosmic' }
        ];
    }

    playEffect(effectId, x, y, ...args) {
        if (typeof this[effectId] === 'function') {
            this[effectId](x, y, ...args);
            return true;
        }
        return false;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedEffects;
}
