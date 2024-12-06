//who%20are%20you

import axios from "axios";

const config = {
    name: "herm",
    description: "Hermes Ai",
    version: "",
    credits: "Renz, API by Deku"
};

const langData = {
    en_US: {
        no_prompt: `No prompt provided.`,
        success:
            `\nHermes AI` +
            `\n━━━━━━━━━━━━━━━━━━` +
            `\n {result}` +
            `\n━━━━━━━━━━━━━━━━━━` +
            `\n Dev: Renz`,
        err: `An error occured: {e}`,
        err_503: `The API is currently down for the moment. Please try again later.`
    }
};

async function onCall({ message, args, getLang }) {
    const { api } = global;
    const prompt = args.join(" ");

    if (!prompt || prompt.trim().length == 0) {
        return message.reply(getLang("no_prompt"));
    }
    message.react("⏳");
    try {
        const { data } = await axios.get(
            `https://deku-rest-apis.ooguy.com/ai/hermes-2-pro?q=${prompt}&uid=${message.senderID}`
        );

        await message.react("✅")
        message.reply(
            getLang("success", {
                result: data.result
            })
        );
    } catch (e) {
      await message.react("❌")
        if (e.response.status == 503) {
            await message.reply(getLang("err_503"));
            console.log(e);
        } else {
            await message.reply(
                getLang("err", {
                    e
                })
            );
            console.error(e);
        }
    }
}

export default {
    config,
    langData,
    onCall
};
