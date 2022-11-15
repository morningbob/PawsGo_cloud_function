const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore()
const usersCollection = db.collection("users")

exports.onMessageReceived = functions.firestore.document("messaging/{id}")
    .onCreate(async (snap, context) => {
        const values = snap.data();
        const senderEmail = values.senderEmail
        const senderName = values.senderName
        const targetEmail = values.targetEmail
        const targetName = values.targetName
        const message = values.message
        const messageID = values.messageID
        const date = values.date

        // retrieve the sender user's object
        const senderUserSnapshot = await usersCollection.where("userEmail", "==", senderEmail).get()
        const senderUserDoc = senderUserSnapshot.docs[0]
        let senderUser = senderUserDoc.data()

        // actually, messageSentObject and messageReceivedObject are the same object
        let messageSentObject = {
            "messageID" : messageID,
            "senderEmail" : senderEmail,
            "senderName" : senderName,
            "targetEmail" : targetEmail,
            "targetName" : targetName,
            "messageContent" : message,
            "date" : date
        }

        senderUser.messagesSent[messageID] = messageSentObject
        senderUserDoc.ref.update(senderUser)

        // retrieve the target user's object
        const targetUserSnapshot = await usersCollection.where("userEmail", "==", targetEmail).get()
        const targerUserDoc = targetUserSnapshot.docs[0]
        let targetUser = targerUserDoc.data()

        let messageReceivedObject = {
            "messageID" : messageID,
            "senderEmail" : senderEmail,
            "senderName" : senderName,
            "targetEmail" : targetEmail,
            "targetName" : targetName,
            "messageContent" : message,
            "date" : date
        }

        targetUser.messagesReceived[messageID] = messageReceivedObject
        targerUserDoc.ref.update(targetUser)
        
    })

