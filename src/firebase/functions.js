import { collectionGroup, collection, where, addDoc, query, orderBy, doc, getDoc, getDocs, limit, startAfter, endBefore } from "firebase/firestore";
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

    async getPostsByCreatedAtPagination(collectionName, count, lastOne = null) {
        const belgeQuery = query(
            collection(firestore, collectionName),
            orderBy('created_at', 'desc'),
            limit(count),
            endBefore(lastOne)
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

    async count_page_view(blog_id) {
        const blog = doc(collection(firestore, 'Blogs'), blog_id)

        const belgeQuery = query(
            collection(firestore, "PageViews"),
            where("blog", "==", blog)
        );
        const belgeSnapshot = await getDocs(belgeQuery);
        return belgeSnapshot.docs.length
    },

    async add_page_view(blog_id) {
        const blog = doc(collection(firestore, 'Blogs'), blog_id)
        var ip = ""

        await fetch('https://api.ipify.org/?format=json&callback=get_viewers_ip')
            .then(response => response.json())
            .then(data => ip = data.ip);

        const belgeQuery = query(
            collection(firestore, "PageViews"),
            where("blog", "==", blog),
            where("viewer_ip", "==", ip)
        );

        const belgeSnapshot = await getDocs(belgeQuery);
        if (belgeSnapshot.docs.length > 0) return

        const data = { viewer_ip: ip, blog: blog };
        addDoc(collection(firestore, 'PageViews'), data)
    }
}
