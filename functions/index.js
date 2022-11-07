const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore
const usersCollection = db.CollectionGroup("users")

exports.onMessageReceived = functions.firestore.document("messaging/{id")
    .onCreate(async (snap, context) => {
        const values = snap.data();
        const senderEmail = values.senderEmail
        const targetEmail = values.targetEmail
        const message = values.message
        const date = values.date

        // retrieve the target user's object
        const targetUserSnapshot = await usersCollection.where("userEmail", "==", targetEmail).get()
        const targerUserDoc = targetUserSnapshot.docs[0]
        let targetUser = targerUserDoc.data()

        
        
    })

