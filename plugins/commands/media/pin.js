import axios from "axios";

const config = {
  name: "pin"
}

async function onCall({message,args}) {
  const inp = args.join(" ").split("-")

  
  const q = inp[0];
  const num = parseInt(inp[1]) || 5
  if(!q || isNaN(num)) {
    return message.reply("Usage: pin <query> -5");
  }
  if(num < 1 || num > 10) return message.reply("[!] Invalid amount of image. Image amount mustn't be lower than 1 and greater than 10.")
  await message.react("🔎")
  try {
     const {data: result} = await axios.get(`https://hiroshi-api.onrender.com/image/pinterest?search=${q}`);
    const pins = [];
    for(let i = 0; i < num; i++) {
      const {data: stream} = await axios.get(result.data[i], {responseType: "stream"});
      pins.push(stream)
    }
    await message.react("")
    return message.reply({attachment: pins})
    
  } catch (e) {
    await message.react("❌")
     console.error(e);
    return message.reply("An error occured.")
  }
  
}

export default {
  config,
  onCall
}