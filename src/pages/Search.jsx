import { useState, useEffect } from 'react'
import supabase  from '../config/supabaseClient.js'
function Search() {
  //variables
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  
  function toggleCategory(value) {
    if (value === "all") {
      setCategories([]); // reset everything
      return;
    }

    if (categories.includes(value)) {
      setCategories(categories.filter((c) => c !== value));
    } else {
      setCategories([...categories, value]);
    }
  }

  async function fetchItems() {
    setLoading(true);
    //Makes it so the user only sees pages in groups of 5
    const limit = 5;
    const from = (currentPage - 1) * limit;
    const to = from + limit - 1;

    //Retrieves the items from the data base and makes it so it's laid out by the order submitted
    let query = supabase
      .from("items")
      .select("*", { count: "exact" })
      .order("submitted_at", { ascending: false });

    //Checks if the user actually submitted something and checks to see if a name or description contains the text searched
    if (searchTerm.trim() !== "") {
      query = query.or(
        `item_name.ilike.%${searchTerm}%,item_desc.ilike.%${searchTerm}%`
      );
    }

    //Checks to see if a specific category is searched and than filters it
    if (categories.length > 0) {
      query = query.in("item_type", categories);
    }

    //Tells our data base which rows to return
    query = query.range(from, to);

    //pulls the array of rows and the total number of items
    const { data, count, error } = await query;

    //Logs an error if there is one
    if (error) {
      console.error("Error fetching items:", error);
      setItems([]);
      setTotalPages(1);
    } else {
      setItems(data || []);
      const pages = Math.max(1, Math.ceil((count || 0) / limit));
      setTotalPages(pages);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, [searchTerm, categories, currentPage]);

  return (
    <div className="w-full h-screen bg-gray-100 font-outfit flex flex-col items-center">
  
      {/* Header */}
      <h1 className='w-full border-b-2 border-gray-300 text-center p-4 text-3xl font-semibold text-gray-800 bg-white shadow-sm'>
        Search Lost Items
      </h1>

      {/* Search Bar */}
      <div className="w-full flex flex-col items-center mt-6">
        <input 
          className="w-1/2 bg-white shadow-md border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text" 
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* Category Filter */}
      <div className="w-full flex flex-col items-center mt-4">
        <div className="bg-white shadow-md p-4 rounded-xl border border-gray-300 w-[300px]">

          <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
            Filter Categories
          </h2>

          <div className="flex flex-col gap-2 text-gray-700">

            {/* ALL */}
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={categories.length === 0}
                onChange={() => toggleCategory("all")}
              />
              All Items
            </label>

            {/* Clothing */}
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={categories.includes("clothing")}
                onChange={() => toggleCategory("clothing")}
              />
              Clothing
            </label>

            {/* Accessories */}
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={categories.includes("accessories")}
                onChange={() => toggleCategory("accessories")}
              />
              Accessories
            </label>

            {/* Electronics */}
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={categories.includes("electronics")}
                onChange={() => toggleCategory("electronics")}
              />
              Electronics
            </label>

            {/* Miscellaneous */}
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={categories.includes("miscellaneous")}
                onChange={() => toggleCategory("miscellaneous")}
              />
              Miscellaneous
            </label>

          </div>

        </div>
      </div>


      {/* Loading */}
      {loading && <p className="mt-6 text-gray-600">Loading...</p>}

      {/* No Results */}
      {!loading && items.length === 0 && (
        <p className="mt-6 text-gray-600 text-lg">No items found.</p>
      )}

      {/* Result Cards */}
      {!loading && items.length > 0 && (
        <div className="w-full flex flex-col items-center gap-4 mt-6 pb-24">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="w-[600px] bg-white border border-gray-200 rounded-xl shadow-md p-4 flex gap-6 items-center hover:shadow-lg transition cursor-pointer"
            >

              {/* Image */}
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.item_name} 
                  className="w-28 h-28 object-cover rounded-lg border border-gray-300"
                />
              ) : (
                <div className="w-28 h-28 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* Item Info */}
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900">{item.item_name}</h2>
                <p className="text-gray-700"><span className="font-medium">Type:</span> {item.item_type}</p>
                <p className="text-gray-600 text-sm mt-1">{item.item_desc}</p>

                <p className="text-xs text-gray-400 mt-2">
                  Submitted {new Date(item.submitted_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="w-full bg-white shadow-inner p-4 mt-auto flex justify-center items-center gap-6 border-t border-gray-300">
        
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>

      </div>

    </div>

  );

}

export default Search
