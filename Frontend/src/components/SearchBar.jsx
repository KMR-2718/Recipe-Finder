function SearchBar({ value, onChange, onSearch }) {
    const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        onSearch();
        }
    };
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Search recipe..."
        className="border rounded-lg px-4 py-3 w-full sm:w-96 outline-none"
      />

      <button
        onClick={onSearch}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;