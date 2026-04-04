"use client";

import { useEffect, useState } from "react";
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getAllOrders,
  getAllUsers,
  updateUserRole 
} from "../../lib/supabase/database";
import Button from "../ui/Button";

function ProductsView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await getProducts({ limit: 100 });
    if (error) setError(error);
    else setProducts(data);
    setLoading(false);
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      image: product.image || "",
      category: typeof product.category === 'object' ? (product.category.id || product.category.name || "") : (product.category || ""),
      stock: product.stock || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setFormData({ name: "", description: "", price: "", image: "", category: "", stock: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      image: formData.image,
      category: formData.category,
      stock: Number(formData.stock),
      sizes: [] // Required fallback
    };

    let res;
    if (editingId) {
      res = await updateProduct(editingId, payload);
    } else {
      res = await createProduct(payload);
    }

    if (res.error) {
      setError(res.error);
    } else {
      resetForm();
      await fetchProducts();
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    setLoading(true);
    const { error } = await deleteProduct(id);
    if (error) {
      alert("Failed to delete: " + error);
    } else {
      setProducts(products.filter(p => p.id !== id));
    }
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      {/* Product Form */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-xl font-bold text-cocoa">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>
        
        {error && <p className="mb-4 text-sm text-rose">{error}</p>}
        
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-cocoa/80">Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full rounded-lg border border-cocoa/20 px-4 py-2 outline-none focus:border-rose focus:ring-1 focus:ring-rose" />
          </div>
          <div>
            <label className="text-sm font-semibold text-cocoa/80">Category</label>
            <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 w-full rounded-lg border border-cocoa/20 px-4 py-2 outline-none focus:border-rose focus:ring-1 focus:ring-rose" />
          </div>
          <div>
            <label className="text-sm font-semibold text-cocoa/80">Price</label>
            <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="mt-1 w-full rounded-lg border border-cocoa/20 px-4 py-2 outline-none focus:border-rose focus:ring-1 focus:ring-rose" />
          </div>
          <div>
            <label className="text-sm font-semibold text-cocoa/80">Stock</label>
            <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="mt-1 w-full rounded-lg border border-cocoa/20 px-4 py-2 outline-none focus:border-rose focus:ring-1 focus:ring-rose" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold text-cocoa/80">Image URL</label>
            <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="mt-1 w-full rounded-lg border border-cocoa/20 px-4 py-2 outline-none focus:border-rose focus:ring-1 focus:ring-rose" placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold text-cocoa/80">Description</label>
            <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 w-full rounded-lg border border-cocoa/20 px-4 py-2 outline-none focus:border-rose focus:ring-1 focus:ring-rose" />
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : (editingId ? "Update Product" : "Create Product")}
            </Button>
            {editingId && (
              <Button type="button" variant="secondary" onClick={resetForm} disabled={saving}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-soft text-sm">
        {loading && products.length === 0 ? (
          <p className="p-6 text-cocoa/70">Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-sand text-cocoa">
                <tr>
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Stock</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products.length === 0 ? (
                  <tr><td colSpan="5" className="p-6 text-center text-cocoa/70">No products found.</td></tr>
                ) : products.map(product => (
                  <tr key={product.id} className="hover:bg-neutral-50/50">
                    <td className="p-4">
                      {product.image && <img src={product.image} alt={product.name} className="h-12 w-12 rounded object-cover" />}
                    </td>
                    <td className="p-4 font-medium text-cocoa">{product.name}</td>
                    <td className="p-4 text-cocoa/80">{(product.price).toLocaleString()}</td>
                    <td className="p-4 text-cocoa/80">{product.stock || 0}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(product)} className="text-xs font-semibold text-cocoa hover:text-primary" disabled={loading}>Edit</button>
                        <button onClick={() => handleDelete(product.id)} className="text-xs font-semibold text-rose hover:text-red-700" disabled={loading}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await getAllOrders();
      setOrders(data || []);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-soft text-sm">
      {loading ? (
        <p className="p-6 text-cocoa/70">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-sand text-cocoa">
              <tr>
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">User ID</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-cocoa/70">No orders found.</td></tr>
              ) : orders.map(order => (
                <tr key={order.id} className="hover:bg-neutral-50/50">
                  <td className="p-4 font-medium text-cocoa">{order.id}</td>
                  <td className="p-4 text-cocoa/80">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-cocoa/80 truncate max-w-[150px]">{order.user_id}</td>
                  <td className="p-4 text-cocoa/80">{order.total?.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="inline-block rounded-full bg-sand px-3 py-1 text-xs font-bold text-cocoa">
                      {order.status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function UsersView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data } = await getAllUsers();
    setUsers(data || []);
    setLoading(false);
  }

  async function handleRoleChange(userId, currentRole) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (!window.confirm(`Change this user's role to ${newRole}?`)) return;
    
    const { error } = await updateUserRole(userId, newRole);
    if (!error) {
      await fetchUsers(); // Refresh
    } else {
      alert("Failed to update role: " + error);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-soft text-sm">
      {loading ? (
        <p className="p-6 text-cocoa/70">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-sand text-cocoa">
              <tr>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">User ID</th>
                <th className="p-4 font-semibold">Joined At</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users.length === 0 ? (
                <tr><td colSpan="5" className="p-6 text-center text-cocoa/70">No profiles found.</td></tr>
              ) : users.map(user => (
                <tr key={user.id} className="hover:bg-neutral-50/50">
                  <td className="p-4 font-medium text-cocoa">{user.email || "N/A"}</td>
                  <td className="p-4 text-cocoa/80 truncate max-w-[150px]">{user.id}</td>
                  <td className="p-4 text-cocoa/80">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                      user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-sand text-cocoa'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleRoleChange(user.id, user.role)}
                      className="text-xs font-semibold text-rose hover:underline"
                    >
                      Make {user.role === 'admin' ? 'User' : 'Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-[#faf9f8]">
      <div className="container-padded py-12">
        <header className="mb-8">
          <h1 className="font-[var(--font-heading)] text-4xl text-primary font-black tracking-tighter">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-primary/80">Manage products, orders, and user roles.</p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          {["products", "orders", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-primary border border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === "products" && <ProductsView />}
          {activeTab === "orders" && <OrdersView />}
          {activeTab === "users" && <UsersView />}
        </div>
      </div>
    </div>
  );
}
