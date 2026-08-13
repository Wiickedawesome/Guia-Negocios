const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Use the local ADC or we can just initialize without credentials if we run this via firebase-tools
// wait, I don't have a service account key here.
