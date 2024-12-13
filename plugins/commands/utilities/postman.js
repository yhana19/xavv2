import axios from "axios"
import isUrl from "is-url"

const config = {
  name: "pm"
}

const onCall = async ({message,args}) => {
  const method = args[0]?.toLowerCase();
  const inp = args.join(" ").split("|")
  const r = new RegExp(`${method}`)
  const url = inp[0]?.replace(r, "").trim();
  const params = inp[1] ? JSON.parse(inp[1]) : null;

  if(!["post","get"].includes(method)) {
    return message.reply("[!] Usage: pm [post | get] [url]")
  }
    if(!isUrl(url)) {
      console.log(url)
    return message.reply("Invalid url.")
    }
  try {
     switch(method) {
       case "post": {
         message.reply("Currently not available. Working on it.")
         break;
     }
       case "get": {
         const what = await axios.get(url, {
           params
         })
         if(what.headers["content-type"]?.includes("image/")) {
           const {data: img} = await axios.get(url, {responseType: "stream"})

           return message.reply({attachment: img})
         }
         return message.reply(`Response: ${data}`)
       } 
     }
  } catch (e) {
    console.error(e)
    return message.reply("An error occured!")
  }

 
}

export default {
  config,
  onCall
  
}