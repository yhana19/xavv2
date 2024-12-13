
import axios from 'axios'
const config = {
  name: "bible",
}

const onCall = async function({message: msg}) {
  try {
     const {data} = await axios.get('https://ace-rest-api.onrender.com/api/bibleverse');
    return msg.reply(data)
  } catch (e) {
     console.error(e.data ? e.data : e)
    return msg.reply("[!] An error occured while fetching the bible verse. \n\nContact admin if the error persist.")
  }
  
}

export default {
  config,
  onCall
}