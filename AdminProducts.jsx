import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Check, Package, Sparkles } from 'lucide-react';
import { productService } from '../../config/appwrite';
import { formatPKR } from '../../utils/currency';
import { COLLECTIONS, FRAGRANCE_FAMILIES } from '../../config/constants';
import { useToast } from '../../context/ToastContext';
import SEOHead from '../../components/common/SEOHead';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [collection, setCollection] = useState('oud');
  const [category, setCategory] = useState('Unisex');
  const [fragranceFamily, setFragranceFamily] = useState('Oud & Amber');
  const [price, setPrice] = useState(12000);
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState(25);
  const [longevity, setLongevity] = useState('12-16 Hours');
  const [sillage, setSillage] = useState('Enormous');
  const [concentration, setConcentration] = useState('Extrait de Parfum (28%)');
  const [topNotes, setTopNotes] = useState('Persian Saffron, Bergamot');
  const [heartNotes, setHeartNotes] = useState('Bulgarian Rose, Smoked Leather');
  const [baseNotes, setBaseNotes] = useState('Cambodian Oud, Golden Amber');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);

  const { showToast } = useToast();

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setTagline('');
    setDescription('');
    setCollection('oud');
    setCategory('Unisex');
    setFragranceFamily('Oud & Amber');
    setPrice(12000);
    setDiscountPrice('');
    setStock(25);
    setLongevity('12-16 Hours');
    setSillage('Enormous');
    setConcentration('Extrait de Parfum (28%)');
    setTopNotes('Persian Saffron, Bergamot');
    setHeartNotes('Bulgarian Rose, Smoked Leather');
    setBaseNotes('Cambodian Oud, Golden Amber');
    setImageUrl('https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop');
    setIsFeatured(false);
    setIsBestSeller(false);
    setIsNewArrival(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingProduct(p);
    setName(p.name);
    setTagline(p.tagline || '');
    setDescription(p.description || '');
    setCollection(p.collection);
    setCategory(p.category || 'Unisex');
    setFragranceFamily(p.fragranceFamily || 'Woody Oriental');
    setPrice(p.price);
    setDiscountPrice(p.discountPrice || '');
    setStock(p.stock || 20);
    setLongevity(p.longevity || '10-12 Hours');
    setSillage(p.sillage || 'Moderate');
    setConcentration(p.concentration || 'Eau de Parfum');
    setTopNotes((p.topNotes || []).join(', '));
    setHeartNotes((p.heartNotes || []).join(', '));
    setBaseNotes((p.baseNotes || []).join(', '));
    setImageUrl(p.images?.[0] || '');
    setIsFeatured(Boolean(p.isFeatured));
    setIsBestSeller(Boolean(p.isBestSeller));
    setIsNewArrival(Boolean(p.isNewArrival));
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id, prodName) => {
    if (window.confirm(`Are you certain you wish to retire "${prodName}" from the atelier catalog?`)) {
      await productService.delete(id);
      showToast(`Flacon "${prodName}" deleted.`, 'info');
      loadProducts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const topArr = topNotes.split(',').map(s => s.trim()).filter(Boolean);
    const heartArr = heartNotes.split(',').map(s => s.trim()).filter(Boolean);
    const baseArr = baseNotes.split(',').map(s => s.trim()).filter(Boolean);

    const sizesConfig = [
      { size: '30ml', price: Math.round(price * 0.45), inStock: true },
      { size: '50ml', price: Math.round(price * 0.65), inStock: true },
      { size: '100ml', price: Number(price), inStock: true },
    ];

    const payload = {
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      collection,
      category,
      fragranceFamily,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : null,
      stock: Number(stock),
      longevity,
      sillage,
      concentration,
      sizes: sizesConfig,
      topNotes: topArr,
      heartNotes: heartArr,
      baseNotes: baseArr,
      images: [imageUrl || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop'],
      isFeatured,
      isBestSeller,
      isNewArrival,
    };

    if (editingProduct) {
      await productService.update(editingProduct.id, payload);
      showToast(`Updated "${name}" successfully.`, 'success');
    } else {
      await productService.create(payload);
      showToast(`Created new flacon "${name}".`, 'success');
    }

    setIsModalOpen(false);
    loadProducts();
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.collection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEOHead title="Perfume Vault Management — Admin" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-gold-400 font-bold block mb-1">
              Atelier Vault
            </span>
            <h1 className="font-serif text-3xl font-bold text-ivory-50 uppercase tracking-tight">
              Perfume Catalog Management
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Create, edit, formulate notes, and manage stock quantities.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="bg-gold-gradient text-obsidian-950 font-semibold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:opacity-95 transition-all self-start"
          >
            <Plus className="w-4 h-4 text-obsidian-950" />
            <span>Add New Flacon</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between gap-4 bg-obsidian-850 p-4 rounded-xl border border-gold-500/20">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by title or collection..."
              className="w-full bg-obsidian-900 border border-gold-500/30 rounded-lg pl-9 pr-3 py-2 text-xs text-ivory-100 placeholder-gray-500 focus:outline-none focus:border-gold-400"
            />
          </div>
          <span className="text-xs text-gray-400">
            Total Flacons: <strong className="text-gold-300 font-semibold">{filtered.length}</strong>
          </span>
        </div>

        {/* Products Table */}
        <div className="bg-obsidian-850 border border-gold-500/20 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-gray-400 bg-obsidian-900 border-b border-obsidian-750">
                <tr>
                  <th className="py-3.5 px-4">Perfume</th>
                  <th className="py-3.5 px-3">Collection</th>
                  <th className="py-3.5 px-3">Family</th>
                  <th className="py-3.5 px-3">Base Price</th>
                  <th className="py-3.5 px-3">Stock Units</th>
                  <th className="py-3.5 px-3">Badges</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-800 text-gray-300">
                {filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-obsidian-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0]}
                          alt=""
                          className="w-10 h-12 object-cover rounded bg-obsidian-950 border border-gold-500/20 shrink-0"
                        />
                        <div>
                          <div className="font-serif font-bold text-ivory-100">{prod.name}</div>
                          <div className="text-[10px] text-gold-300/80 italic font-display">{prod.tagline}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 uppercase text-[10px] font-semibold text-gold-400">
                      {prod.collection}
                    </td>
                    <td className="py-3 px-3 text-[11px] text-gray-300">
                      {prod.fragranceFamily}
                    </td>
                    <td className="py-3 px-3 font-serif font-bold text-ivory-100">
                      {formatPKR(prod.price)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        prod.stock <= 15 ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40' : 'text-emerald-400'
                      }`}>
                        {prod.stock} Units
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1">
                        {prod.isBestSeller && <span className="text-[9px] bg-gold-500/20 text-gold-300 px-1.5 py-0.5 rounded">Best</span>}
                        {prod.isNewArrival && <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">New</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(prod)}
                          className="p-1.5 bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/20 text-gold-300 rounded transition-colors"
                          title="Edit Flacon"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          className="p-1.5 bg-obsidian-800 hover:bg-red-950/40 border border-obsidian-750 text-gray-400 hover:text-red-400 rounded transition-colors"
                          title="Delete Flacon"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 sm:p-8 z-10 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gold-500/15">
                  <h3 className="font-serif text-xl font-bold text-ivory-50 uppercase tracking-wide">
                    {editingProduct ? `Edit Flacon: ${editingProduct.name}` : 'Create New Luxury Flacon'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-ivory-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Perfume Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Royal Oud Al-Sultan"
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Evocative Tagline
                      </label>
                      <input
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="e.g. Imperial Majesty in Every Drop"
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Detailed Narrative Description
                    </label>
                    <textarea
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Story, character, inspiration, and olfactory trail..."
                      className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Collection
                      </label>
                      <select
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                      >
                        {COLLECTIONS.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                      >
                        <option value="Unisex">Unisex</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Fragrance Family
                      </label>
                      <select
                        value={fragranceFamily}
                        onChange={(e) => setFragranceFamily(e.target.value)}
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                      >
                        {FRAGRANCE_FAMILIES.filter(f => f !== 'All Families').map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        100ml Base Price (PKR)
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Sale Price (PKR - Optional)
                      </label>
                      <input
                        type="number"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        placeholder="Leave blank if not on sale"
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                        Stock Quantity (Units)
                      </label>
                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Notes Pyramid inputs */}
                  <div className="p-3 bg-obsidian-850 rounded-lg border border-gold-500/20 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-gold-400">Fragrance Pyramid Notes (Comma-separated)</div>
                    <div>
                      <label className="text-[10px] text-gray-400">Top Notes:</label>
                      <input
                        type="text"
                        value={topNotes}
                        onChange={(e) => setTopNotes(e.target.value)}
                        className="w-full bg-obsidian-900 border border-gold-500/20 rounded px-2.5 py-1.5 text-xs text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Heart Notes:</label>
                      <input
                        type="text"
                        value={heartNotes}
                        onChange={(e) => setHeartNotes(e.target.value)}
                        className="w-full bg-obsidian-900 border border-gold-500/20 rounded px-2.5 py-1.5 text-xs text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Base Notes:</label>
                      <input
                        type="text"
                        value={baseNotes}
                        onChange={(e) => setBaseNotes(e.target.value)}
                        className="w-full bg-obsidian-900 border border-gold-500/20 rounded px-2.5 py-1.5 text-xs text-ivory-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Product Flacon Image URL (Appwrite Storage or Web)
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-obsidian-850 border border-gold-500/30 rounded px-3 py-2 text-ivory-100 focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="flex gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isBestSeller}
                        onChange={(e) => setIsBestSeller(e.target.checked)}
                        className="accent-gold-500"
                      />
                      <span>Best Seller</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isNewArrival}
                        onChange={(e) => setIsNewArrival(e.target.checked)}
                        className="accent-gold-500"
                      />
                      <span>New Arrival</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="accent-gold-500"
                      />
                      <span>Featured</span>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-obsidian-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded text-gray-400 hover:text-ivory-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-semibold px-6 py-2 rounded uppercase tracking-wider"
                    >
                      Save Flacon
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
