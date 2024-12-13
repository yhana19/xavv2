import axios from 'axios'

const config = {
  name: "nglspam"
}

const onCall = async function({args,message}) {
  const {api} = global;
  const inp = args.join(" ").split("|")
  const name = inp[0];
  const msg = inp[1]; 
  const num = parseInt(inp[2]) || null;
  
  if(!name || !msg || isNaN(num) || !num) {
    return message.reply("[!] Usage: nglspam <user> | <msg> | <amount>\n\nExample: nglspam Renz | Hello from nglspam | 10");
    
  }
  if(num < 1 ) return;
  try {
     const {data} = await axios.get(`https://ace-rest-api.onrender.com/api/nglspam?username=${name}&amount=${num}&message=${msg}`)
    return message.reply("Sent!")
  } catch (e) {
     console.error(e)
    return message.reply("[!] An error occured while sending the spam.")
  }
  
}

export default {
  config,
  onCall
}