const { Schema, model } = require("mongoose");
const setupGuild = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  canalewelcome: String,
  canaleverifica: String,
  staff: String,
  main: String,
  log: String
});

module.exports = model("setupGuild", setupGuild, "guildSetupSchema");
