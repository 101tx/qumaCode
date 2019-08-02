var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function ks(action) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            action();
            resolve("resolved");
        }, 2000);
    });
}
function act(sz) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (sz.length > 0) {
                ks(function () {
                    try {
                        window.eval(sz[0].cm);
                    }
                    catch (e) {
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
            return [2 /*return*/];
        });
    });
}
var codeEditorTool = /** @class */ (function () {
    function codeEditorTool() {
    }
    codeEditorTool.init = function () {
        codeEditorTool.restart = new Audio("./res/audio/restart.mp3");
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
        codeEditorTool.editor.setSize(window.innerWidth - 20, window.innerHeight - 100);
    };
    codeEditorTool.makeMarker = function () {
        var marker = document.createElement("div");
        marker.style.color = "#822";
        marker.style.fontSize = "20px";
        marker.innerHTML = "✌";
        return marker;
    };
    codeEditorTool.getCmd = function () {
        codeEditorTool.cmd = [];
        var s = codeEditorTool.editor.lastLine();
        for (var i = 0; i < s; i++) {
            var cds = codeEditorTool.editor.getLine(i + 1);
            if (cds) {
                codeEditorTool.cmd.push({ cm: cds, line: i + 1, flag: true });
            }
        }
        return codeEditorTool.cmd;
    };
    codeEditorTool.makeCmd = function () {
        if (codeEditorTool.actKg) {
            codeEditorTool.actKg = false;
            codeEditorTool.restart.play();
            var listCmd = codeEditorTool.getCmd();
            act(listCmd);
        }
    };
    codeEditorTool.mark = function (n) {
        if (codeEditorTool.mark_kg) {
            codeEditorTool.editor.setGutterMarker(n, "breakpoints", codeEditorTool.makeMarker());
            codeEditorTool.mark_kg = false;
        }
    };
    codeEditorTool.mark_kg = true;
    codeEditorTool.cmd = [];
    codeEditorTool.actKg = true;
    return codeEditorTool;
}());
