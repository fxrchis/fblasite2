import { useState } from 'react'

function Submission() {
  const [title, setTitle] = useState("");
  return (
    <div>
      <input type="text" id="item-submisson" required name="item-submission"></input>

    </div>
  )
}

export default Submission
