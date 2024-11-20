// import admin from "firebase-admin";
// import dotenv from 'dotenv';

// dotenv.config();

// if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
//   throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY não está definida no .env");
// }
// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

// let isConnected: boolean = false;
 
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.DATABASEURL,
// });
// const database = admin.database();
// async function testConnection() {
//   try {
//     // Tenta salvar um valor no banco
//     await database.ref("testConnection").set({ connected: true });

//     // Tenta ler o valor salvo
//     const snapshot = await database.ref("testConnection").once("value");
//     const data = snapshot.val();

//     if (data && data.connected === true) {
//       isConnected = true;
//       console.log(
//         "\x1b[33m[FIREBASE]\x1b[36m✅ Conexão com o Firebase Realtime Database estabelecida com sucesso."
//       );
//     } else {
//       isConnected = false;
//       console.log(
//         "\x1b[33m[FIREBASE]\x1b[36m⚠️ Erro ao verificar a conexão com o Firebase."
//       );
//     }
//   } catch (error) {
//     isConnected = false;
//     console.error(
//       "\x1b[33m[FIREBASE]\x1b[36m❌ Erro de conexão com o Firebase Realtime Database:",
//       error
//     );
//   }
// }
// testConnection();

// export { database, isConnected };
