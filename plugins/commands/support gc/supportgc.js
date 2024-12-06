async function onCall({message}) {
  const {api, controllers:{Threads}} = global;
  const uid = message.senderID;
  const getSupport = await Threads.get("8907223302630056");
  let members = getSupport.info.members.map(val => val.userID)
  if(members.includes(uid)) {
    return message.reply("User is already in the group.")
  } else {
    await api.addUserToGroup(uid, getSupport.threadID)
  }
}

const config = {
  name: "helpgroup",
  credits: "Renz",
}

export default {
  config,
  onCall
}