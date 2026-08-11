import { useState } from "react";
import useDebounce from "./hooks/useDebounce";

function Search(){
    const[find,setFind]=useState("")

    const debouncedSearch=useDebounce(find,1000)
    return (
  <div>

    {/* Search input */}
    <input
      type="text"
      value={find}
      onChange={(e) => setFind(e.target.value)}
      placeholder="Search..."
    />

    <p>Typing: {find}</p>

    
    <p>Debounced: {debouncedSearch}</p>

  </div>
);
}
export default Search;

