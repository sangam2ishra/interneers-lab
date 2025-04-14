import React, {useState} from 'react';
import ProductCard from "./ProductCard";
import {dummyProducts} from "../data/dummyProducts";
import { Product } from '../models/product';


const ProductList: React.FC=()=>{
    const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
    const handleProductClick=(id: string)=>{
        setExpandedProductId(prevId=>(prevId==id?null:id));
    };

    return(
        <div>
            <h1>Products</h1>
            <div>
                {dummyProducts.map((product: Product)=>(
                    <div key={product.id}>
                        <ProductCard product={product} onClick={handleProductClick}/>
                        {expandedProductId===product.id && (
                            <div>
                                <p>
                                    <strong>
                                        Additional Details:
                                    </strong>
                                    This product is currently on special offer.
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ProductList;