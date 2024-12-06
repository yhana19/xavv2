import axios from "axios";
import fs from "fs";
import path from "path"
const __dirname = import.meta.dirname;
import {getRandomPassword} from "../../../core/var/utils.js";


const config = {
    name: "postmeme",
    description: "",
    version: "",
    credits: ""
};
async function Reply({ eventData, message, args }) {
    const { api } = global;
    try {
    switch (eventData.type) {
        case "uid": 
            let uid = "";
            const opt = message.body;
            if (opt == ".") {
                uid = eventData.uid;
            } else if (opt.length > 8) {
                uid = opt;
            }
            console.log(uid)
            message
                .send("Reply with the content of the post")
                .then(msg =>
                    msg.addReplyEvent({
                        callback: Reply,
                        type: "content",
                        uid
                    })
                );
        break;
        case "content": 
            const text = message.body;

            message
                .send("Reply with the name of the poster")
                .then(msg =>
                    msg.addReplyEvent({
                        callback: Reply,
                        type: "gen",
                        uid: eventData.uid,
                        text
                    })
                );
        break;
        case "gen": {
          const fileName = getRandomPassword(7) + ".jpg";
          const name = message.body;
          const {text, uid} = eventData;
          
         const temp = await message.reply("Initializing...");
         const {data} = await axios.get(`https://deku-rest-api.gleeze.com/canvas/fbpost?uid=${eventData.uid}&text=${text}&name=${name}`, {responseType: "arraybuffer"});
         const _buff = Buffer.from(data).toString("base64");
         const _path = path.join(__dirname, `../cache/${fileName}`);
         
         fs.writeFileSync(_path, _buff, {encoding: "base64"});
         await api.sendMessage({
           body: "",
           attachment: fs.createReadStream(_path)
         }, message.threadID);
         api.unsendMessage(temp.messageID, message.threadID, (e) => {
           if(e) return console.error(e)
         })
         fs.unlinkSync(_path)
         
        }
    }
    } catch(e) {
      console.error(e)
      message.reply("An error occured: " + e)
    }
}
function onCall({ message, args }) {
    message
        .send("Reply with the uid.\n\n(Default is your UID)")
        .then(msg => msg.addReplyEvent({ callback: Reply, type: "uid", uid: message.senderID }));
}

export default {
    config,
    onCall
};
