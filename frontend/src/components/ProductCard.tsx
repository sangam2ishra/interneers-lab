import React from "react";
import { Product } from "../models/product";

interface ProductCardProps {
  product: Product;
  onClick?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      style={{ cursor: "pointer" }}
      className="product-card"
      onClick={() => onClick && onClick(product.id as string)}
    >
      <h2>{product.name}</h2>
      {/* <p>{product.description}</p> */}
      <p>
        <strong>Rs.{product.price.toFixed(2)}</strong>
      </p>
      {product.brand && (
        <p>
          <em>{product.brand}</em>
        </p>
      )}
    </div>
  );
};

export default ProductCard;

// const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
//   return (
//     <div
//       className="product-card"
//       onClick={() => onClick && onClick(product.id as string)}
//     >
//       <h2>{product.name}</h2>
//       <p>{product.description}</p>
//       <p>
//         <strong>${product.price.toFixed(2)}</strong>
//       </p>
//       {product.brand && (
//         <p>
//           <em>{product.brand}</em>
//         </p>
//       )}
//     </div>
//   );
// };
// export default ProductCard;
// // const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
// //   return (
// //     <div
// //       className="product-card"
// //       style={{
// //         border: '1px solid #ddd',
// //         borderRadius: '8px',
// //         padding: '16px',
// //         margin: '8px',
// //         maxWidth: '300px',
// //         cursor: onClick ? 'pointer' : 'default'
// //       }}
// //       onClick={() => onClick && onClick(product.id as string)}
// //     >
// //       <h2>{product.name}</h2>
// //       <p>{product.description}</p>
// //       <p><strong>${product.price.toFixed(2)}</strong></p>
// //       {product.brand && <p><em>{product.brand}</em></p>}
// //     </div>
// //   );
// // };

// // export default ProductCard;
