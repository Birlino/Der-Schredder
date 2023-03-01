global.Discord = require('discord.js')
global.client = new Discord.Client({
    intents: 32767,
    partials: ["CHANNEL", "MESSAGE", "REACTION"]
});
const fs = require("fs")


global.config = require("./config.json")

client.commands = new Discord.Collection()
client.on("ready", () =>{
    fs.readdirSync('./commands/').forEach(dir => {
        const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'))
      for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
              client.commands.set(command.name, command)
        }})
})
setTimeout(()=> {

        client.guilds.cache.forEach(guild => {
            client.commands.forEach(command => {
                guild.commands.create(command)
            })
        })
}, 3 * 1000)




const eventsFolder = fs.readdirSync("./events")
for (const folder of eventsFolder) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of eventsFiles) {
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args))
    }
}

const { Types } = require("mongoose");
const setupSchema = require("./schemas/setupSchema.js");
client.on("interactionCreate", async (interaction, guild) => {
  if (!interaction.isCommand()) return;

    const command = interaction.commandName

  let comando = client.commands.get(command);


  if (!comando) 
  
  comando = client.commands.get(interaction.customId);
  if (!comando) return;
 
  if(founder.some(id => id == interaction.user.id)){
       await comando.execute(interaction);
  }
  const data = await setupSchema.findOne({
guildId: interaction.guild.id,
      });
		var stafferrole = data.staff
  if(comando.onlyPremium && !founder.some(id => id == interaction.user.id)){
       return interaction.reply({content: `Non hai il permesso per usare \`${command}\` in fase di sviluppo`, ephemeral: true })
  }
  if(comando.onlyGuild && interaction.guild.id !== "1064910407812259861") {
      return interaction.reply({content: `Questo comando è disponibile solo nel server centrale`, ephemeral: true})
  }
    if(comando.onlyHighstaff && !interaction.member.roles.cache.has("1064913391380074556")){
        return interaction.reply({content: `Non hai il permesso per usare \`${command}\` `, ephemeral: true })
    }
  if (comando.onlyDev && !founder.some(id => id == interaction.user.id))  {
    interaction.reply({ content: `Non hai il permesso per usare \`${command}\` è solo per gli owner del bot`, ephemeral: true })
    return
}
 else if (comando.onlyStaff && !interaction.member.roles.cache.has(stafferrole)) {
      interaction.reply({ content: `Non hai il permesso per usare \`${command}\` è un comando solo per gli staff`, ephemeral: true })
      return
  }
  else if (comando.onlyOwner && interaction.guild.ownerId !== interaction.user.id) {
    interaction.reply({ content: `Non hai il permesso per usare \`${command}\` è un comando solo per gli owner `, ephemeral: true })
    return
}
  await comando.execute(interaction);}
)

process.on("uncaughtException", err => {
    console.log(err)
})

process.on("unhandledRejection", err => {
    console.log(err)
})

   

client.login(config.token)

