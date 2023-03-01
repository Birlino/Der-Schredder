

module.exports = {
    name: "wasarn",
    onlyStaff: true,
    description: "warnare un utente",
    tipo: "moderation",
    options: [{
        name: 'utente',
        description: "utente da warnare",
        required: true,
        type: 'USER',
    },
    {
    name: 'motivo',
    description: "motivo per il warn",
    required: true,
    type: 'CHANNEL',
    channelTypes: ["GUILD_TEXT"] 
    }],
    async execute(){

    }
}