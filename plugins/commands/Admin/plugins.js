import { Assets } from "../../../core/handlers/assets.js";
import { loadPlugins } from "../../../core/var/modules/loader.js";
import {createDir, isExists} from "../../../core/var/utils.js"
import fs from "fs"
const __dirname = import.meta.dirname;
import path from "path";

const config = {
    name: "plugins",
    aliases: ["pl", "plg", "plugin"],
    description: "Manage plugins",
    usage: "[reload]/[list]/[install]",
    permissions: [2],
    credits: "XaviaTeam",
};

const langData = {
    en_US: {
        "result.reload": "Reloaded plugins, check console for more details",
        "result.list":
            "Commands: {commands}\nEvents: {events}\nOnMessage: {onMessage}\nCustoms: {customs}",
        "invalid.query": "Invalid query!",
        "error.unknow": "An error occurred, check console for more details",
    },
    vi_VN: {
        "result.reload":
            "Đã tải lại toàn bộ plugin, kiểm tra console để biết thêm chi tiết",
        "result.list":
            "Lệnh: {commands}\nSự kiện: {events}\nTrình xử lý tin nhắn: {onMessage}\nTùy chỉnh: {customs}",
        "invalid.query": "Lệnh không hợp lệ!",
        "error.unknow": "Đã xảy ra lỗi, kiểm tra console để biết thêm chi tiết",
    },
    ar_SY: {
        "result.reload":
            "إعادة تحميل جميع المكونات الإضافية ، تحقق من وحدة التحكم لمزيد من التفاصيل",
        "result.list":
            "امر: {commands}الأحداث: {events}\nمعالج الرسائل: {onMessage}\nالعادة: {customs}",
        "invalid.query": "أمر خاطئ!",
        "error.unknow": "حدث خطأ ما ، تحقق من وحدة التحكم لمزيد من التفاصيل",
    },
};

function Reload() {
  global.plugins.commands.clear();
            global.plugins.commandsAliases.clear();
            global.plugins.commandsConfig.clear();
            global.plugins.customs = 0;
            global.plugins.events.clear();
            global.plugins.onMessage.clear();

            for (const lang in global.data.langPlugin) {
                for (const plugin in global.data.langPlugin[lang]) {
                    if (plugin == config.name) continue;
                    delete global.data.langPlugin[lang][plugin];
                }
            }

            delete global.data.temps;
            global.data.temps = new Array();
}


/** @type {TOnCallCommand} */
async function onCall({ message, args, getLang, xDB: xDatabase }) {
  
    try {
      
        const query = args[0]?.toLowerCase();
        if (query === "reload") {
            Reload()
            await loadPlugins(xDatabase, Assets.gI());
            return message.reply(getLang("result.reload"));
        } else if (query == "list") {
            return message.reply(
                getLang("result.list", {
                    commands: global.plugins.commands.size,
                    events: global.plugins.events.size,
                    onMessage: global.plugins.onMessage.size,
                    customs: global.plugins.customs,
                })
            );
        } else if(query == "install") {
            
            const fileName = args[1] || null;
            const dirname = args[2];
            if(!fileName || !fileName.endsWith(".js")) return message.reply("File name should end with '.js' extension.");
            if(!dirname) return message.reply("No directory provided.");
            const dirPath = path.join(__dirname, `../${dirname}`)
            
            
            const code = args.slice(3).join(" ");
            const _path = path.join(__dirname, `../${dirname}/${fileName}`)
            if(!isExists(dirPath, "dir")) {
              createDir(dirPath)
            }
            fs.writeFileSync(_path, code);
            message.reply("Done!")
            
        }
    } catch (e) {
        console.error(e);
        message.reply(getLang("error.unknow"));
    }
}

export default {
    config,
    langData,
    onCall,
};
