import { collectionGroup, collection, where, deleteDoc, query, orderBy, doc, getDoc, getDocs, limit, startAfter, endBefore, startAt, endAt } from "firebase/firestore";
import { firestore } from "./config";

export const fetchFire = {

    async getPostById(collectionName, belgeId) {
        const belgeRef = doc(collection(firestore, collectionName), belgeId);
        const belgeSnapshot = await getDoc(belgeRef);

        if (belgeSnapshot.exists()) {
            return { id: belgeSnapshot.id, ...belgeSnapshot.data() };
        } else {
            throw new Error("Belge bulunamadı.");
        }
    },

    async getPosts(collectionName) {
        const belgeQuery = query(
            collection(firestore, collectionName),
        );
        const belgeSnapshot = await getDocs(belgeQuery);
        const belgeler = [];

        belgeSnapshot.forEach((belgeDoc) => {
            belgeler.push({ id: belgeDoc.id, ...belgeDoc.data() });

        });
        return belgeler;
    },

    async getPostsByTitle(collectionName, title) {
        const belgeQuery = query(
            collection(firestore, collectionName),
            where("title", "==", title),
        );
        const belgeSnapshot = await getDocs(belgeQuery);
        const belgeler = [];
        const altKoleksiyonAdi = 'Types';

        const altKoleksiyonQuery = collectionGroup(firestore, altKoleksiyonAdi);
        const altKoleksiyonSnapshot = await getDocs(altKoleksiyonQuery);

        belgeSnapshot.forEach((belgeDoc) => {
            altKoleksiyonSnapshot.forEach((altBelgeDoc) => {
                if (belgeDoc.data().type.id === altBelgeDoc.ref.id) {
                    belgeler.push({ id: belgeDoc.id, ...belgeDoc.data(), ...altBelgeDoc.data() });
                }
            });
        });
        return belgeler;
    },

    async deleteByID(collectionName, documentId) {
        try {
            const documentRef = doc(firestore, collectionName, documentId);
            await deleteDoc(documentRef)
            alert("Deleted succesfuly")
            return true
        } catch {
            alert("Something went wrong")
            return false
        }
    }
}
