//hi%20who%20are%20you?
import axios from "axios";

const config = {
    name: "chrono",
    isHidden: true,
    description: "",
    version: "preview",
    credits: ""
};

const langData = {
    en_US: {
        success:
            `\n Chrono AI` +
            `\n━━━━━━━━━━━━━━━━━━` +
            `\n {result}` +
            `\n━━━━━━━━━━━━━━━━━━`,
        err: `An error occured while fetching the result`,
        no_prompt: `No prompt provided.`
    }
};

async function reply({ message, getLang }) {
    const { api } = global;
    const prompt = message.body;
    console.log(prompt);

    await message.react("🕜");
    try {
        const { data } = await axios.get(
            `https://deku-rest-api.gleeze.com/api/cyberchrono?q=${prompt}`
        );
        console.log(data);
        await message.react("✅");
        await message
            .reply(
                getLang("success", {
                    result: data.result
                })
            )
            .then(m => m.addReplyEvent({ callback: reply }));
    } catch (e) {
        await message.react("❌");
        await message.reply(getLang("err"));
        return console.error(e);
    }
}

async function onCall({ message, args, getLang }) {
    const { api } = global;
    const prompt = args.join(" ");

    if (!prompt || prompt.trim()?.length <= 0) {
        return message.reply(getLang("no_prompt"));
    }

    await message.react("🕜");
    try {
        const { data } = await axios.get(
            `https://deku-rest-api.gleeze.com/api/cyberchrono?q=${prompt}`
        );
        await message.react("✅");
        await message
            .reply(
                getLang("success", {
                    result: data.result
                })
            )
            .then(m => m.addReplyEvent({ callback: reply }));
    } catch (e) {
        await message.react("❌");
        await message.reply(getLang("err"));
        return console.error(e);
    }
}

export default {
    config,
    langData,
    onCall
};
