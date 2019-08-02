var DomUtil = /** @class */ (function () {
    function DomUtil() {
    }
    DomUtil.init = function () {
        document.getElementById("gm_bottom").style.display = "block";
        document.getElementById("canv").style.display = "block";
        document.getElementById("code").style.display = "block";
        document.getElementById("cmd_d").style.display = "block";
        codeEditorTool.init(); //初始化编辑;
        var clickd = new Audio("./res/audio/click.mp3");
        var backd = new Audio("./res/audio/back.mp3");
        var selectd = new Audio("./res/audio/select.mp3");
        /**
         *
         * 显示
         */
        var bt = document.getElementById("cmdCode_display");
        bt.onclick = function () {
            selectd.play();
            if (document.getElementsByClassName("CodeMirror")[0].style.visibility != "hidden") {
                document.getElementsByClassName("CodeMirror")[0].style.visibility = "hidden";
            }
            else {
                document.getElementsByClassName("CodeMirror")[0].style.visibility = "visible";
            }
        };
        var s = document.getElementsByClassName("cmdCode_bt");
        var _loop_1 = function (i) {
            s[i].onclick = function (e) {
                clickd.play();
                codeEditorTool.actKg = true;
                if (s[i].value == "left") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.moveLeft(32);");
                }
                else if (s[i].value == "right") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.moveRight(32);");
                }
                else if (s[i].value == "up") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.moveUp(32);");
                }
                else if (s[i].value == "down") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.moveDown(32);");
                }
                else if (s[i].value == "fire") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.fire();");
                }
                else if (s[i].value == "eat") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.eat();");
                }
                else if (s[i].value == "rotate") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.rotate(90)");
                }
                else if (s[i].value == "gunTurn") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.gunTurn(180);");
                }
                else if (s[i].value == "hide") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.hide();");
                }
                else if (s[i].value == "display") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.display();");
                }
                else if (s[i].value == "skin") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.changeSkin('tankm');");
                }
                else if (s[i].value == "action") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.addAction('myact',function(){tank.alpha+=-0.01;if(tank.alpha<=0){tank.alpha=1;}});");
                }
                else if (s[i].value == "removeAction") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.removeAction('myact');");
                }
                else if (s[i].value == "scale") {
                    codeEditorTool.editor.replaceSelection("\n" + "tank.scale.set(0.6,0.6);");
                }
            };
        };
        for (var i = 0; i < s.length; i++) {
            _loop_1(i);
        }
        var clear = document.getElementById("gm_clear");
        clear.onclick = function () {
            codeEditorTool.editor.setValue("//请输入代码;");
            backd.play();
        };
        var start = document.getElementById("gm_start");
        start.onclick = function () {
            /**
             * 全局eval处理函数，不加window则是局部的，定义变量要想第二次能用必须要使用全局
             */
            // try {
            //     window.eval(codeEditorTool.editor.getValue());
            // } catch (e) {
            //     alert("代码有错误！请在控制台查看详情");
            //     console.log(e);
            // }
            window.location.reload();
        };
        var runAction = document.getElementById("gm_action");
        runAction.onclick = function () {
            codeEditorTool.makeCmd();
        };
    };
    return DomUtil;
}());
