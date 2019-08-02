var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(game, x, y, frame) {
        var _this = _super.call(this, game, x, y, frame) || this;
        _this.x = x;
        _this.y = y;
        _this.game = game;
        _this.frame = frame;
        _this.atk = 5;
        _this.def = 10;
        _this.moveSpeed = 100;
        _this.game.physics.arcade.enable(_this);
        _this.body.collideWorldBounds = true;
        _this.gun = _this.game.make.sprite(x, y, "hp");
        _this.gun.scale.set(0.5, 0.5);
        _this.gun.anchor.set(0.5, 0.7);
        _this.anchor.set(0.5, 0.5);
        _this.bulletsCount = 5;
        _this.game.world.addChild(_this);
        _this.game.world.addChild(_this.gun);
        _this.bullets = _this.game.add.group();
        _this.bullets.enableBody = true;
        _this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        _this.moveKg = false;
        _this.fx = "";
        _this.eatKg = false;
        _this.moveDs = 0;
        _this.moveTime = 0;
        _this.lastP = new Phaser.Point(_this.x, _this.y);
        _this.actions = [];
        _this.updateKg = true;
        _this.canMoveTu = false;
        _this.canMoveBing = false;
        _this.audio_bz = _this.game.add.audio('bz');
        _this.audio_eat = _this.game.add.audio('eat');
        _this.audio_move = _this.game.add.audio('tankmove');
        _this.audio_shoot = _this.game.add.audio('shoot');
        _this.audio_gunt = _this.game.add.audio('gunt');
        return _this;
    }
    Car.prototype.update = function () {
        if (this.updateKg) {
            this.crush();
            this.moveAction();
            this.runAction();
            this.flow();
        }
    };
    Car.prototype.crush = function () {
        this.game.physics.arcade.collide(this, mapTool.layer); //与场景中的障碍物碰撞
        this.game.physics.arcade.collide(this.bullets, mapTool.layer, this.hitDfAction); //子弹击中墙
        if (mapTool.groups) {
            for (var i = 0; i < mapTool.groups.length; i++) {
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
    };
    //进入泥潭
    Car.prototype.comeNi = function (a, b) {
        a.tint = 0x00ff00;
        if (this.canMoveTu) {
            this.moveSpeed = 100;
        }
        else {
            this.moveSpeed = 1;
        }
    };
    //进入泥潭冰区
    Car.prototype.comeBing = function (a, b) {
        a.tint = 0xff0000;
        if (this.canMoveBing) {
            this.moveSpeed = 100;
        }
        else {
            this.moveSpeed = 1;
        }
    };
    Car.prototype.eatOil = function (a, b) {
        if (this.eatKg) {
            this.bulletsCount++;
            b.kill();
            if (!this.audio_eat.isPlaying) {
                this.audio_eat.play();
            }
            this.eatKg = false;
        }
    };
    //吃木头
    Car.prototype.eatWood = function (a, b) {
        if (this.eatKg) {
            this.canMoveTu = true;
            b.kill();
            this.eatKg = false;
        }
    };
    //吃防滑链
    Car.prototype.eatTieLian = function (a, b) {
        if (this.eatKg) {
            this.canMoveBing = true;
            b.kill();
            this.eatKg = false;
        }
    };
    Car.prototype.hitDfAction = function (a, b) {
        if (b.index == T_WALL) { //击中墙
            mapTool.map.putTile(T_FLOOR, b.x, b.y, mapTool.layer);
        }
        a.kill(); //子弹消失
    };
    Car.prototype.attrack = function (a, b) {
        a.kill();
        if (!this.audio_bz.isPlaying) {
            this.audio_bz.play();
        }
        b.animations.play("bz").onComplete.add(function () {
            b.kill();
        }, this);
    };
    Car.prototype.eats = function (a, b) {
        if (this.eatKg) {
            b.kill();
            this.eatKg = false;
            if (!this.audio_eat.isPlaying) {
                this.audio_eat.play();
            }
            this.enterNext();
        }
    };
    Car.prototype.enterNext = function () {
        var me = this;
        var next1 = this.game.add.sprite(this.game.width / 2, 200, "next");
        next1.anchor.set(0.5, 0.5);
        next1.scale.set(0.8, 0.8);
        var tw = this.game.add.tween(next1).to({ alpha: 1 }, 5000, "Linear", true);
        tw.onComplete.add(function () {
            mapTool.curr_index++;
            me.start_gm();
            next1.destroy();
        });
    };
    Car.prototype.eat = function () {
        this.eatKg = true;
    };
    Car.prototype.runAction = function () {
        for (var i = 0; i < this.actions.length; i++) {
            if (this.actions[i]) {
                this.actions[i].action();
            }
        }
    };
    Car.prototype.removeAction = function (name) {
        for (var i = 0; i < this.actions.length; i++) {
            if (this.actions[i].name == name) {
                this.actions.splice(i, 1);
            }
        }
    };
    Car.prototype.clearActions = function () {
        this.actions = [];
    };
    Car.prototype.addAction = function (name, act) {
        if (act) {
            this.actions.push({ action: act, name: name, index: this.actions.length });
        }
    };
    Car.prototype.flow = function () {
        this.gun.x = this.x;
        this.gun.y = this.y;
        this.moveSpeed = 100;
    };
    Car.prototype.getP = function () {
        this.lastP = new Phaser.Point(this.x, this.y);
        this.moveTime = new Date().getTime();
        // return {time: this.moveTime, position: this.lastP};
    };
    //改变外壳
    Car.prototype.changeSkin = function (frame) {
        this.frame = frame;
        this.texture.baseTexture = this.game.cache.getBaseTexture(frame);
    };
    /**
     * 发射炮弹
     */
    Car.prototype.fire = function () {
        if (this.bulletsCount > 0) {
            if (!this.audio_shoot.isPlaying) {
                this.audio_shoot.play();
            }
            var rotation = this.gun.rotation + Math.PI * 3 / 2;
            var bullet = new Bullet(this.game, this.x, this.y, "zd");
            bullet.body.velocity.y = bullet.mSpeed * Math.sin(rotation);
            bullet.body.velocity.x = bullet.mSpeed * Math.cos(rotation);
            this.bullets.addChild(bullet);
            rotation = null;
            this.bulletsCount--;
        }
    };
    /**
     * 转动炮筒
     */
    Car.prototype.gunTurn = function (angle) {
        this.gun.rotation = angle * Math.PI / 180;
        if (!this.audio_gunt.isPlaying) {
            this.audio_gunt.play();
        }
    };
    Car.prototype.rotate = function (angle) {
        this.rotation = angle * Math.PI / 180;
    };
    /**
     * 向左移动
     * @param ds
     */
    Car.prototype.moveLeft = function (a) {
        if (!this.moveKg) {
            this.getP();
            this.moveKg = true;
            this.fx = "left";
            this.moveDs = Math.abs(a);
            if (!this.audio_move.isPlaying) {
                this.audio_move.play();
            }
        }
    };
    Car.prototype.moveDown = function (a) {
        if (!this.moveKg) {
            this.getP();
            this.moveKg = true;
            this.fx = "down";
            this.moveDs = Math.abs(a);
            if (!this.audio_move.isPlaying) {
                this.audio_move.play();
            }
        }
    };
    Car.prototype.moveUp = function (a) {
        if (!this.moveKg) {
            this.getP();
            this.moveKg = true;
            this.fx = "up";
            this.moveDs = Math.abs(a);
            if (!this.audio_move.isPlaying) {
                this.audio_move.play();
            }
        }
    };
    Car.prototype.moveRight = function (a) {
        if (!this.moveKg) {
            this.getP();
            this.moveKg = true;
            this.fx = "right";
            this.moveDs = Math.abs(a);
            if (!this.audio_move.isPlaying) {
                this.audio_move.play();
            }
        }
    };
    Car.prototype.stop = function () {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.moveDs = 0;
        this.fx = "";
        this.moveKg = false;
        this.moveTime = 0;
    };
    Car.prototype.outTime = function () {
        if ((new Date().getTime() - this.moveTime) / 1000 >= 2) {
            this.stop();
        }
    };
    Car.prototype.moveAction = function () {
        if (this.moveKg) {
            if (this.fx == "left") {
                if (this.lastP.x - this.x < this.moveDs) {
                    this.body.velocity.x = -this.moveSpeed;
                    this.body.velocity.y = 0;
                    this.outTime();
                }
                else {
                    this.stop();
                }
            }
            else if (this.fx == "right") {
                if (this.x - this.lastP.x < this.moveDs) {
                    this.body.velocity.x = this.moveSpeed;
                    this.body.velocity.y = 0;
                    this.outTime();
                }
                else {
                    this.stop();
                }
            }
            else if (this.fx == "up") {
                if (this.lastP.y - this.y < this.moveDs) {
                    this.body.velocity.y = -this.moveSpeed;
                    this.body.velocity.x = 0;
                    this.outTime();
                }
                else {
                    this.stop();
                }
            }
            else if (this.fx == "down") {
                if (this.y - this.lastP.y < this.moveDs) {
                    this.body.velocity.y = this.moveSpeed;
                    this.body.velocity.x = 0;
                    this.outTime();
                }
                else {
                    this.stop();
                }
            }
        }
    };
    Car.prototype.hide = function () {
        this.visible = false;
    };
    Car.prototype.display = function () {
        this.visible = true;
    };
    Car.prototype.start_gm = function () {
        mapTool.curr_index++;
        mapTool.display(mapTool.curr_index);
        tank = new Car(this.game, 144, 144, "tank");
        tank.width = 32;
        tank.height = 32;
        this.game.camera.follow(tank);
    };
    return Car;
}(Phaser.Sprite));
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(game, x, y, frame) {
        var _this = _super.call(this, game, x, y, frame) || this;
        _this.x = x;
        _this.y = y;
        _this.game = game;
        _this.frame = frame;
        _this.owner = null;
        _this.mSpeed = 150;
        _this.anchor.set(0.5, 0.5);
        _this.game.physics.arcade.enable(_this);
        _this.body.checkWorldBounds = true;
        _this.body.outOfBoundsKill = true;
        return _this;
    }
    return Bullet;
}(Phaser.Sprite));
