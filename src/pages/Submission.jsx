import { useState } from "react";

function Submission() {
  //variables
  const [itemName, setItemName] = useState("");
  const [itemDisc, setItemDisc] = useState("");
  const [itemPhoto, setItemPhoto] = useState(null);
  function handleSubmit(e) {
    e.preventDefault(); 
    console.log("Item name:", itemName);
    console.log("Description:", itemDisc);
    console.log("Photo:", itemPhoto);
  }
  return (
    <div>
      <input type="text" id="item-submisson" required name="item-submission"></input> 
      <h1>Lost and Found Submission</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name of Item</label>
        <input type="text" required value={itemName} onChange={(e) => setItemName(e.target.value)}/>
        <label>Description of Item</label>
        <textarea required value={itemDisc} onChange={(e) => setItemDisc(e.target.value)}/>
        <label>Photo of Item</label>
        <input type="file" accept="image/*" onChange={(e) => setItemPhoto(e.target.files[0])}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Submission;