const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

const anchor = `    const isAnyCommand = isMenuCmd || isSpecificMenu || isProtectedFeature || isOwnerCommand || isGroupCommand;`;
const replacement = `    const isPremiumCommand = premiumCommands.includes(requestedCmd.toLowerCase()) || premiumCommands.includes("." + possibleCommandName);
    const isAnyCommand = isMenuCmd || isSpecificMenu || isProtectedFeature || isOwnerCommand || isGroupCommand || isPremiumCommand;`;

if (code.includes(anchor)) {
    code = code.replace(anchor, replacement);
    fs.writeFileSync(file, code);
    console.log("Updated successfully");
} else {
    console.log("Anchor not found");
}
