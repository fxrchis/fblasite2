import { useState } from 'react'
import supabase  from '../config/supabaseClient.js'
function Search() {
  //variables
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <h1>Search</h1>
  )
}

export default Search
