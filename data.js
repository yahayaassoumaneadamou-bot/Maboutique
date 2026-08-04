// data.js — gère le stockage des produits et des commandes
// Toutes les données sont stockées dans le navigateur (localStorage).
// C'est volontairement simple : pas de serveur, pas de base de données.

const PRODUITS_KEY = "boutique_produits";
const COMMANDES_KEY = "boutique_commandes";

// Produits de démonstration au premier lancement
const PRODUITS_DEMO = [
  { id: "p1", nom: "T-shirt blanc", prix: 15, stock: 20 },
  { id: "p2", nom: "Casquette", prix: 12, stock: 15 },
  { id: "p3", nom: "Mug personnalisé", prix: 9, stock: 30 },
];

function getProduits() {
  const data = localStorage.getItem(PRODUITS_KEY);
  if (!data) {
    localStorage.setItem(PRODUITS_KEY, JSON.stringify(PRODUITS_DEMO));
    return PRODUITS_DEMO;
  }
  return JSON.parse(data);
}

function saveProduits(produits) {
  localStorage.setItem(PRODUITS_KEY, JSON.stringify(produits));
}

function getCommandes() {
  const data = localStorage.getItem(COMMANDES_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCommandes(commandes) {
  localStorage.setItem(COMMANDES_KEY, JSON.stringify(commandes));
}

function genererId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
