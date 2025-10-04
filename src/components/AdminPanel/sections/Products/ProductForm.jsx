// src/components/AdminPanel/sections/Products/ProductForm.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';
import useFirestore from '../../../../hooks/useFirestore';
import './ProductForm.css';

const ProductForm = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addDocument, updateDocument, loading, error } = useFirestore('products');

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        priceDescription: '',
        isPriceConsultable: false,
    });
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(false);

    useEffect(() => {
        if (productId) {
            setIsLoadingData(true);
            const getProductData = async () => {
                try {
                    const productRef = doc(db, 'products', productId);
                    const productSnap = await getDoc(productRef);
                    if (productSnap.exists()) {
                        const data = productSnap.data();
                        setProductData({
                            name: data.name || '',
                            description: data.description || '',
                            price: data.price || '',
                            stock: data.stock || '',
                            category: data.category || '',
                            priceDescription: data.priceDescription || '',
                            isPriceConsultable: data.isPriceConsultable || false,
                        });
                        setImages(data.images || []);
                    } else {
                        console.error("No se encontró el producto con el ID:", productId);
                        setUploadError("No se encontró el producto.");
                        setTimeout(() => navigate('/admin/products'), 3000);
                    }
                } catch (error) {
                    console.error("Error al cargar los datos del producto:", error);
                    setUploadError("Error al cargar los datos. Inténtalo de nuevo.");
                } finally {
                    setIsLoadingData(false);
                }
            };
            getProductData();
        } else {
            setProductData({ name: '', description: '', price: '', stock: '', category: '', priceDescription: '', isPriceConsultable: false });
            setImages([]);
            setFiles([]);
        }
    }, [productId, navigate]);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleDeleteImage = async (imageUrl) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
            try {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
                const filteredImages = images.filter(url => url !== imageUrl);
                setImages(filteredImages);
                if (productId) {
                    const success = await updateDocument(productId, { images: filteredImages });
                    if (!success) {
                        throw new Error('Error al actualizar el documento.');
                    }
                }
            } catch (error) {
                console.error("Error al eliminar la imagen:", error);
                setUploadError("Error al eliminar la imagen. Inténtalo de nuevo.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadError(null);

        const { name, description, price, stock, category, isPriceConsultable, priceDescription } = productData;

        // Validación básica
        if (!name || !description || !stock || !category) {
            setUploadError("Por favor, completa todos los campos.");
            return;
        }

        if (!isPriceConsultable) {
            if (!price) {
                setUploadError("Por favor, completa el precio o marca la casilla 'Consultar precio'.");
                return;
            }
            if (isNaN(Number(price))) {
                setUploadError("El precio debe ser un número válido.");
                return;
            }
        } else {
             if (!priceDescription) {
                setUploadError("Por favor, ingresa un texto para la descripción del precio.");
                return;
            }
        }

        const numericPrice = isPriceConsultable ? null : Number(price);
        const numericStock = Number(stock);
        
        try {
            const newImageUrls = [];
            if (files.length > 0) {
                for (const file of files) {
                    const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
                    await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(storageRef);
                    newImageUrls.push(url);
                }
            }

            const allImageUrls = [...images, ...newImageUrls];
            
            const productToSave = {
                name,
                description,
                price: numericPrice,
                stock: numericStock,
                category,
                images: allImageUrls,
                priceDescription: isPriceConsultable ? priceDescription : null,
                isPriceConsultable,
            };

            let success;
            if (productId) {
                success = await updateDocument(productId, productToSave);
            } else {
                success = await addDocument(productToSave);
            }

            if (success) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    navigate('/admin/products');
                }, 1500);
            } else {
                setUploadError(error || 'Error al guardar el producto.');
            }

        } catch (err) {
            console.error('Error al guardar el producto:', err);
            setUploadError('Error al guardar el producto. Verifica tu conexión o permisos.');
        }
    };

    if (isLoadingData) {
        return <div className="loading-data">Cargando datos del producto...</div>;
    }
    
    return (
        <div className="product-form-container">
            <h2>{productId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label>Nombre del Producto:</label>
                    <input 
                        type="text" 
                        value={productData.name} 
                        onChange={(e) => setProductData({...productData, name: e.target.value})} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea 
                        value={productData.description} 
                        onChange={(e) => setProductData({...productData, description: e.target.value})} 
                        required
                    ></textarea>
                </div>
                <div className="form-group price-field">
                    <label>Precio:</label>
                    <input
                        type="number"
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                        disabled={productData.isPriceConsultable}
                        required={!productData.isPriceConsultable}
                    />
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={productData.isPriceConsultable}
                            onChange={(e) => setProductData({ ...productData, isPriceConsultable: e.target.checked, price: '' })}
                        />
                        Consultar precio
                    </label>
                </div>
                {productData.isPriceConsultable && (
                    <div className="form-group">
                        <label>Texto del Precio:</label>
                        <input
                            type="text"
                            value={productData.priceDescription}
                            onChange={(e) => setProductData({ ...productData, priceDescription: e.target.value })}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Stock:</label>
                    <input 
                        type="number" 
                        value={productData.stock} 
                        onChange={(e) => setProductData({...productData, stock: e.target.value})} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Categoría:</label>
                    <input 
                        type="text" 
                        value={productData.category} 
                        onChange={(e) => setProductData({...productData, category: e.target.value})} 
                        required 
                    />
                </div>
                
                {images.length > 0 && (
                    <div className="form-group existing-images">
                        <label>Imágenes Actuales:</label>
                        <div className="image-preview-container">
                            {images.map((url, index) => (
                                <div key={index} className="image-wrapper">
                                    <img src={url} alt={`Preview ${index}`} className="image-preview" />
                                    <button 
                                        type="button" 
                                        className="delete-image-btn"
                                        onClick={() => handleDeleteImage(url)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="form-group">
                    <label>{productId ? 'Agregar Nuevas Imágenes:' : 'Imágenes:'}</label>
                    <input type="file" multiple onChange={handleFileChange} />
                    {files.length > 0 && <p className="file-count">{files.length} archivo(s) seleccionado(s)</p>}
                </div>
                
                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? <FaSpinner className="spinner" /> : productId ? <FaEdit /> : <FaCloudUploadAlt />}
                    {loading ? ' Guardando...' : productId ? ' Actualizar Producto' : ' Agregar Producto'}
                </button>

                {uploadError && <div className="error-message">{uploadError}</div>}
                {isSuccess && (
                    <div className="success-message">
                        <FaCheckCircle /> ¡Producto guardado con éxito!
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProductForm;