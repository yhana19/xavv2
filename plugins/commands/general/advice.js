import axios from 'axios'

const config = {
  name: "advice"
}

const onCall = async ({message}) => {
  const {api} = global;
 const t = await message.reply("Fetching...")
  try {
     const {data: result} = await axios.get("https://ace-rest-api.onrender.com/api/advice?type=random")
    return api.editMessage(t.messageID, result.slip.advice);
  } catch (error) {
     console.error(error)
    return api.editMessage(t.messageID, "[!] An error occured while fetching the advice.")
  }
  
}


export default {
  config,
  onCall
}