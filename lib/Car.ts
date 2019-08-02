class Car extends Phaser.Sprite {
    x;
    y;
    game;
    gun;
    bullets;
    frame;
    atk;
    def;
    moveSpeed;
    bulletsCount;
    moveKg;
    moveDs;
    moveTime;
    lastP;
    fx;
    updateKg;
    actions;
    eatKg;
    canMoveTu;
    canMoveBing;
    audio_bz;
    audio_move;
    audio_shoot;
    audio_eat;
    audio_gunt

    constructor(game, x, y, frame) {
        super(game, x, y, frame);
        this.x = x;
        this.y = y;
        this.game = game;
        this.frame = frame;
        this.atk = 5;
        this.def = 10;
        this.moveSpeed =100;
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.gun = this.game.make.sprite(x, y, "hp");
        this.gun.scale.set(0.5, 0.5);
        this.gun.anchor.set(0.5, 0.7);
        this.anchor.set(0.5, 0.5);
        this.bulletsCount = 5;
        this.game.world.addChild(this);
        this.game.world.addChild(this.gun);
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.moveKg = false;
        this.fx = "";
        this.eatKg = false;
        this.moveDs = 0;
        this.moveTime = 0;
        this.lastP = new Phaser.Point(this.x, this.y);
        this.actions = [];
        this.updateKg = true;
        this.canMoveTu = false;
        this.canMoveBing = false;
        this.audio_bz=this.game.add.audio('bz');
        this.audio_eat=this.game.add.audio('eat');
        this.audio_move=this.game.add.audio('tankmove');
        this.audio_shoot=this.game.add.audio('shoot');
        this.audio_gunt=this.game.add.audio('gunt');

    }

    update() {
        if (this.updateKg) {
            this.crush();
            this.moveAction();
            this.runAction();
            this.flow();
        }
    }

    crush() {
        this.game.physics.arcade.collide(this, mapTool.layer);//与场景中的障碍物碰撞
        this.game.physics.arcade.collide(this.bullets, mapTool.layer, this.hitDfAction);//子弹击中墙
        if (mapTool.groups) {
            for (let i = 0; i < mapTool.groups.length; i++) {
                if (mapTool.groups[i].name == "dress") {
                    //吃砖石补充弹药
                    this.game.physics.arcade.overlap(this, mapTool.groups[i], this.eats, null, this);
                }
                if (mapTool.groups[i].name == "tankem") {
                    this.game.physics.arcade.collide(this, mapTool.groups[i]);
                    this.game.physics.arcade.collide(this.bullets, mapTool.groups[i], this.attrack, null, this);
                }
                if (mapTool.groups[i].name == "cn") {
                    this.game.physics.arcade.overlap(this, mapTool.groups[i], this.eatWood, null, this);
                }
                if (mapTool.groups[i].name == "cb") {
                    this.game.physics.arcade.overlap(this, mapTool.groups[i], this.eatTieLian, null, this);
                }
                if (mapTool.groups[i].name == "ni") {
                    this.game.physics.arcade.overlap(this, mapTool.groups[i], this.comeNi, null, this);
                }
                if (mapTool.groups[i].name == "bing") {
                    this.game.physics.arcade.overlap(this, mapTool.groups[i], this.comeBing, null, this);


                }
                if (mapTool.groups[i].name == "oil") {
                    this.game.physics.arcade.overlap(this, mapTool.groups[i], this.eatOil, null, this);


                }
            }
        }
    }
   //进入泥潭
    comeNi(a, b) {
        a.tint = 0x00ff00;
        if (this.canMoveTu) {
            this.moveSpeed = 100;
        } else {
            this.moveSpeed = 1;
        }
    }
   //进入泥潭冰区
    comeBing(a, b) {
        a.tint = 0xff0000;
        if (this.canMoveBing) {
            this.moveSpeed = 100;
        } else {
            this.moveSpeed = 1;
        }

    }
    eatOil(a, b) {
        if (this.eatKg) {
            this.bulletsCount++;
            b.kill();
            if(!this.audio_eat.isPlaying){
                this.audio_eat.play();
            }
            this.eatKg = false;
        }
    }

   //吃木头
    eatWood(a, b) {
        if (this.eatKg) {
            this.canMoveTu = true;
            b.kill();
            this.eatKg = false;
        }
    }
   //吃防滑链
    eatTieLian(a, b) {
        if (this.eatKg) {
            this.canMoveBing = true;
            b.kill();
            this.eatKg = false;
        }
    }


    hitDfAction(a, b) {
        if (b.index == T_WALL) {//击中墙
            mapTool.map.putTile(T_FLOOR, b.x, b.y, mapTool.layer);
        }
        a.kill();//子弹消失
    }

    attrack(a, b) {
        a.kill();
        if(!this.audio_bz.isPlaying) {
            this.audio_bz.play();
        }
        b.animations.play("bz").onComplete.add(function () {
            b.kill();
        }, this);
    }

    eats(a, b) {
        if (this.eatKg) {
            b.kill();

            this.eatKg = false;
            if(!this.audio_eat.isPlaying){
                this.audio_eat.play();
            }
            this.enterNext();


        }
    }


    enterNext(){
        var me=this;
        let next1=this.game.add.sprite(this.game.width/2,200,"next");
        next1.anchor.set(0.5,0.5);
        next1.scale.set(0.8,0.8);
        let tw=this.game.add.tween(next1).to({alpha:1},5000,"Linear",true);
        tw.onComplete.add(function(){
            mapTool.curr_index++;
            me.start_gm();
            next1.destroy();


        });
    }

    eat() {
        this.eatKg = true;
    }

    runAction() {
        for (let i = 0; i < this.actions.length; i++) {
            if (this.actions[i]) {
                this.actions[i].action();
            }
        }
    }

    removeAction(name) {
        for (let i = 0; i < this.actions.length; i++) {
            if (this.actions[i].name == name) {
                this.actions.splice(i, 1);
            }
        }
    }


    clearActions() {
        this.actions = [];
    }

    addAction(name, act) {
        if (act) {
            this.actions.push({action: act, name: name, index: this.actions.length});
        }
    }

    flow() {
        this.gun.x = this.x;
        this.gun.y = this.y;
        this.moveSpeed = 100;
    }

    getP() {

        this.lastP = new Phaser.Point(this.x, this.y);
        this.moveTime = new Date().getTime();
        // return {time: this.moveTime, position: this.lastP};

    }

    //改变外壳
    changeSkin(frame) {
        this.frame = frame;
        this.texture.baseTexture = this.game.cache.getBaseTexture(frame);
    }

    /**
     * 发射炮弹
     */
    fire() {
        if (this.bulletsCount > 0) {
            if(!this.audio_shoot.isPlaying){
                this.audio_shoot.play();
            }
            let rotation = this.gun.rotation + Math.PI * 3 / 2;
            let bullet = new Bullet(this.game, this.x, this.y, "zd");
            bullet.body.velocity.y = bullet.mSpeed * Math.sin(rotation);
            bullet.body.velocity.x = bullet.mSpeed * Math.cos(rotation);
            this.bullets.addChild(bullet);
            rotation = null;
            this.bulletsCount--;
        }
    }

    /**
     * 转动炮筒
     */
    gunTurn(angle) {
        this.gun.rotation = angle * Math.PI / 180;
        if(!this.audio_gunt.isPlaying){
            this.audio_gunt.play();
        }
    }
    rotate(angle){

        this.rotation = angle * Math.PI / 180;
    }

    /**
     * 向左移动
     * @param ds
     */
    moveLeft(a) {
        if (!this.moveKg) {
            this.getP();
            this.moveKg = true;
            this.fx = "left";
            this.moveDs = Math.abs(a);
            if(!this.audio_move.isPlaying){
                this.audio_move.play();
            }
        }
    }

    moveDown(a) {
        if (!this.moveKg) {
            this.getP();
            this.moveKg = true;
            this.fx = "down";
            this.moveDs = Math.abs(a);
            if(!this.audio_move.isPlaying){
                this.audio_move.play();
            }
        }
    }

    moveUp(a) {
        if (!this.moveKg) {
            this.getP();
            this.moveKg = true;
            this.fx = "up";
            this.moveDs = Math.abs(a);
            if(!this.audio_move.isPlaying){
                this.audio_move.play();
            }
        }
    }

    moveRight(a) {
        if (!this.moveKg) {
            this.getP();
            this.moveKg = true;
            this.fx = "right";
            this.moveDs = Math.abs(a);
            if(!this.audio_move.isPlaying){
                this.audio_move.play();
            }
        }
    }

    stop() {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.moveDs = 0;
        this.fx = "";
        this.moveKg = false;
        this.moveTime = 0;
    }

    outTime() {
        if ((new Date().getTime() - this.moveTime) / 1000 >= 2) {
            this.stop();
        }
    }

    moveAction() {
        if (this.moveKg) {
            if (this.fx == "left") {
                if (this.lastP.x - this.x < this.moveDs) {
                    this.body.velocity.x = -this.moveSpeed;
                    this.body.velocity.y = 0;
                    this.outTime();
                } else {
                    this.stop();
                }
            } else if (this.fx == "right") {
                if (this.x - this.lastP.x < this.moveDs) {
                    this.body.velocity.x = this.moveSpeed;
                    this.body.velocity.y = 0;
                    this.outTime();
                } else {
                    this.stop();
                }
            } else if (this.fx == "up") {
                if (this.lastP.y - this.y < this.moveDs) {
                    this.body.velocity.y = -this.moveSpeed;
                    this.body.velocity.x = 0;
                    this.outTime();
                } else {
                    this.stop();
                }
            } else if (this.fx == "down") {
                if (this.y - this.lastP.y < this.moveDs) {
                    this.body.velocity.y = this.moveSpeed;
                    this.body.velocity.x = 0;
                    this.outTime();
                } else {
                    this.stop();
                }
            }
        }

    }

    hide() {
        this.visible = false;
    }

    display() {
        this.visible = true;
    }

    start_gm(){
        mapTool.curr_index++;
        mapTool.display(mapTool.curr_index);
        tank = new Car(this.game, 144, 144, "tank");
        tank.width=32;
        tank.height=32;
        this.game.camera.follow(tank);

    }


}


class Bullet extends Phaser.Sprite {
    x;
    y;
    game;
    frame;
    owner;
    mSpeed;

    constructor(game, x, y, frame) {
        super(game, x, y, frame);
        this.x = x;
        this.y = y;
        this.game = game;
        this.frame = frame;
        this.owner = null;
        this.mSpeed = 150;
        this.anchor.set(0.5, 0.5);
        this.game.physics.arcade.enable(this);
        this.body.checkWorldBounds = true;
        this.body.outOfBoundsKill = true;

    }


}





