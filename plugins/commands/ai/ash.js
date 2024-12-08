const config = {
  name: "ash"
}

import axios from "axios";

const onCall = async ({message,args}) => {
  const {api} = global;
  const tite = args.join(" ");
  if(!tite) {
    return message.reply("prompt pukinanginamo")
  }
  const puke = await message.reply("...")
  try {


		
    const {data} = await axios.get(`https://markdevs-last-api-2epw.onrender.com/api/ashley?query=${encodeURIComponent(tite)}`);

    return api.editMessage(data.result,puke.messageID)
  } catch (e) {
   console.error(e)
    return message.reply("Bobo, error")
  }
}
  export default {
  onCall,
  config
  }


