var mapTool = /** @class */ (function () {
    function mapTool() {
    }
    mapTool.init = function (game) {
        mapTool.game = game;
    };
    mapTool.display = function (a) {
        mapTool.game.world.children = [];
        if (a < config.map.length) {
            mapTool.curr_index = a;
        }
        else {
            mapTool.curr_index = 0;
        }
        mapTool.game.physics.startSystem(Phaser.Physics.ARCADE);
        var conf = config.map[a];
        if (conf) {
            //加载地图
            mapTool.map = mapTool.game.add.tilemap(conf.key);
            //设置titleImage
            // mapTool.map.addTilesetImage("imgn", "imgn");
            mapTool.map.addTilesetImage("ma1", "ma1");
            mapTool.map.setTileSize(32, 32);
            mapTool.map.orientation = "orthogonal";
            //设置图层
            mapTool.layer = mapTool.map.createLayer("layer0"); //, conf.layer[0].countX, conf.layer[0].countY, conf.layer[0].width, conf.layer[0].height);
            mapTool.layer.resizeWorld();
            //设置碰撞检测
            for (var k = 0; k < conf.collisionTile.length; k++) {
                mapTool.map.setCollision(conf.collisionTile[k]);
            }
            //设置活动的obj
            if (conf.obj.length > 0) {
                mapTool.groups = [];
                for (var t = 0; t < conf.obj.length; t++) {
                    var o = mapTool.game.add.group();
                    o.enableBody = true;
                    o.name = conf.obj[t].id;
                    o.setAll("body.immovable", "true");
                    //创造活动物体
                    mapTool.map.createFromObjects("obj0", conf.obj[t].titleIndex, conf.obj[t].anmTexture, conf.obj[t].frame, true, false, o);
                    //添加动画效果
                    if (conf.obj[t].haveAnm) {
                        if (conf.obj[t].sheet) {
                            o.callAll("animations.add", "animations", conf.obj[t].anmName, conf.obj[t].anmF, conf.obj[t].speed, conf.obj[t].loop);
                        }
                        else {
                            o.callAll("animations.add", "animations", conf.obj[t].anmName, (Phaser.Animation.generateFrameNames(conf.obj[t].anmF[0], conf.obj[t].anmF[1], conf.obj[t].anmF[2], "", 4)), conf.obj[t].speed, conf.obj[t].loop);
                        }
                        if (conf.obj[t].autoPlay) {
                            o.callAll("animations.play", "animations", conf.obj[t].anmName);
                        }
                    }
                    mapTool.groups.push(o);
                }
            }
        }
    };
    mapTool.game = null;
    mapTool.map = null;
    mapTool.layer = null;
    mapTool.groups = [];
    mapTool.curr_index = 0;
    return mapTool;
}());
