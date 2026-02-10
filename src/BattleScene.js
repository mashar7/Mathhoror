class BattleScene extends Phaser.Scene {
    constructor() {
        super('BattleScene');
        this.wrongAnswers = 0; // Menghitung jumlah kesalahan
    }

    create() {
        // 1. Setup Dasar (Background & Karakter)
        this.add.image(400, 300, 'bg_hutan').setScale(1.2);
        this.player = this.add.sprite(200, 450, 'hero_attack', 0).setScale(1.5);
        this.pocong = this.add.sprite(600, 450, 'pocong').setScale(0.8);

        // 2. Setup Suara
        this.sfxScream = this.sound.add('scream_sfx');
        this.bgm = this.sound.add('bgm_horror', { loop: true, volume: 0.5 });
        this.bgm.play();

        // 3. Setup Jumpscare (Tersembunyi di awal)
        this.ghostOverlay = this.add.image(400, 300, 'jumpscare_img');
        this.ghostOverlay.setDisplaySize(800, 600);
        this.ghostOverlay.setAlpha(0); // Transparan
        this.ghostOverlay.setDepth(100); // Pastikan berada di paling depan

        // 4. Inisialisasi Soal Matematika
        this.generateMathProblem();
    }

    // Fungsi untuk memicu Jumpscare
    triggerJumpscare() {
        // Efek visual: Muncul tiba-tiba dan bergetar
        this.ghostOverlay.setAlpha(1);
        this.cameras.main.shake(500, 0.05);
        this.sfxScream.play();

        // Tambahkan efek zoom pada gambar hantu
        this.tweens.add({
            targets: this.ghostOverlay,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
            yoyo: true,
            repeat: 5
        });

        // Hilangkan hantu setelah 0.8 detik
        this.time.delayedCall(800, () => {
            this.ghostOverlay.setAlpha(0);
            this.ghostOverlay.setScale(1);
        });
    }

    // Logika saat pemain salah menjawab
    handleWrongAnswer() {
        this.wrongAnswers++;
        
        // Jumpscare muncul jika salah 3 kali, atau secara acak (peluang 20%)
        if (this.wrongAnswers >= 3 || Math.random() < 0.2) {
            this.triggerJumpscare();
            this.wrongAnswers = 0; // Reset hitungan
        } else {
            // Efek salah biasa: Layar berkedip merah
            this.cameras.main.flash(300, 255, 0, 0);
        }
    }

    generateMathProblem() {
        // Masukkan logika matematika dari file index.html lama Anda di sini
        // Contoh sederhana:
        this.currentProblem = { a: 5, b: 7, answer: 12 };
        console.log("Selesaikan: 5 + 7");
    }

    // Panggil ini dari input UI Anda
    checkAnswer(userInp) {
        if (parseInt(userInp) === this.currentProblem.answer) {
            this.attackEnemy(); // Fungsi serang ala Demon Slayer
        } else {
            this.handleWrongAnswer();
        }
    }
}

export default BattleScene;
