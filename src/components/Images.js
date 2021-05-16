import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { getAllCategories, getAllImages } from "../api/Api";
import Select from "react-select";

const Images = () => {
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState([]);
  const [selected, setSelected] = useState("");
  const [valueForSelect] = useState([]);

  useEffect(() => {
    if (playOnce) {
      getAllCategories().then((res) => setCategorie(res));
      getAllImages().then((res) => setData(res));
      setPlayOnce((res) => setDataSearch(res));
    }
    const sortedImages = () => {
      const imagesObj = Object.keys(data).map((i) => data[i]);
      setSortedData(imagesObj.reverse());
    };
    createOptionsForSelect();
    sortedImages();
  }, [data, playOnce]);

  const createOptionsForSelect = () => {
    // eslint-disable-next-line array-callback-return
    categorie.map((category) => {
      valueForSelect.push({
        value: category.id,
        label: category.name,
      });
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="row" style={{ paddingTop: 80 }}>
          <div className="search col-md-6">
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
            </button>
          </div>
          <Select
            name="colors"
            isClearable={true}
            isSearchable={false}
            options={valueForSelect}
            className="basic-select selectedCat col-md-3"
            classNamePrefix="select"
            placeholder="Rechercher par catégorie"
            onChange={(value) => {
              if (value === null) {
                setSelected("");
              } else {
                setSelected(value.label);
              }
            }}
            required
          />
        </div>
        <div className="images">
          <ul className="images-list">
            {search === ""
              ? selected === "" || selected === null
                ? sortedData.map((image) => (
                    <Cards image={image} key={image.name} />
                  ))
                : sortedData
                    .filter((image) =>
                      image.categoriesImg
                        .map((res) => res.name)
                        .includes(selected)
                    )
                    .map((image) => <Cards image={image} key={image.name} />)
              : selected === ""
              ? sortedData
                  .filter(
                    (image) =>
                      (image.categoriesImg
                        .map((res) => res.name)
                        .includes(selected) === false &&
                        image.description
                          .toLowerCase()
                          .includes(search.toLowerCase()) === true) ||
                      (image.categoriesImg
                        .map((res) => res.name)
                        .includes(selected) === false &&
                        image.namews
                          .toLowerCase()
                          .includes(search.toLowerCase())) ||
                      (image.categoriesImg
                        .map((res) => res.name)
                        .includes(selected) === false &&
                        image.categoriesImg
                          .map((res) => res.name)
                          .includes(search.toLowerCase()))
                  )
                  .map((image) => <Cards image={image} key={image.name} />)
              : sortedData
                  .filter(
                    (image) =>
                      (image.categoriesImg
                        .map((res) => res.name)
                        .includes(selected) &&
                        image.description
                          .toLowerCase()
                          .includes(search.toLowerCase()) === true) ||
                      (image.categoriesImg
                        .map((res) => res.name)
                        .includes(selected) &&
                        image.namews
                          .toLowerCase()
                          .includes(search.toLowerCase())) ||
                      (image.categoriesImg
                        .map((res) => res.name)
                        .includes(selected) &&
                        image.categoriesImg
                          .map((res) => res.name)
                          .includes(search.toLowerCase()))
                  )
                  .map((image) => <Cards image={image} key={image.name} />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Images;
