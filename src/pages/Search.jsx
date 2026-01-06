import { useState, useEffect } from 'react'
import supabase  from '../config/supabaseClient.js'
function Search() {
  //variables
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  function showItemDetails(item) {
    setSelectedItem(item)
    setShowDetails(true)
  }

  function closeDetails() {
    setShowDetails(false)
    setSelectedItem(null)
  }

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date'
    var date = new Date(dateString)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
  }

  function toggleCategory(value) {
    if (value === "all") {
      setCategories([]); // reset everything
      return;
    }

    var newCategories = [];
    var found = false;
    
    // Check if category is already selected
    for (var i = 0; i < categories.length; i++) {
      if (categories[i] === value) {
        found = true;
      } else {
        newCategories.push(categories[i]);
      }
    }
    
    // If not found, add it
    if (!found) {
      newCategories.push(value);
    }
    
    setCategories(newCategories);
  }

  function fetchItems() {
    setLoading(true);
    //Makes it so the user only sees pages in groups of 5
    var limit = 5;
    var from = (currentPage - 1) * limit;
    var to = from + limit - 1;

    //Retrieves the items from the data base and makes it so it's laid out by the order submitted
    var query = supabase
      .from("items")
      .select("*", { count: "exact" })
      .eq("status", "approved")
      .order("submitted_at", { ascending: false });

    //Checks if the user actually submitted something and checks to see if a name or description contains the text searched
    if (searchTerm.trim() !== "") {
      query = query.or(
        "item_name.ilike.%" + searchTerm + "%,item_desc.ilike.%" + searchTerm + "%"
      );
    }

    //Checks to see if a specific category is searched and than filters it
    if (categories.length > 0) {
      query = query.in("item_type", categories);
    }

    //Tells our data base which rows to return
    query = query.range(from, to);

    //pulls the array of rows and the total number of items
    query.then(function(response) {
      var data = response.data;
      var count = response.count;
      var error = response.error;

      //Logs an error if there is one
      if (error) {
        console.error("Error fetching items:", error);
        setItems([]);
        setTotalPages(1);
      } else {
        if (data) {
          setItems(data);
        } else {
          setItems([]);
        }
        var pages = Math.max(1, Math.ceil((count || 0) / limit));
        setTotalPages(pages);
      }
      setLoading(false);
    });
  }

  useEffect(function() {
    fetchItems();
  }, [searchTerm, categories, currentPage]);

  return (
    <div className="w-full h-screen bg-gray-100 font-outfit flex flex-col">
  
      {/* Header */}
      <h1 className='w-full border-b-2 border-gray-300 text-center p-4 text-3xl font-semibold text-gray-800 bg-white shadow-sm'>
        Search Lost Items
      </h1>

      {/* Search Bar */}
      <div className="w-full flex justify-center mt-6 px-4">
        <input 
          className="w-full max-w-2xl bg-white shadow-md border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text" 
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={function(e) { 
            setSearchTerm(e.target.value); 
            setCurrentPage(1); 
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar - Category Filter */}
        <div className="w-64 bg-white shadow-md p-4 m-4 rounded-xl border border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Filter Categories
          </h2>

          <div className="flex flex-col gap-3 text-gray-700">
            {/* ALL */}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input 
                type="checkbox"
                checked={categories.length === 0}
                onChange={function() { toggleCategory("all"); }}
              />
              All Items
            </label>

            {/* Clothing */}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input 
                type="checkbox"
                checked={function() {
                  for (var i = 0; i < categories.length; i++) {
                    if (categories[i] === "clothing") {
                      return true;
                    }
                  }
                  return false;
                }()}
                onChange={function() { toggleCategory("clothing"); }}
              />
              Clothing
            </label>

            {/* Accessories */}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input 
                type="checkbox"
                checked={function() {
                  for (var i = 0; i < categories.length; i++) {
                    if (categories[i] === "accessories") {
                      return true;
                    }
                  }
                  return false;
                }()}
                onChange={function() { toggleCategory("accessories"); }}
              />
              Accessories
            </label>

            {/* Electronics */}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input 
                type="checkbox"
                checked={function() {
                  for (var i = 0; i < categories.length; i++) {
                    if (categories[i] === "electronics") {
                      return true;
                    }
                  }
                  return false;
                }()}
                onChange={function() { toggleCategory("electronics"); }}
              />
              Electronics
            </label>

            {/* Miscellaneous */}
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input 
                type="checkbox"
                checked={function() {
                  for (var i = 0; i < categories.length; i++) {
                    if (categories[i] === "miscellaneous") {
                      return true;
                    }
                  }
                  return false;
                }()}
                onChange={function() { toggleCategory("miscellaneous"); }}
              />
              Miscellaneous
            </label>
          </div>
        </div>

        {/* Center Content - Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600 text-lg">Loading...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && items.length === 0 && (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600 text-lg">No items found.</p>
            </div>
          )}

          {/* Result Cards */}
          {!loading && items.length > 0 && (
            <div className="flex flex-col items-center gap-4">
              {items.map(function(item) {
                return (
                  <div 
                    key={item.id} 
                    className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-md p-6 flex gap-8 items-center hover:shadow-lg transition cursor-pointer"
                    onClick={function() { showItemDetails(item); }}
                  >

                    {/* Image */}
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.item_name} 
                        className="w-36 h-36 object-cover rounded-lg border border-gray-300"
                      />
                    ) : (
                      <div className="w-36 h-36 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}

                    {/* Item Info */}
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-semibold text-gray-900">{item.item_name}</h2>
                      <p className="text-lg text-gray-700"><span className="font-medium">Type:</span> {item.item_type}</p>
                      <p className="text-base text-gray-600 mt-2">{item.item_desc}</p>
                      <p className="text-sm text-gray-400 mt-3">
                        Submitted {formatDate(item.submitted_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Item Details Modal */}
      {showDetails && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">{selectedItem.item_name}</h2>
                <button
                  onClick={closeDetails}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image Section */}
              <div className="mb-6">
                {selectedItem.image_url ? (
                  <img 
                    src={selectedItem.image_url} 
                    alt={selectedItem.item_name} 
                    className="w-full h-64 object-contain rounded-lg border border-gray-300 bg-gray-50"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Item Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Item Type</h3>
                    <p className="text-lg font-semibold text-gray-900">{selectedItem.item_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                    <span className={'inline-block px-3 py-1 text-sm rounded-full ' + (
                      selectedItem.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    )}>
                      {selectedItem.status || 'pending'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedItem.item_desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Submitted On</h3>
                    <p className="text-gray-700">{formatDate(selectedItem.submitted_at)}</p>
                  </div>
                  {selectedItem.created_at && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
                      <p className="text-gray-700">{formatDate(selectedItem.created_at)}</p>
                    </div>
                  )}
                </div>

                {selectedItem.submitted_by && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Submitted By</h3>
                    <p className="text-gray-700">{selectedItem.submitted_by}</p>
                  </div>
                )}

                {selectedItem.location_found && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Where It Was Found</h3>
                    <p className="text-gray-700">{selectedItem.location_found}</p>
                  </div>
                )}

                {selectedItem.claim_status && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Claim Status</h3>
                    <span className={'inline-block px-3 py-1 text-sm rounded-full ' + (
                      selectedItem.claim_status === 'claimed' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    )}>
                      {selectedItem.claim_status}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4 justify-end">
                <button
                  onClick={closeDetails}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105"
                >
                  Close
                </button>
                <a
                  href="/claim"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-outfit transform hover:scale-105"
                >
                  Claim This Item
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="w-full bg-white shadow-inner p-4 flex justify-center items-center gap-6 border-t border-gray-300">
        <button 
          disabled={currentPage === 1}
          onClick={function() { setCurrentPage(currentPage - 1); }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105"
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button 
          disabled={currentPage === totalPages}
          onClick={function() { setCurrentPage(currentPage + 1); }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105"
        >
          Next
        </button>
      </div>

    </div>
  );

}

export default Search
