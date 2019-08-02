var game=null;
var tank;
class A {
    loadState;
    gameState;
    width;
    height;
    constructor() {
          this.height=window.innerHeight-100;
          this.width=window.innerWidth-20;

           game = new Phaser.Game({
                "width":this.width,
                "height":this.height,
                "renderer":Phaser.CANVAS,
                "resolution": 1,
                "transparent": true,
                "parent":'canv'
            });
        this.loadState = new LoadState(game);
        this.gameState = new GameState(game);
        game.state.add("loadState", this.loadState);
        game.state.add("gameState", this.gameState);
        game.state.start("loadState");
    }
}

window.onload = function () {
    var games = new A();
};

class LoadState extends Phaser.State {
    game;
    constructor(game) {super();this.game = game;}
    private create() {
        this.load_anm();
        this.game.load.onFileComplete.add(this.filePross, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        this.load_res(this.game);
    }
    private load_res(game) {
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.load.image("tank","res/tank2.png");
        game.load.image("tankm","res/tankm.png");
        game.load.image("tankn","res/tankn.png");
        game.load.image("hp","res/hp.png");
        game.load.image("zd","res/zd.png");
        // game.load.image("fk","res/fk.png");
        game.load.image("ni","res/ni.png");
        game.load.image("lz","res/lz.png");
        game.load.image("next","res/next.png");
        game.load.image("bing","res/bin1.png");
        // game.load.image('imgn', 'res/imgn.png',32,32);
        game.load.image('ma1', 'res/ma1.png',32,32);
        game.load.tilemap('map0', 'res/map_x_0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map1', 'res/map_x_1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map2', 'res/map_x_2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map3', 'res/map_x_3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map4', 'res/map_x_4x.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map5', 'res/map_x_5.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map6', 'res/map_x_6.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map7', 'res/map_x_7.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map8', 'res/map_x_8.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map9', 'res/map_x_9.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map10', 'res/map_x_10.json', null, Phaser.Tilemap.TILED_JSON);

        game.load.image("tip","res/tips.png");
        game.load.audio('bz', 'res/audio/jizhong.mp3');
        game.load.audio('shoot', 'res/audio/shoot.mp3');
        game.load.audio('gunt', 'res/audio/gunTurn.mp3');
        game.load.audio('eat', 'res/audio/eat.mp3');
        game.load.audio('click', 'res/audio/click.mp3');
        game.load.audio('tankmove', 'res/audio/tankmoveo.mp3');
        game.load.audio('change', 'res/audio/change.mp3');


        game.load.atlas('gems', 'res/gems.png', 'res/gems.json');
        game.load.spritesheet('bm', 'res/bm.png', 50, 50, 7);
        this.game.load.start();
    }

    private load_anm() {
        var me=this;
        for(let i=0;i<50;i++){
            let text=this.game.add.text(Math.random()*this.game.world.width,Math.random()*this.game.world.height,"AI人工智能");
            text.anchor.set(0.5);
            text.align = 'center';
            text.font = 'Arial';
            text.fontWeight = 'bold';
            text.fontSize = Math.random()*30;
            text.fill = this.getRandomColor();
            text.alpha=(Math.random()*10)/10;
            text.update=function(){
                this.alpha+=0.01;
                this.x+=2;
                if(this.x>=me.game.world.width ){
                    this.x=0;
                }
                if(this.alpha>=1){
                    this.alpha=0;
                }
            }
        }

    }
    getRandomColor() {
        var r = Math.round(Math.random() * 255), g = Math.round(Math.random() * 255),
            b = Math.round(Math.random() * 255);
        var color = r << 16 | g << 8 | b;
        return "#" + color.toString(16);
    }
    filePross(progress, cacheKey, success, totalLoaded, totalFiles) {}
    //资源完成
    loadComplete() {this.game.world.children=[];this.game.state.start('gameState');}
}


















/////////////////////////////////////////////////////////
class GameState extends Phaser.State {
    game;
    // tank;
    cursors;
    startKg;

    constructor(game) {
        super();
        this.game = game;
    }


    public preload() {

    }

    public create() {
        let me=this;
        let change=game.add.audio("change");
        DomUtil.init();
        mapTool.init(this.game);
         /**
          * 切换
          */
        let sel=document.getElementById("gm_map");
         for(let i=0;i<config.map.length;i++){
             sel.options.add(new Option((i+1)+"关",i));
         }
         sel.onchange=function(){
             if(!change.isPlaying){change.play();}
             mapTool.curr_index=this.value;
             me.strat_gm();

         }

        me.strat_gm();
         var tip=this.game.add.button(this.game.width/2,this.game.height/2,'tip',function(){
             tip.destroy();
         });
         tip.anchor.set(0.5,0.5);
         tip.scale.set(0.6,0.6);

    }

      strat_gm(){
          mapTool.display(mapTool.curr_index);
          tank = new Car(this.game, 144, 144, "tank");
          tank.width=32;
          tank.height=32;
           this.game.camera.follow(tank);

      }
}










