import { useState, useEffect } from 'react'
import supabase  from '../config/supabaseClient.js'
function Search() {
  //variables
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

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
    if (category !== "all") {
      query = query.eq("item_type", category);
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
  }, [searchTerm, category, currentPage]);

  return (
    <div className="w-full h-screen bg-white font-outfit flex flex-col items-center">
      <h1 className='w-full border-b-2 border-gray-950 text-center p-2'>Search</h1>
      {/* Search Bar */}
      <div className="w-full flex justify-center mb-4 p-3">
        <input className="w-1/2 bg-gray-200 font-semibold rounded-xl p-2 text-gray-950" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}/>
      </div>
      
      <div className='w-full bg-green-300'>
        {/* Category select */}
        <select value={category} onChange={(e) => {setCategory(e.target.value); setCurrentPage(1);}}>
          <option value="all">
            All
          </option>
          <option value="clothing">
            Clothing
          </option>
          <option value="accessories">
            Accessories
          </option>
        </select>
      </div>


      {/* Shows that it's loading */}
      {loading && <p>Loading...</p>}

      {/* Results */}
      {!loading && items.length === 0 && (
        <p>No items found.</p>
      )}

      {!loading && items.length > 0 && (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="border p-4 rounded-lg shadow bg-gray-50 flex gap-4"
            >
              {/* Image */}
              {item.image_url && (
                <img 
                  src={item.image_url} 
                  alt={item.item_name} 
                  className="w-24 h-24 object-cover rounded"
                />
              )}

              {/* Info */}
              <div>
                <h2 className="text-xl font-semibold">{item.item_name}</h2>
                <p className="text-gray-700">Type: {item.item_type}</p>
                <p className="text-gray-600">{item.item_desc}</p>
                <p className="text-sm text-gray-400">
                  Submitted: {new Date(item.submitted_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Pages Bar */}
      <div className='w-full bg-green-300 mt-auto p-3 flex justify-center items-center gap-4'>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          Previous
        </button>

        <span> 
          Page {currentPage} of {totalPages} 
        </span>

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );

}

export default Search
