import axios from "axios";

const config = {
  name: "shoti"
}

async function onCall({message}) {
  await message.react("🕑")
  try {
     const {data: res} = await axios.get("https://hiroshi-api.onrender.com/video/eabab");
    const {data: vid} = await axios.get(res.link, {responseType: "stream"});

    await message.react("")
    return message.reply({
      body: `\nTitle: ${res.title}\nUsername: ${res.username}\nDisplay: ${res.displayname}`,
      attachment: vid});
    
  } catch (e) {
    await message.react("❌")
     console.error(e)
    return message.reply("An error occurred while fetching the video.")
  }
  
}


export default {
  config,
  onCall
}