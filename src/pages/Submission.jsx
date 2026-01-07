// Submission page component - Form for submitting lost/found items
import { useState } from "react";
import supabase  from '../config/supabaseClient.js'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function Submission() {
  // Form state variables
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemType, setItemType] = useState("Select Item Type");
  const [itemPhoto, setItemPhoto] = useState(null);

  // Prevent page refresh on form submission
  function handleSubmit(ev) {
    ev.preventDefault(); 
    console.log("Item name:", itemName);
    console.log("Type:", itemType)
    console.log("Description:", itemDesc);
    console.log("Photo:", itemPhoto);
  }

  // Validate and submit item data to database
  function checkSubmission() {
    // Check if all required fields are filled
    if (itemName === "" || itemDesc === "" || itemType === "Select Item Type" || !itemPhoto) {
      alert("Please fill in all required fields!");
      return;
    }

    // Upload file first
    var filePath = "item_photos/" + Date.now() + "-" + itemPhoto.name;

    // Upload image to Supabase storage
    supabase.storage
      .from("item-images")
      .upload(filePath, itemPhoto).then(function(uploadResponse) {
        if (uploadResponse.error) {
          console.error("Upload error:", uploadResponse.error);
          alert("Failed to upload image.");
          return;
        }

        // Get public URL for uploaded image
        var urlResponse = supabase.storage
          .from("item-images")
          .getPublicUrl(filePath);

        var imgUrl = urlResponse.data.publicUrl;

        // Insert item data into database
        supabase
          .from('items')
          .insert([{
            item_name: itemName,
            item_type: itemType,
            item_desc: itemDesc,
            image_url: imgUrl,
            status: 'pending'
          }]).then(function(insertResponse) {
            if (insertResponse.error) {
              console.error("Insert error:", insertResponse.error);
              alert("Failed to save item.");
              return;
            }

            alert("Item submitted successfully!");
          });
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-outfit mb-3">
              Submit an Item
            </h1>
            <p className="text-gray-600 text-lg font-outfit">
              Help reunite lost items with their owners
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white font-outfit">Item Details</h2>
            <p className="text-blue-100 mt-1">Please provide as much information as possible</p>
          </div>

          {/* Form Body */}
          <form 
            onSubmit={handleSubmit} 
            encType="multipart/form-data"
            className="p-8 space-y-6"
          >
            {/* Item Name */}
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold text-sm font-outfit flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Item Name *
              </label>
              <input
                type="text"
                required
                value={itemName}
                onChange={(ev) => setItemName(ev.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-outfit"
                placeholder="e.g., Black Jansport Backpack"
              />
            </div>

            {/* Item Type */}
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold text-sm font-outfit flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Item Type *
              </label>
              <DropdownButton 
                title={itemType} 
                className="w-full"
                variant="outline-secondary"
              >
                <Dropdown.Item as="button" onClick={() => setItemType("Clothing")}>
                  👕 Clothing
                </Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => setItemType("Electronics")}>
                  💻 Electronics
                </Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => setItemType("Shoes")}>
                  👟 Shoes
                </Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => setItemType("Miscellaneous")}>
                  📦 Miscellaneous
                </Dropdown.Item>
              </DropdownButton>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold text-sm font-outfit flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Description *
              </label>
              <textarea
                required
                value={itemDesc}
                onChange={(ev) => setItemDesc(ev.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-outfit"
                placeholder="Describe the item in detail including color, size, brand, distinguishing features..."
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold text-sm font-outfit flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Photo of Item *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(ev) => setItemPhoto(ev.target.files[0])}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-outfit file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {itemPhoto && (
                <div className="mt-2 text-sm text-gray-600 font-outfit">
                  📎 Selected: {itemPhoto.name}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                onClick={() => checkSubmission()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition-all duration-300 font-outfit transform hover:scale-[1.02] text-lg"
              >
                Submit Item
              </button>
            </div>
          </form>
        </div>

        
      </div>
    </div>
  );
}

export default Submission;