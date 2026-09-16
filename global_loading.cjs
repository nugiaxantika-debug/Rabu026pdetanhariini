const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');

// Remove all existing sendLoadingAnimation calls (except the function definition itself)
code = code.replace(/^[ \t]*await this\.sendLoadingAnimation\(jid, this\.getFakeMenuQuote\(senderJid, msg\.pushName \|\| "User"\)\);\s*?\n/gm, '');

// Now find where to insert the global check.
const anchor = `    if (isMenuCmd || isSpecificMenu || isProtectedFeature) {
      if (!this.registeredUsers.has(senderJid)) {`;

const replacement = `    const isOwnerCommand = ownerCommands.includes(requestedCmd.toLowerCase()) || ownerCommands.includes("." + possibleCommandName);
    const isGroupCommand = groupCommands.includes(requestedCmd.toLowerCase()) || groupCommands.includes("." + possibleCommandName);
    const isAnyCommand = isMenuCmd || isSpecificMenu || isProtectedFeature || isOwnerCommand || isGroupCommand;

    if (isMenuCmd || isSpecificMenu || isProtectedFeature) {
      if (!this.registeredUsers.has(senderJid)) {`;

if (code.includes(anchor) && !code.includes('const isAnyCommand =')) {
    code = code.replace(anchor, replacement);
}

const anchor2 = `          return;
      }
    }`;

const replacement2 = `          return;
      }
    }

    if (isAnyCommand) {
        await this.sendLoadingAnimation(jid, this.getFakeMenuQuote(senderJid, msg.pushName || "User"));
    }`;

if (code.includes(anchor2) && !code.includes('if (isAnyCommand) {')) {
    code = code.replace(anchor2, replacement2);
}

fs.writeFileSync(file, code);
console.log("Global loading applied");
