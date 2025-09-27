import { Player } from "../types/player";
import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc} from "firebase/firestore";

const playersCol = collection(db, "players");


// Create 
export async function addPlayer(player: Omit<Player, "id">){
    return await addDoc(playersCol, player)
}


// Read
export async function getPlayers(): Promise<Player[]>{
    const snapshot = await getDocs(playersCol)
    return snapshot.docs.map((docsSnap)=> ({
        id: docsSnap.id,
        ...docsSnap.data()
    })) as Player[];
}

// Update
export async function updatePlayer(id: string, data: Partial<Player>){
    const playerRef = doc(db, "players", id);
    return await updateDoc(playerRef, data)
}

// Delete 
export async function deletePlayer(id: string){
    const playerRef = doc(db, "players", id);
    return await deleteDoc(playerRef)

}