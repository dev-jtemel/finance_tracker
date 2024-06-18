import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();

export const getProducts = async (_1: any, res: any) => {
  try {
    const query = admin.firestore().collection('grocery_products');
    const snapshot = await query.get();
    const products: any[] = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json({ message: "OK", products });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addProduct = async (req: any, res: any) => {
  interface IProduct { name: string; category: string; isFrozen: boolean; useCount: number };
  const { name, category, isFrozen, useCount }: IProduct = req.body;
  
  try {
    const docRef = await admin.firestore().collection('grocery_products').add({
      name,
      category,
      isFrozen,
      useCount
    });
    return res.status(200).json({ id: docRef.id });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};