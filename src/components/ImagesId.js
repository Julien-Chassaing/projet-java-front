import React, { useEffect, useState } from "react";
import MyCards from "./MyCards";
import { getImageById } from "../api/Api";

const Images = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);

  useEffect(() => {
    if (playOnce) {
      getImageById(user.id).then((res) => setData(res));
      setPlayOnce(false);
    }
    const sortedImages = () => {
      const imagesObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = imagesObj.sort((a, b) => {
        return b.date - a.date;
      });
      setSortedData(sortedArray.reverse());
    };
    sortedImages();
  }, [data, playOnce, user.id]);

  return (
    <div className="images">
      <ul className="images-list">
        {sortedData.length !== 0 ? (
          sortedData.map((image) => <MyCards image={image} key={image.name} />)
        ) : (
          <h1>Vous n'avez pas encore d'image</h1>
        )}
      </ul>
    </div>
  );
};

export default Images;
