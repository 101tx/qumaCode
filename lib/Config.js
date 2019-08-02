var T_DRESS = 161; //砖石
var T_EMTANK = 162; //敌方坦克
var T_WOOD = 311; //木料 帮助穿越泥潭
var T_BULLET = 163; //子弹 吃了增加子弹数
var T_TIELIAN = 164; //防滑链 帮助穿越冰区
var T_WALL = 497; //墙
var T_FLOOR = 1; //地砖
var T_FLOORA = 40; //地砖A;
var T_NI = 335; //泥
var T_BING = 310; //冰块
var T_TIE = 6; //铁墙
var T_TIEA = 26; //铁墙A
var T_TIEB = 46; //铁墙B
var T_TIEC = 66; //铁墙c
var T_ZAW = 97;
var config = {
    map: [
        { index: 0,
            key: "map0",
            collisionTile: [T_TIE, T_WALL, T_TIEA, T_TIEB, T_TIEC, T_ZAW],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ],
        },
        { index: 1,
            key: "map1",
            collisionTile: [T_TIE, T_WALL, T_TIEA, T_TIEB, T_TIEC],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ],
        },
        { index: 2,
            key: "map2",
            collisionTile: [T_TIE, T_WALL, T_TIEA, T_TIEB, T_TIEC],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "tankem",
                    titleIndex: T_EMTANK,
                    anmTexture: "bm",
                    frame: 0,
                    haveAnm: true,
                    sheet: true,
                    anmF: [0, 1, 2, 3, 4, 5, 6],
                    anmName: "bz",
                    speed: 10,
                    loop: false,
                    autoPlay: false
                }, {
                    id: "cn",
                    titleIndex: T_WOOD,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["diamond_", 0, 14],
                    anmName: "ds_m1",
                    speed: 12,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "cb",
                    titleIndex: T_TIELIAN,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["prism_", 0, 4],
                    anmName: "ds_m2",
                    speed: 12,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "ni",
                    titleIndex: T_NI,
                    anmTexture: "ni",
                    frame: 0,
                    haveAnm: false,
                    sheet: true,
                    anmF: [0, 1, 2, 3, 4, 5, 6],
                    anmName: "bz",
                    speed: 10,
                    loop: false,
                    autoPlay: false
                }, {
                    id: "bing",
                    titleIndex: T_BING,
                    anmTexture: "bing",
                    frame: 0,
                    haveAnm: false,
                    sheet: true,
                    anmF: [0, 1, 2, 3, 4, 5, 6],
                    anmName: "bz",
                    speed: 10,
                    loop: false,
                    autoPlay: false
                }
            ],
        },
        { index: 3,
            key: "map3",
            collisionTile: [T_TIE, T_WALL, T_TIEA, T_TIEB, T_TIEC, T_ZAW],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ],
        }, { index: 4,
            key: "map4",
            collisionTile: [T_TIE, T_WALL, T_TIEA, T_TIEB, T_TIEC, T_ZAW],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ],
        },
        { index: 5,
            key: "map5",
            collisionTile: [T_TIE, T_WALL, T_TIEB, T_TIEC],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "oil",
                    titleIndex: T_BULLET,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["prism_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ]
        },
        { index: 6,
            key: "map6",
            collisionTile: [T_TIE, T_WALL, T_TIEB, T_TIEC],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "oil",
                    titleIndex: T_BULLET,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["prism_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ]
        },
        { index: 7,
            key: "map7",
            collisionTile: [T_TIE, T_WALL, T_TIEB, T_TIEC],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "oil",
                    titleIndex: T_BULLET,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["prism_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ]
        },
        { index: 8,
            key: "map8",
            collisionTile: [T_TIE, T_WALL, T_TIEB, T_TIEC],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "oil",
                    titleIndex: T_BULLET,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["prism_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ]
        },
        { index: 9,
            key: "map9",
            collisionTile: [T_TIE, T_WALL, T_TIEB, T_TIEC],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "oil",
                    titleIndex: T_BULLET,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["prism_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ]
        }, { index: 10,
            key: "map10",
            collisionTile: [T_TIE, T_WALL, T_TIEA, T_TIEB, T_TIEC, T_ZAW],
            obj: [{
                    id: "dress",
                    titleIndex: T_DRESS,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }, {
                    id: "bing",
                    titleIndex: T_BING,
                    anmTexture: "bing",
                    frame: 0,
                    haveAnm: false,
                    sheet: false,
                    anmF: ["ruby_", 0, 6],
                    anmName: "ds_m",
                    speed: 10,
                    loop: false,
                    autoPlay: false
                }, {
                    id: "cb",
                    titleIndex: T_TIELIAN,
                    anmTexture: "gems",
                    frame: 0,
                    haveAnm: true,
                    sheet: false,
                    anmF: ["diamond_", 0, 15],
                    anmName: "ds_m",
                    speed: 10,
                    loop: true,
                    autoPlay: true
                }
            ],
        },
    ]
};
