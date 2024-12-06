import axios from "axios";


const config = {
  name: "ai"
}

async function onCall({message,args}) {
  const prompt = args.join(" ");
  const {api} = global;
  if(!prompt) return message.reply("Usage: ai <prompt>");
  const temp = await message.reply("Fetching...");
  try {
   const {data} = await axios.get(`https://api.kenliejugarap.com/blackbox-claude/?text=${prompt}`);
   
   api.editMessage(data.response, temp.messageID, message.threadID)
   
  } catch (e) {
    console.error(e);
    return message.reply("An error occurrd while fetching the response.")
  }
}

export default {
  config,
  onCall
}