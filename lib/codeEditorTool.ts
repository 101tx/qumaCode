function ks(action) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            action();
            resolve("resolved");
        }, 2000);
    });
}

async function act(sz) {
    if (sz.length > 0) {
        ks(function () {
            try {
                window.eval(sz[0].cm);
            } catch (e) {
                alert("第" + sz[0].line + "行出现错误! 请在控制台查看错误！");
                console.log(e);
            }
            codeEditorTool.mark(sz[0].line);
            console.log("执行完成:" + sz[0].cm);
        }).then(function () {
            codeEditorTool.mark_kg = true;
            codeEditorTool.editor.setGutterMarker(sz[0].line - 1, "breakpoints", null);
            if (sz.length == 1) {
                codeEditorTool.editor.setGutterMarker(sz[0].line, "breakpoints", null);
                codeEditorTool.actKg = true;
            }
            sz.splice(0, 1);
            act(sz);
        });
    }

}

class codeEditorTool {
    public static editor;
    public static mark_kg = true;
    public static cmd = [];
    public static actKg = true;
    public static restart;
    public static init() {
        codeEditorTool.restart=new Audio("./res/audio/restart.mp3");
        codeEditorTool.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            value: "",
            lineNumbers: true,
            mode: "javascript",
            keyMap: "sublime",
            autoCloseBrackets: true,
            matchBrackets: true,
            showCursorWhenSelecting: true,
            theme: "eclipse",
            tabSize: 2,
            gutters: ["CodeMirror-linenumbers", "breakpoints"]
        });


        codeEditorTool.editor.on("gutterClick", function (cm, n) {
            var info = cm.lineInfo(n);
            cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : codeEditorTool.makeMarker());
        });
        codeEditorTool.editor.setSize(window.innerWidth-20, window.innerHeight-100);


    }

    public static makeMarker() {
        var marker = document.createElement("div");
        marker.style.color = "#822";
        marker.style.fontSize = "20px";
        marker.innerHTML = "✌";
        return marker;
    }

    public static getCmd() {
        codeEditorTool.cmd = [];
        var s = codeEditorTool.editor.lastLine();
        for (var i = 0; i < s; i++) {
            var cds = codeEditorTool.editor.getLine(i + 1);
            if (cds) {
                codeEditorTool.cmd.push({cm: cds, line: i + 1, flag: true});
            }
        }
        return codeEditorTool.cmd;
    }


    public static makeCmd() {
        if (codeEditorTool.actKg) {
            codeEditorTool.actKg = false;
            codeEditorTool.restart.play();
            let listCmd = codeEditorTool.getCmd();
            act(listCmd);

        }
    }

    public static mark(n) {
        if (codeEditorTool.mark_kg) {
            codeEditorTool.editor.setGutterMarker(n, "breakpoints", codeEditorTool.makeMarker());
            codeEditorTool.mark_kg = false;
        }
    }


}


