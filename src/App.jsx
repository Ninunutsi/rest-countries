import "./App.css";
import Country from "./components/Country";
import { useState } from "react";
import useFetch from "./hooks/useFetch";
import Pagination from "./components/Pagination";

function App() {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useFetch(
    "https://restcountries.com/v3.1/all"
  );

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const countryArray = Object.values(data);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = countryArray.slice(startIndex, endIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <header>
        <h1>REST Countries Data</h1>
      </header>
      <main>
        <div className="country-main">
          {slicedData.map(
            ({ flags, name, region, capital, population }, key) => (
              <Country
                key={key}
                flag={flags.png}
                name={name.common}
                region={region}
                capital={capital}
                population={population}
              />
            )
          )}
        </div>
        <div className="pagination">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={Object.keys(data).length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
