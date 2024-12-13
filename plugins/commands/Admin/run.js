import axios from 'axios'

const config = {
    name: "run",
    aliases: ["eval", "execute", "exec"],
    permissions: [2],
    description: "Run bot scripts",
    usage: "<script>",
    credits: "XaviaTeam",
    isAbsolute: true
}

function onCall({message,args,data,xDB,balance,assets,extra}) {
    const {api} = global;
    function output(msg) {
    if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
      msg = msg.toString();
    else if (msg instanceof Map) {
      let text = `Map(${msg.size}) `;
      text += JSON.stringify(mapToObj(msg), null, 2);
      msg = text;
    }
    else if (typeof msg == "object")
      msg = JSON.stringify(msg, null, 2);
    else if (typeof msg == "undefined")
      msg = "undefined";

    api.sendMessage(msg, message.threadID, message.messageID);
  }
  function out(msg) {
    output(msg);
  }
  function mapToObj(map) {
    const obj = {};
    map.forEach(function (v, k) {
      obj[k] = v;
    });
    return obj;
  }
  const cmd = `
  (async () => {
    try {
      ${args.join(" ")}
    }
    catch(err) {
      console.log("eval command", err);
      api.sendMessage( err.stack
      , message.threadID);
    }
  })()`;
eval(cmd);
    
}

export default {
    config,
    onCall
}
