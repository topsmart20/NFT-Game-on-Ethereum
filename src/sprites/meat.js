import Phaser from "phaser";

export default class Meat extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y,'atlas', 'meat');
    
        config.scene.physics.world.enable(this);
    
        this.scene = config.scene;

        this.number = config.number;

        this.scene.add.existing(this);
    }

    pickup () {
        //this.sound.play();

        //find out how much health the player currently has
        let health = this.scene.registry.get('health_current'); 
        if (health < this.scene.registry.get('health_max')) {
            //update the player's current health
            this.scene.registry.set('health_current', health + 1);
        }

        //register this object as collected with game so it is not added to future intances of this level
        this.scene.registry.set(`${this.scene.registry.get('load')}_Meat_${this.number}`, 'picked');
        
        //tell the scene the health has changed so the HUD is updated
        this.scene.events.emit('healthChange');

        this.destroy();
    }
}