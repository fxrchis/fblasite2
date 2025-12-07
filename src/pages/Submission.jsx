import { useState } from "react";
import supabase  from '../config/supabaseClient.js'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function Submission() {
  //variables
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemType, setItemType] = useState("Select Item Type");
  const [itemPhoto, setItemPhoto] = useState(null);
  {/* prevents site refresh on submission */}
  function handleSubmit(ev) {
    ev.preventDefault(); 
    console.log("Item name:", itemName);
    console.log("Type:", itemType)
    console.log("Description:", itemDesc);
    console.log("Photo:", itemPhoto);
  }
  {/* sends data to supabase */}
  async function checkSubmission() {
    if (itemName === "" || itemDesc === "" || itemType === "Select Item Type" || !itemPhoto) {
      alert("Please fill in all required fields!");
      return;
    }

    // Upload file first
    const filePath = `item_photos/${Date.now()}-${itemPhoto.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("item-images")
      .upload(filePath, itemPhoto);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      alert("Failed to upload image.");
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("item-images")
      .getPublicUrl(filePath);

    const imgUrl = urlData.publicUrl;

    // Insert into database
    const { data, error } = await supabase
      .from("items")
      .insert({
        item_name: itemName,
        item_type: itemType,
        item_desc: itemDesc,
        image_url: imgUrl // is now converted into a string
      });

    if (error) {
      console.error("Insert error:", error);
      alert("Failed to save item.");
      return;
    }

    alert("Item submitted successfully!");
  }


  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-6 font-outfit">

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Lost and Found Submission
      </h1>

      <form 
        onSubmit={handleSubmit} 
        encType="multipart/form-data"
        className="w-full max-w-xl bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
      >

        {/* Item Name */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Name of Item</label>
          <input
            type="text"
            required
            value={itemName}
            onChange={(ev) => setItemName(ev.target.value)}
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ex. Black Jansports Backpack"
          />
        </div>

        {/* Item Type */}
        <div className="flex flex-col items-center">
          <label className="text-gray-700 font-medium mb-1">Type of Item</label>
          <DropdownButton 
            title={itemType} 
            className=""
          >
            <Dropdown.Item as="button" onClick={() => setItemType("Clothing")}>
              Clothing
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setItemType("Electronics")}>
              Electronics
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setItemType("Electronics")}>
              Shoes
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setItemType("Miscellaneous")}>
              Miscellaneous
            </Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Description</label>
          <textarea
            required
            value={itemDesc}
            onChange={(ev) => setItemDesc(ev.target.value)}
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe the item..."
          />
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Photo of Item</label>
          <input
            type="file"
            accept="image/*"
            onChange={(ev) => setItemPhoto(ev.target.files[0])}
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={() => checkSubmission()}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition"
        >
          Submit
        </button>
      </form> 
    </div>

  );
}

export default Submission;