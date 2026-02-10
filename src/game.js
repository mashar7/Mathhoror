const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 } }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Memuat aset (ganti link dengan file lokal Anda nanti)
    this.load.image('background', 'assets/images/hutan_malam.png');
    this.load.image('pocong', 'assets/images/pocong.png');
    this.load.spritesheet('player', 'assets/spritesheets/hero_attack.png', { frameWidth: 128, frameHeight: 128 });
    this.load.image('flare', 'https://labs.phaser.io/assets/particles/white-flare.png'); // Untuk efek partikel
    
    // Suara
    this.load.audio('slash_sfx', 'assets/sounds/katana_slash.mp3');
    this.load.audio('jumpscare_sfx', 'assets/sounds/scream.mp3');
}

function create() {
    // 1. Tambahkan Background
    this.add.image(400, 300, 'background').setScale(1.2);

    // 2. Tambahkan Pocong dengan sedikit efek melayang
    this.pocong = this.add.sprite(600, 400, 'pocong').setScale(0.8);
    this.tweens.add({
        targets: this.pocong,
        y: 380,
        duration: 2000,
        ease: 'Power1',
        yoyo: true,
        loop: -1
    });

    // 3. Tambahkan Player
    this.player = this.add.sprite(200, 400, 'player', 0).setScale(1.5);

    // 4. Siapkan Partikel untuk "Jurus" (Efek Demon Slayer)
    this.emitter = this.add.particles(0, 0, 'flare', {
        speed: { min: 100, max: 200 },
        scale: { start: 0.5, end: 0 },
        blendMode: 'ADD',
        lifespan: 600,
        emitting: false // Hanya muncul saat menyerang
    });
}

function update() {
    // Logika game loop jika diperlukan
}

// Fungsi yang dipanggil saat jawaban benar
function attackEnemy() {
    // Logika animasi tebasan
    let scene = game.scene.scenes[0];
    
    // Gerakkan player maju dengan cepat (Dash)
    scene.tweens.add({
        targets: scene.player,
        x: 500,
        duration: 150,
        yoyo: true,
        onStart: () => {
            scene.emitter.setPosition(scene.player.x + 50, scene.player.y);
            scene.emitter.start(); // Hidupkan partikel
            scene.sound.play('slash_sfx');
        },
        onComplete: () => {
            scene.emitter.stop();
            // Pocong kena hit
            scene.cameras.main.shake(200, 0.02); // Screen shake
            scene.pocong.setTint(0xff0000); // Berubah merah sesaat
            setTimeout(() => scene.pocong.clearTint(), 200);
        }
    });
}
