const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0Y3TGFpbGw0Z05RR0cxY0VPN1FyTGExTnVVSnVTZkUxWU5aU2UyNk1YQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejQ2RDc0M2NKeC9ZNFFOSUNHV1ZFYjVGc2VpZHhPUjhJR1E4cG9hTmRtbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRnBiNDAxYXZ6dEtWUTl3Z3ZxSkVTZlhVc0kwQ3dDY1prUnBsYkxwdWtrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvemFWejBwZGpzNFhPZEtDUXNNL2w5TVVqYjRBdmVObDJ3MEQ1YmZCelc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRFVGJ1Z1llU1VtaUFHa2N5amp5NzVCYm1VZm02VGxlVGdNQkZVbnpnM1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpMMnhzM3hCdW9nSW5qcnh5QzBmaVIwZ0xPSEVVODlFQ3EvaXA3TG9Lakk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1BlUzBpY2xJRWF1cEtzOTVmdzNVa215M1Jid3dOWGx0SFI2RUE4ZzgzZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZG93aDAxQjJjSHh4VThIbk1hcFdxWHVlZzlVdEswaG1wSGprWjRJR0psYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndWUFB6eVd0TWZKaWVRYWVjeC95dkRia2NPM1lXZzU4U3hpeUVqd2plUnhEWjdZU2VrcDEwRkZhTDIvellZNXdxQUFUcGxXTGVzbEtWSTBnZmZoV0R3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkxLCJhZHZTZWNyZXRLZXkiOiIrcTdaOVZLSWtGa1dHOUtMWGUyRDg0cG56RHF1NEh6b0pOa3VNK3l4SmhzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCRk9MZVBfb1JaYTZLal8tWVRWV3RnIiwicGhvbmVJZCI6IjQxYjRhYmEyLTAyYjAtNGE3My1hZDFkLTI0NTQwYzFhY2UzZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuVzkxQTBtUWJ1SDY4Qzg5NVpCdHM5UGVDOHM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZhOXFNT3BqWS9yTXJnaXpGS0h2ei9uSzNZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNSVEFBR1FFIiwibWUiOnsiaWQiOiI5MjMxNTI5ODMzODE6MzJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi5LiCSEHYtNuM2K5JS0gifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05lcncva0JFSUhCc2I0R0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImFSNWV6RCt4cVdnWTV0dWE1dlp5UW1KbEhJQ1RGMjg2a0c2dkJuVklLWE09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkVvMjF4Y255Ly9raTYyaE9hRFRnVTVMSCttMkZwdkZXZ2ozSUNKYXJCZ1RoVnY3dHQwNFZvdnRieDRWQzd1TE1KTjg1U1pPRU5lWnZuRzdwSHVoZkFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDWkltTkdzVUVURHRaSUR2bm5XK0dncWJqaGRiZDl0U2JpR2pLT2tLRzJZY3Z6K3pCMko4d1VxZ1FjZjBreFhEa0ZIZCtLMC96MVRkWGg4Qk1wNXRCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzE1Mjk4MzM4MTozMkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXa2VYc3cvc2Fsb0dPYmJtdWIyY2tKaVpSeUFreGR2T3BCdXJ3WjFTQ2x6In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNDQ3MzA5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU94SyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐂𝐑𝐈𝐒𝐒 𝐕𝐄𝐕𝐎",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255687068672",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CRISS MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hhwdau.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                 ANTIDELETE3 : process.env.ANTIDELETE2 || 'yes',
                  CRISS_CHATBOT : process.env.CRISS_CHATBOT || 'yes',
                
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
