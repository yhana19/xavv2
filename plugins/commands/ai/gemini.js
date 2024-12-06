import axios from "axios";

const config = {
        name: "ask",
        credits: "Renz",
        version: "0.0.1",
        description: "Gemini ai bot",
        role: 0,
        guide: { en: "{pn} <prompt> || {pn} what is biology?" }
    }

export default {
    config,
    onCall: async function ({message, args}) {
      const {api} = global;
        let input = args.join(" ");
        const { messageID, threadID } = message;
        try {
     if(!input || input.trim()?.length === 0){
       console.error("Error");

}
                if (message.type == "message_reply" && message.messageReply.attachments.length > 0) {
                    const fileUrl = message.messageReply.attachments[0].url;
                    
                    
                    let temp_1 = await message.reply("Analyzing..");
              const res = await axios.get(
                        `https://geminiapi-yj48.onrender.com/ai?q=${encodeURIComponent(input)}&image=${encodeURIComponent(fileUrl)}`
                    );
                    api.editMessage(
                      `Gemini // ${res.data.time}\n ━━━━━━━━━━━━━━━━━━\n${res.data.message}
                    `, temp_1.messageID, threadID, messageID)
                    } else if(message.messageReply &&
                    message.messageReply.senderID == api.getCurrentUserID()) {
               
                    input = message.body;

                    if (!input) {
                        return message.reply(
                            "You must provide a prompt. E.g. What is testicles?"
                        );
                    }

                    const temp_2 = await message.reply("•••");

                    const res_2 = await axios.get(`https://geminiapi-yj48.onrender.com/ai?q=${encodeURIComponent(input)}`);

                    api.editMessage(
                      `Gemini // ${res_2.data.time}\n ━━━━━━━━━━━━━━━━━━\n${res_2.data.message}\n━━━━━━━━━━━━━━━━━━`, temp_2.messageID, threadID, messageID)
                    } else {
                
                    const temp_3 = await message.reply("Replying...");

                    const res_3 = await axios.get(`https://geminiapi-yj48.onrender.com/ai?q=${encodeURIComponent(input)}`);

                    api.editMessage(
                      `Gemini // ${res_3.data.time}\n ━━━━━━━━━━━━━━━━━━\n${res_3.data.message}
                    `, temp_3.messageID, threadID, messageID)
            }
        } catch (e) {
            console.log(e);
            return message.reply(
                "An error occured. Contact admin for assistance."
            );
        }
    },
    onChat: async function({message, args, event, api}) {
      
    }
};
