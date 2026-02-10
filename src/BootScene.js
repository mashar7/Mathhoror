class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // --- BUAT ASSET TEMPORER (Agar tidak blank) ---
        let graphics = this.make.graphics({x: 0, y: 0, add: false});

        // 1. Background Hutan (Kotak Biru Gelap)
        graphics.fillStyle(0x0f2027);
        graphics.fillRect(0, 0, 800, 600);
        graphics.generateTexture('bg_hutan', 800, 600);
        graphics.clear();

        // 2. Player (Kotak Hijau ala Demon Slayer)
        graphics.fillStyle(0x2ecc71);
        graphics.fillRect(0, 0, 64, 64);
        graphics.generateTexture('hero_attack', 64, 64);
        graphics.clear();

        // 3. Pocong (Kotak Putih Tinggi)
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, 50, 100);
        graphics.generateTexture('pocong', 50, 100);
        graphics.clear();

        // 4. Jumpscare (Kotak Merah Terang)
        graphics.fillStyle(0xff0000);
        graphics.fillRect(0, 0, 800, 600);
        graphics.generateTexture('jumpscare_img', 800, 600);

        // Asset Partikel Luar (Mengambil dari Lab Phaser agar keren)
        this.load.image('flare', 'https://labs.phaser.io/assets/particles/white-flare.png');
        
        // Loading UI
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        this.add.text(width / 2, height / 2, 'KLIK UNTUK MULAI RITUAL', { 
            font: '24px Arial', fill: '#ffffff' 
        }).setOrigin(0.5);
    }

    create() {
        this.input.on('pointerdown', () => this.scene.start('BattleScene'));
    }
}
export default BootScene;
