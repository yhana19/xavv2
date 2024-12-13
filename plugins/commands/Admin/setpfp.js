import axios from 'axios';
import isUrl from 'is-url'

const config = {
  name: "setpfp",
  permission: [2]
}


async function onCall({args,message}) {
  return await new Promise((r,e) => {
    const {api} = global;
    
    if(message.type == "message_reply" && message.messageReply.attachments.length > 0) {
      const url = message.messageReply.attachments[0].url;
     return api.changeAvt(url, null, (err) => {
       if(err) throw err
       else return message.reply("Done");
       
     }).then(r).catch(e => console.error(e))
    } else {
      const url = args[0];
      
      if(isUrl(url)) {
        return api.changeAvt(url, null, (err) => {
          if(err) throw err
          else message.reply("Done")
        }).then(r).catch(e => console.error(e))
      } else {
        return message.reply("Please reply to an image or provide a link.")
        e();
      }
    }
  })
  
}


export default {
  onCall,
  config
}