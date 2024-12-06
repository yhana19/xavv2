import axios from "axios";
import fs from "fs";
import path from "path";
import {getRandomPassword} from "../../../core/var/utils.js";
const __dirname = import.meta.dirname;

const config = {
  name: "art",
  description: "Create AI Arts",
  version: "preview",
  credits: "renz"
}

async function onCall({message, args}) {
  const prompt = args.join(" ");
  const {api} = global;
  const {messageID, threadID} = message;
  if(!prompt) return;
  
  message.react("⏳");
  try {
    const fileName = getRandomPassword(8) + ".jpg";
    const {data} = await axios.get(`https://deku-rest-api.gleeze.com/api/art?prompt=${prompt}`, {responseType: "arraybuffer"});
    const _64 = Buffer.from(data).toString("base64");
    const _img = path.join(__dirname, `../cache/${fileName}`);
    
    fs.writeFileSync(_img, _64, {encoding: "base64"});
    
    await api.sendMessage({
      body: prompt,
      attachment: fs.createReadStream(_img)
    }, threadID, messageID)
    
    fs.unlinkSync(_img)
    
  } catch(e) {
    
  }
}

export default {
  config,
  onCall
}