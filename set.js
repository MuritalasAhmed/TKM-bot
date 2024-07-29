const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVBFNVF3QmIwUXlRRkpZMmhZOS83bmEvRVlwcE56ejg2ampKWmVIMnZrND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZXJTQ0FqTDZadFc4Q0dzYmRyZzFvS2tyc0pFYUk4TkpHbHZLRVc4MUNHMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QzJyN3BRZ3dWdnllY3ArRkkzZ3JnUGxZWS9KVEJmRVRVUnJTb2g1aEhZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySVNxZklSdEpYalFYK2QzN2NiUTZxaWhnNmZPTWxzK2piTjVmN0JlekJVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9JUDdZYTVScWsvbkRhcTRFYkVqZTNKekxhNGJ4WFFCY2FkVEt3RW1vbms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRyRk9IWlhJMmc2Z2ZEWkFQc0phMTBxTFBzRnFwNUNtWmhmZ2t1Ti9NQXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0piTGo5MjFPNE9ndWpWc0hYMGhIZGJzWW96WW04SlMydEpGTnU2OW8zWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0w0NzZGWWFoVXpRNjBTWG9GY2pUMG8wM2JnMmEzdmhqU1l3Rmp3eVpVWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNMdm9oNHdtZmttTXBqblpxSzFiZ2hlajVlNXJwMnYzTzVVcU82U0hyOXlVL2FuWlNMcUFXcGNFZzVPSmtiTEVqTjlTTUtVYytpbHVmYnlzN0ErcGhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE3LCJhZHZTZWNyZXRLZXkiOiJpbjV6T3Q5OUsxMTYrbGdCT09aZXQ3Y1NoMnBrenh0dmpnVXJNMCtIYVlVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJaWmExVmpoMlJNcUNLbTZZQjVEUU9BIiwicGhvbmVJZCI6IjA1OWUxZmZmLTVmYjgtNGI0Mi1hZmFiLWQ0NWEwZTg4YjVmYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqMXlPeXFXbkNVUkZnRW1tcjRCSEJHSGZ1UUU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia213VDhaTUhRZWxZQklHNWdqRU1CR05oZzhRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhOUFJYWTZXIiwibWUiOnsiaWQiOiIyMzQ5MDIwNTA3NTA5OjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTXVyaXRhbGEgQWhtZWQgQWxhbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0NyK1lZREVJZlluclVHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiREpKdFJ0a2NZQXpmVnZLN05rYkhOa2o1M3VYOTFKeXlyaGhsaC9iRHNoaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMzNldnhRSWRUODRKTHpDSzZWbjlHZnVPTTA3ZDB2WC9tK1FPM1lJRUtXSjN6T2t5N2FRRmhRYTh1cmN5SnU2QUxMNloxNElTLy9vNFowZXBzeDZBQnc9PSIsImRldmljZVNpZ25hdHVyZSI6Ik5ZcmFaY1M0cnNEcllVbDJUSHRuMHpocUVGcTFZMmk2N0JMbUNBTmxYMTdoSnQ2ZXR0V2E5VjlLeVZ2TDVVbnJva3dIOTBDV0czSmlTcFhhaGh4YmpnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTAyMDUwNzUwOTo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlF5U2JVYlpIR0FNMzFieXV6Wkd4elpJK2Q3bC9kU2NzcTRZWllmMnc3SVoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjIyNjQ1OTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTWJpIn0=',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
