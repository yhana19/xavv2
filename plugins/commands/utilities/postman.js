import axios from "axios"
import isUrl from "is-url"

const config = {
  name: "pm"
}

const onCall = async ({message,args}) => {
  const method = args[0].toLowerCase();
  const url = args[1];


  if(!["post","get"].includes(method)) {
    return message.reply("Usage: pm [post | get] [url]")
  }
    if(!isUrl(url)) {
    return message.reply("Invalid url.")
    }
  try {
     switch(method) {
       case "post": {
         message.reply("Currently not available. Working on it.")
         break;
     }
       case "get": {
         const {data} = 
await axios.get(url);
         return message.reply(`Response: ${data}`)
       } 
     }
  } catch (error) {
    console.error(e)
    return message.reply("An error occured!")
  }

 
}

export default {
  config,
  onCall
  
}