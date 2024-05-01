const swidth = window.innerWidth;
const sheight = window.innerHeight;
class Example extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('assets/');
        this.load.image('sky', 'background-day.png');
        this.load.image('base', 'base.png');
        this.load.image('sprite', 'bluebird-midflap.png');
        this.load.image('pipe', 'pipe-green.png');
        this.load.image('gameover', 'gameover.png');

    }

    create() { 

        const sky = this.add.image(swidth / 2, sheight / 2, 'sky').setScale(swidth / 250);


        var pipe = this.physics.add.staticGroup();
        pipe.create(swidth / 2, sheight - 130, 'pipe').setScale(swidth / 336).refreshBody();
        
        
        var platforms = this.physics.add.staticGroup();
        platforms.create(swidth / 2, sheight - 50, 'base').setScale(swidth / 336).refreshBody();

        

        const sprite = this.physics.add.image(swidth / 2, sheight / 2 - 100, 'sprite')
        .setScale(1.5)
        .setCollideWorldBounds(true)
        .setVelocity(0, 500)
        .setBounce(0, 0.2)
        .setCollideWorldBounds(true);
        sprite.inputEnabled = true;


        this.physics.add.collider(sprite, platforms,gameOver,null,this);
        
        this.physics.add.collider(sprite, pipe, gameOver, null, this);

function gameOver() {
    
    const gameover = this.add.image(swidth / 2, sheight / 2-100, 'gameover').setScale(swidth / 250);
    
    this.scene.pause();
}
        this.input.on('pointerdown', function (pointer)
        {
            sprite.setVelocity(0,-300);

        }, this);

    }
    
}

const config = {
    type: Phaser.AUTO,
    width: swidth,
    height: sheight,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 }
        }

    }
};

const game = new Phaser.Game(config);

