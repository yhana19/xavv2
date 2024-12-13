import axios from 'axios';

const config = {
  name: "lm"
}
const reply = async function({eventData, message}) {
  if(message.senderID !== eventData.author) return message.reply("[!] This session is already occupied by user: " + eventData.author);
  
  const q = message.body;
    await message.react("🔎");
  try {
    
     const {data: result} = await axios.get(`https://ace-rest-api.onrender.com/api/llama?prompt=${q}&id=${message.senderID}`)
    await message.react("");
    return message.reply(result.response).then(msg => msg.addReplyEvent({callback: reply, author: message.senderID}))
    
  } catch (e) {
     console.error(e)
    return message.reply("[!] An error occured while fetching the response.")
  }
}
const onCall = async function({args,message}) {
  const {api} = global;
  const q = args.join(" ");
  if(!q) return message.reply("[!] Usage: lm <prompt>");
  await message.react("🔎");
  try {
    
     const {data: result} = await axios.get(`https://ace-rest-api.onrender.com/api/llama?prompt=${q}&id=${message.senderID}`)
    await message.react("");
    return message.reply(result.response).then(msg => msg.addReplyEvent({callback: reply, author: message.senderID}))
    
  } catch (e) {
     console.error(e)
    return message.reply("[!] An error occured while fetching the response.")
  }
  
}


export default {
  config,
  onCall
}