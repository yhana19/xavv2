const config = {
  name: "flipcoin",
  description: "idk",
  version: "",
  credits: "Renkz"
}

function onCall({message, args}) {
  const r = Math.floor(Math.random() * 10);
  if(r < 5) {
    return message.reply("Its heads")
  } else {
    return message.reply("Its tails")
  }
}

export default {
  config,
  onCall
}