import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { uploadImage, getAllCategories } from "../api/Api";
import MultiSelect from "react-multi-select-component";

const FormUpload = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { register, handleSubmit } = useForm();

  const [categories, setCategories] = useState([]);
  const [valueForSelect] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [copyright, setCopyright] = useState();
  const [selected, setSelected] = useState([]);

  let categorie = [];
  selected.map((response) => categorie.push(response.value));

  useEffect(() => {
    if (playOnce) {
      getAllCategories().then((response) => {
        setCategories(response);
        setPlayOnce(false);
      });
    }
    createOptionsForSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playOnce]);

  const createOptionsForSelect = () => {
    // eslint-disable-next-line array-callback-return
    categories.map((category) => {
      valueForSelect.push({
        value: category.id,
        label: category.name,
      });
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("NameWS", name);
    formData.append("file", data.file[0]);
    formData.append("description", description);
    formData.append("categorie", categorie);
    formData.append("copyright", copyright);
    formData.append("idUser", user.id);

    uploadImage(formData).then((response) => {
      console.log(response);
      props.checkUpload(response);
    });
  };

  return (
    <>
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Upload une image</h3>
          <br />
          <div class="form-group col-md-6">
            <label>Nom de l'image</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label>Description</label>
            <textarea
              class="form-control"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div class="form-group col-md-6" style={{ paddingBottom: 16 }}>
            <label>Catégorie(s)</label>
            <MultiSelect
              disableSearch
              options={valueForSelect}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>

          <label style={{ paddingRight: 10 }}>Copyright</label>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="1"
              onChange={(e) => setCopyright(e.target.value)}
              required
            />
            <label class="form-check-label" for="inlineRadio1">
              Oui
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="0"
              onChange={(e) => setCopyright(e.target.value)}
              required
            />
            <label class="form-check-label" for="inlineRadio2">
              Non
            </label>
          </div>
          <br />
          <input
            accept="image/*"
            type="file"
            name="file"
            style={{ paddingTop: 16, paddingBottom: 16 }}
            {...register("file")}
            required
          />
          <button
            type="submit"
            className="btnupload btn btn-dark btn-lg btn-block"
          >
            <span>Upload</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default FormUpload;
