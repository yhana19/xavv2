import axios from "axios";

const config = {
  name: "cai",
  description: "Chat with character.ai",
  version: "beta",
  credits: "Renz, API by Deku"
}

async function reply({eventData, message, args}) {
  switch(eventData.type) {
    case "message": {
      const msg = message.body;
      message.react("🕜");
      const {data} = await axios.get(`https://deku-rest-api.gleeze.com/cai/chat?q=${msg}&character=tsundere maid&uid=${eventData.uid}`);
      message.send(data.result).then(msg => msg.addReplyEvent({callback: reply, type: "message"}));
    }
  }
}



async function onCall({message, args}) {
  
  const {api} = global;
  const opt = args[0];
  if(!["init", "-i"].includes(opt)) return message.reply("Invalid option provided.\n\n Contact Renz Malacas Mansueto for guidance.");
  
  switch(opt) {
    case "init":
    case "-i":
      const name = args[1];
      if(!name || name.trim()?.length <= 0) {
        return message.reply("No name provided for roleplay.")
      }
      message.send(`User name is: ${name}\n\n Reply on this message with your initial message.`).then(msg => msg.addReplyEvent({callback: reply, type: "message", uid: message.senderID}))
  }
  
}

export default {
  config,
  onCall
}