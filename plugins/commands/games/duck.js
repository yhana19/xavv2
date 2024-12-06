const config = {
  name: "duck",
  description: "Inspired from the game Clusterduck",
  version: "preview",
  credits: "Renz"
}
const langData = {
  en_US: {
    
  }
}
function onCall({usersData, args, message,getLang}) {
  const opt = args[0]?.toLowerCase();
  if(!opt) {
    return message.reply("No action provided. Please refer to help command.")
  }
}

export default {
  config,
  onCall
}