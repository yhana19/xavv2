import axios from "axios"

const config = {
  name: "ailyrics",
  description: "Generate music with AI",
  version: "",
  credits: ""
}

const langData = {
  en_US: {
    success: `\nAI LYRICS`
    + `\n━━━━━━━━━━━━━━━━━━`
    + `\n{lyrics}`
    + `\n━━━━━━━━━━━━━━━━━━`,
    err: `An error occured while fetching the data.`,
    generating: "Extracting ear melodic lyrics..."
  }
}

async function onCall({message, args,getLang}) {
  const {api} = global;
  const {messageID, threadID} = message;
  const prompt = args.join(" ");
  
  if(!prompt || prompt.trim()?.length <= 0) 
  return message.reply("No prompt provided.")
  
  const temp = await message.reply(getLang("generating"));
  try {
    const {data:{lyrics}} = await axios.get(`https://deku-rest-apis.ooguy.com/api/ailyrics?prompt=${prompt}`);
    
    api.editMessage(getLang("success", {lyrics}), temp.messageID, threadID, messageID)
    
    
  } catch(e) {
    await api.editMessage(getLang("err"), temp.messageID, threadID, messageID)
   return console.error(e);
    
  }
  
}

export default {
  config,
  langData,
  onCall
}