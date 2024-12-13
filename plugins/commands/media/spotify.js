import axios from "axios";

const config = {
  name: "spotify"
}

async function onCall({message, args}) {
  const query = args.join(" ");
  const artist = query.split("|")[1] || "";
  const {api} = global;
  if(!query) return message.reply("Usage: spotify <query> | artist (optional)");
  try {
    const {data} = await axios.get(`https://ace-rest-api.onrender.com/api/spotify?search=${query}&artist=${artist}`);
    
    const {data: imgSt} = await axios.get(data.track.album_image, {responseType: "stream"});
    const {data: mp3St} = await axios.get(data.download.download_url, {responseType: "stream"});
    
    
   const temp = await message.reply({attachment: imgSt});
    
   return api.sendMessage({attachment: mp3St}, message.threadID, temp.messageID)
  } catch (e) {
    console.error(e)
  }
}

export default {
  onCall,
  config
}