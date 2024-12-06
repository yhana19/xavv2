import axios from "axios";
import fs from "fs";
import path from "path";
import {getRandomPassword} from "../../../core/var/utils.js";
const __dirname = import.meta.dirname;

const config = {
  name: "musicgen",
  description: "Create AI Music",
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
    const fileName = getRandomPassword(8) + ".mp3";
    const {data} = await axios.get(`https://deku-rest-api.gleeze.com/api/aimusic?prompt=${prompt}`);
    const songBuffer = await axios.get(data.result.audio, {responseType: "arraybuffer"});
    
    const _64 = Buffer.from(songBuffer.data).toString("base64");
    const _song = path.join(__dirname, `../cache/${fileName}`);
    
    fs.writeFileSync(_song, _64, {encoding: "base64"});
    await message.react("✅")
    await api.sendMessage({
      body: prompt,
      attachment: fs.createReadStream(_song)
    }, threadID, messageID)
    
    fs.unlinkSync(_song)
    
  } catch(e) {
    message.react("❌")
    console.error(e)
  }
}

export default {
  config,
  onCall
}