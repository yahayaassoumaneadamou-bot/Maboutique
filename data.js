// data.js — connecté à Firebase Firestore (base de données partagée en ligne)
// Client et admin lisent/écrivent maintenant dans la MÊME base.

const firebaseConfig = {
  apiKey: "AIzaSyDDbI57eZaar_sgLrzOPisZ3Ey9ChwF2bs",
  authDomain: "maboutique-e28d2.firebaseapp.com",
  databaseURL: "https://maboutique-e28d2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "maboutique-e28d2",
  storageBucket: "maboutique-e28d2.firebasestorage.app",
  messagingSenderId: "857067811278",
  appId: "1:857067811278:web:52235d952b37bef96a3b9f",
  measurementId: "G-L5PTCH9Y47"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const PRODUITS_DEMO = [
  { nom: "T-shirt blanc", prix: 15, stock: 20 },
  { nom: "Casquette", prix: 12, stock: 15 },
  { nom: "Mug personnalisé", prix: 9, stock: 30 },
];

// Ajoute les produits de démo une seule fois, si la collection est vide.
async function initialiserProduitsDemo() {
  const snapshot = await db.collection("produits").get();
  if (snapshot.empty) {
    for (const p of PRODUITS_DEMO) {
      await db.collection("produits").add(p);
    }
  }
}

// Écoute les produits en temps réel : callback(produits) est appelé
// à chaque changement (ajout, suppression, modification de stock...).
function ecouterProduits(callback) {
  return db.collection("produits").onSnapshot(snapshot => {
    const produits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(produits);
  });
}

function ajouterProduit(produit) {
  return db.collection("produits").add(produit);
}

function supprimerProduit(id) {
  return db.collection("produits").doc(id).delete();
}

function modifierStock(id, nouveauStock) {
  return db.collection("produits").doc(id).update({ stock: nouveauStock });
}

// Écoute les commandes en temps réel.
function ecouterCommandes(callback) {
  return db.collection("commandes").orderBy("dateCreation", "desc").onSnapshot(snapshot => {
    const commandes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(commandes);
  });
}

function ajouterCommande(commande) {
  return db.collection("commandes").add({
    ...commande,
    dateCreation: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function marquerLivree(id) {
  return db.collection("commandes").doc(id).update({ statut: "livrée" });
}
