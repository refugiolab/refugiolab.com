// src/hooks/useProductos.js

import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductos = async () => {
      try {
        // CORRECCIÓN: Se cambia 'productos' a 'products'
        const productosCollection = collection(db, 'products');
        const productosSnapshot = await getDocs(productosCollection);
        const productosList = productosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(productosList);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los productos: ", err);
        setError("No se pudieron cargar los productos. Intenta de nuevo más tarde.");
        setLoading(false);
      }
    };

    getProductos();
  }, []);

  return { productos, loading, error };
};

export default useProductos;