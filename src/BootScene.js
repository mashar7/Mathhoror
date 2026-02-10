class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // --- 1. VISUAL LOADING BAR ---
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        
        // Buat teks "Memanggil Arwah..." atau "Loading..."
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Mempersiapkan Ritual...',
            style: { font: '20px monospace', fill: '#ff0000' }
        });
        loadingText.setOrigin(0.5, 0.5);

        // Progress Bar Background
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);

        // --- 2. LOAD SEMUA ASET ---
        // Gambar & Background
        this.load.image('bg_hutan', 'assets/images/hutan_malam.png');
        this.load.image('pocong', 'assets/images/pocong.png');
        this.load.image('jumpscare_img', 'assets/images/jumpscare_face.png');
        this.load.image('flare', 'https://labs.phaser.io/assets/particles/white-flare.png');
        
        // Spritesheets (Animasi ala Demon Slayer)
        // Pastikan frameWidth & height sesuai dengan file asli Anda
        this.load.spritesheet('hero_attack', 'assets/spritesheets/hero_attack.png', { 
            frameWidth: 128, 
            frameHeight: 128 
        });

        // Audio & SFX
        this.load.audio('bgm_horror', 'assets/sounds/battle_theme.mp3');
        this.load.audio('slash_sfx', 'assets/sounds/katana_slash.wav');
        this.load.audio('scream_sfx', 'assets/sounds/jumpscare_scream.wav');

        // --- 3. LOGIKA PROGRESS BAR ---
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xff0000, 1); // Warna merah darah
            progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
        });

        this.load.on('complete', () => {
            loadingText.setText('Ritual Siap. Klik untuk Mulai!');
            // Tambahkan efek kedap-kedip pada teks
            this.tweens.add({
                targets: loadingText,
                alpha: 0,
                duration: 500,
                ease: 'Linear',
                yoyo: true,
                loop: -1
            });
        });
    }

    create() {
        // Pindah ke BattleScene saat layar diklik
        this.input.on('pointerdown', () => {
            this.scene.start('BattleScene');
        });
    }
}

// Ekspor agar bisa digunakan di game.js
export default BootScene;
