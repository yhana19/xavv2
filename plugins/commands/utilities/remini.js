import axios from "axios"

const config = {
  name: "remini"
}

async function onCall({message}) {
  if(message.type !== "message_reply" && !message.messageReply.attachments) {
    return message.reply("You must reply to an image/photo")
  }
  await message.reply("🕑")
  try {
     const url = message.messageReply.attachments[0].url;
    const {data: result} = await axios.get(`https://api.kenliejugarap.com/imgupscaled/?imgurl=${encodeURIComponent(url)}`);
    const {data:strm} = await axios.get(result.response, {responseType: "stream"});
    strm.path = "upscaled-" + message.senderID + ".jpg";

    return message.reply({body: "Here's your upscaled image!", attachment: strm})
  } catch (e) {
     console.error(e)
    return message.reply("An error occurred. Try again later.")
  }
  
}

export default {
  onCall,
  config
}