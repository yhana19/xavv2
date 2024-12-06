const onCall = async ({ message, args }) => {
    const { commandsAliases } = global.plugins;
    const input = message.args[0]?.replace(/^./, "");
    if (message.body.startsWith(global.config.PREFIX)) {
      let commands = []
        for (let [key, value] of commandsAliases) {
          commands.push(key, ...value);
          
        }
        
        if(!commands.includes(input)) {
          message.reply(`No command found named '${input}'.`)
        }
    }
};
const config = {
    name: "CheckExist",
    credits: "Renz"
};

export default {
    config,
    onCall
};
