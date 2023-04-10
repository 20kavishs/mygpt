import query from "@/lib/queryAPI";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "../../../firebaseAdmin";
import { addDoc, collection } from "firebase/firestore";

type Data ={
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {prompt, chatId, model, session} = req.body;

    if (!prompt) {
        res.status(400).json({ answer: "Please provide a prompt!"});
        return;
    }

    if (!chatId) {
        res.status(400).json({ answer: "Please provide a valid ID!"});
        return;
    }

    const response = await query(prompt, chatId, model);
    
    const message: Message = {
        text: response || "ChatGPT was unable to get a response for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: 'https://links.papareact.com/89k'
        },
    };
    const front = adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(chatId);
    await front.collection("messages").add(message);
    //await addDoc(collection(adminDb, "users", session?.user?.email!, 'chats'), {

    res.status(200).json({ answer: message.text})

}


