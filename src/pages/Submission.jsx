import { useState } from "react";
import supabase  from '../config/supabaseClient.js'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Submission() {
  //variables
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemPhoto, setItemPhoto] = useState(null);
  {/* prevents site refresh on submission */}
  function handleSubmit(ev) {
    ev.preventDefault(); 
    console.log("Item name:", itemName);
    console.log("Type:", itemType)
    console.log("Description:", itemDesc);
    console.log("Photo:", itemPhoto);
  }
  async function send(name, desc, type, img) {
    await supabase.from("items").insert({
      item_name: name,
      item_type: type,
      item_desc: desc,
      img_url: img
    });
  }
  function checkSubmission() {
    if (itemName == "" || itemDesc == "" || itemType == "" || !itemPhoto) {
      alert("Please fill in all required fields!");
      return;
    }
    send(itemName, itemType, itemDesc, itemPhoto);
  }
  return (
    <div>
      <input type="text" id="item-submisson" required name="item-submission"></input> 
      <h1>Lost and Found Submission</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name of Item</label>
        <input type="text" required value={itemName} onChange={(ev) => setItemName(ev.target.value)}/>
        <label>Type of Item</label>
        <DropdownButton title="Select Item Type">
          <Dropdown.Item onClick={() => setItemType("Clothing")}>Clothing</Dropdown.Item>
          <Dropdown.Item onClick={() => setItemType("Electronics")}>Electronics</Dropdown.Item>
          <Dropdown.Item onClick={() => setItemType("Miscallaneous")}>Miscallaneous</Dropdown.Item>
        </DropdownButton>
        <label>Description of Item</label>
        <textarea required value={itemDesc} onChange={(ev) => setItemDesc(ev.target.value)}/>
        <label>Photo of Item</label>
        <input type="file" accept="image/*" onChange={(ev) => setItemPhoto(ev.target.files[0])}/>
        <button type="submit" onClick={() => checkSubmission()}>Submit</button>
      </form>
    </div>
  );
}

export default Submission;