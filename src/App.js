import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const params = {
      method: "flickr.photos.search",
      api_key: "9c580d384a686702ae8255e45c01a079",
      text: searchText,
      sort: "",
      per_page: 40,
      license: "4",
      extras: "owner_name,license",
      format: "json",
      nojsoncallback: 1,
    };
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        const arr = res.data.photos.photo.map((imgData)=>{
          return fetchFlickrImageUrl(imgData, "q");
        });
        setImageData(arr);
      })
      .catch(() => {
        //console.log("error");
      })
      .finally(() => {
      //e.preventDefault()
      });
  }, [searchText]);
  const fetchFlickrImageUrl = (photo, size) => {
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if (size) {
      url += `_${size}`;
    } 
      url += `.jpg`;
      return url;
  };
  return (
    <>
      <h1 className="heading">Image Search App</h1>
      <input
        className="input"
        onChange={(e) => {
          searchData.current = e.target.value;
        }}
      />
      <button
        className="srhbtn"
        onClick={() => {
          setSearchText(searchData.current);
        }}
      >
        Search
      </button>
      <section>
        
      </section>
      <section className="image-container">
        {imageData.map((imageurl, key) => {
          return (
            <article className="flickr-image">
              <img src={imageurl} key={key} />
            </article>
          );
        })}
      </section>
    </>
  );
}

export default App;
