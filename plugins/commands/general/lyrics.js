//https://deku-rest-api.gleeze.com/search/lyrics?q=never%20gonna%20give%20you%20up
import axios from "axios";
import fs from "fs";
import path from "path";
const __dirname = import.meta.dirname;
import {getRandomPassword} from "../../../core/var/utils.js";

const dev = "Renz";
const config = {
    name: "lyrics",
    description: "Find the lyrics of the song",
    version: "1",
    credits: "Renz, API by Deku"
};

const langData = {
    en_US: {
        found:
            `Artist: {artist}` +
            `\nSong title: {title}` +
            `\nLyrics:` +
            `\n━━━━━━━━━━━━━━━━━━` +
            `\n{lyrics}\n` +
            `\n━━━━━━━━━━━━━━━━━━` +
            `\n Dev: {dev}`,
        api_err: "Oops, the API returned an error.",
        error: `Ooh-oh. An error occured while trying to find that one. Maybe try again?`
    }
};

async function onCall({ message, args, getLang }) {
    const { api } = global;
    const temp = await message.reply("Searching...");
    try {
        const input = args.join(" ");
        if (!input || input.trim().length <= 0)
            return message.reply("No title provided.");
        await message.react("🕜");
        const { data:{result} } = await axios.get(
            `https://deku-rest-api.gleeze.com/search/lyrics?q=${encodeURIComponent(
                input
            )}`
        );
        
        if ("error" in result || !Object.hasOwn(result, "lyrics")) {
            message.react("❌");
            await api.editMessage(
                getLang("api_err"),
                temp.messageID,
                message.threadID,
                message.messageID
            );
            return;
        }
        const fileName = getRandomPassword(8) + ".jpg";
        
        const res = await axios.get(result.image, {responseType: "arraybuffer"});
        
        const img64 = Buffer.from(res.data).toString("base64");
        
        const img = path.join(__dirname, `../cache/${fileName}`);
        
        fs.writeFileSync(img, img64, {encoding: "base64"});
        
        await message.react("✅");
        await api.editMessage(
            getLang("found", {
                dev,
                artist: result.artist,
                lyrics: result.lyrics,
                title: result.title
            }),
            temp.messageID,
            message.threadID,
            message.messageID
        );
        await api.sendMessage({
          body: result.title,
          attachment: fs.createReadStream(img)
        });
        fs.unlinkSync(img)
        return;
    } catch (e) {
        await message.react("❌");
        await api.editMessage(
            getLang("error"),
            temp.messageID,
            message.threadID,
            message.messageID
        );
        return console.error(e);
    }
}

export default {
    config,
    langData,
    onCall
};
