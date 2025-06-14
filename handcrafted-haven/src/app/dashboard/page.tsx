'use client';

import { useState } from 'react';
import { Product, ProductFormData } from '../types/product';

export default function AdminDashboard() {

    return (
        <div>
            test
        </div>
    )
//   const [activeTab, setActiveTab] = useState<'products' | 'profile'>('products');
//   const [isAddingProduct, setIsAddingProduct] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [formData, setFormData] = useState<ProductFormData>({
//     name: '',
//     description: '',
//     price: 0,
//     imageUrl: '',
//     category: '',
//     quantity: 0,
//   });

//   const handleAddProduct = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newProduct: Product = {
//       id: Date.now().toString(),
//       ...formData,
//       inStock: formData.quantity > 0,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     setProducts([...products, newProduct]);
//     setIsAddingProduct(false);
//     setFormData({
//       name: '',
//       description: '',
//       price: 0,
//       imageUrl: '',
//       category: '',
//       quantity: 0,
//     });
//   };

//   const toggleProductStock = (productId: string) => {
//     setProducts(products.map(product => 
//       product.id === productId 
//         ? { ...product, inStock: !product.inStock }
//         : product
//     ));
//   };

//   const deleteProduct = (productId: string) => {
//     setProducts(products.filter(product => product.id !== productId));
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {activeTab === 'products' && (
//         <div className="bg-base-100 rounded-box p-6 shadow-lg">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Product Management</h2>
//             <button 
//               className="btn btn-primary"
//               onClick={() => setIsAddingProduct(true)}
//             >
//               Add New Product
//             </button>
//           </div>

//           {isAddingProduct && (
//             <div className="card bg-base-200 shadow-lg mb-6">
//               <div className="card-body">
//                 <h3 className="card-title">Add New Product</h3>
//                 <form onSubmit={handleAddProduct} className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Product Name</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="input input-bordered"
//                         value={formData.name}
//                         onChange={(e) => setFormData({...formData, name: e.target.value})}
//                         required
//                       />
//                     </div>
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Category</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="input input-bordered"
//                         value={formData.category}
//                         onChange={(e) => setFormData({...formData, category: e.target.value})}
//                         required
//                       />
//                     </div>
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Price</span>
//                       </label>
//                       <input
//                         type="number"
//                         className="input input-bordered"
//                         value={formData.price}
//                         onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
//                         required
//                         min="0"
//                         step="0.01"
//                       />
//                     </div>
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Quantity</span>
//                       </label>
//                       <input
//                         type="number"
//                         className="input input-bordered"
//                         value={formData.quantity}
//                         onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
//                         required
//                         min="0"
//                       />
//                     </div>
//                     <div className="form-control md:col-span-2">
//                       <label className="label">
//                         <span className="label-text">Image URL</span>
//                       </label>
//                       <input
//                         type="url"
//                         className="input input-bordered"
//                         value={formData.imageUrl}
//                         onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
//                         required
//                       />
//                     </div>
//                     <div className="form-control md:col-span-2">
//                       <label className="label">
//                         <span className="label-text">Description</span>
//                       </label>
//                       <textarea
//                         className="textarea textarea-bordered h-24"
//                         value={formData.description}
//                         onChange={(e) => setFormData({...formData, description: e.target.value})}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="flex justify-end gap-2">
//                     <button 
//                       type="button" 
//                       className="btn btn-ghost"
//                       onClick={() => setIsAddingProduct(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn btn-primary">
//                       Add Product
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//           <div className="overflow-x-auto">
//             <table className="table w-full">
//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Name</th>
//                   <th>Category</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product.id}>
//                     <td>
//                       <div className="avatar">
//                         <div className="w-16 rounded">
//                           <img src={product.imageUrl} alt={product.name} />
//                         </div>
//                       </div>
//                     </td>
//                     <td>{product.name}</td>
//                     <td>{product.category}</td>
//                     <td>${product.price.toFixed(2)}</td>
//                     <td>{product.quantity}</td>
//                     <td>
//                       <button
//                         className={`btn btn-sm ${product.inStock ? 'btn-success' : 'btn-error'}`}
//                         onClick={() => toggleProductStock(product.id)}
//                       >
//                         {product.inStock ? 'In Stock' : 'Out of Stock'}
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-error"
//                         onClick={() => deleteProduct(product.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {activeTab === 'profile' && (
//         <div className="bg-base-100 rounded-box p-6 shadow-lg">
//           <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
//           <form className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Full Name</span>
//                 </label>
//                 <input type="text" className="input input-bordered" />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input type="email" className="input input-bordered" />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Phone Number</span>
//                 </label>
//                 <input type="tel" className="input input-bordered" />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Role</span>
//                 </label>
//                 <input type="text" className="input input-bordered" value="Admin" disabled />
//               </div>
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Address</span>
//               </label>
//               <textarea className="textarea textarea-bordered h-24" />
//             </div>
//             <div className="form-control mt-6">
//               <button className="btn btn-primary">Update Profile</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
}
