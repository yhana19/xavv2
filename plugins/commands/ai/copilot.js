import axios from "axios";

const config = {
    name: "copilot",
    description: "Microsoft Copilot AI",
    version: "Test",
    credits: "Renz"
};

async function fetchAi(prompt, uid) {
    try {
        const { data } = await axios.get(
            `https://deku-rest-apis.ooguy.com/api/copilot?prompt=${prompt}&uid=${uid}`
        );
        
        return data.result
    } catch (e) {
        console.error(e);
        throw new Error(e);
        return e;
    }
}

const langData = {
    en_US: {
        success:
            `\nMICROSOFT COPILOT` +
            `\n━━━━━━━━━━━━━━━━━━` +
            `\n{resp}` +
            `\n━━━━━━━━━━━━━━━━━━`
    }
};

async function reply({ message, getLang }) {
    const prompt = message.body;
    message.react("🕜");
    try {
        const res = await fetchAi(prompt, message.senderID);
       await message.react("✅");
        message
            .reply(getLang("success", { resp: res }))
            .then(m => m.addReplyEvent({ callback: reply }));
    } catch (e) {
        message.react("❌");
        console.error(e);
    }
}

async function onCall({ message, args, getLang }) {
    const prompt = args.join(" ");
    message.react("🕜");
    try {
        const res = await fetchAi(prompt, message.senderID);
        message.react("✅");
        message
            .reply(getLang("success", { resp: res }))
            .then(m => m.addReplyEvent({ callback: reply }));
    } catch (e) {
        message.react("❌");
        console.error(e);
    }
}

export default {
    config,
    langData,
    onCall
};
