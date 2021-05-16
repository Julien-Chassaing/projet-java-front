import React from "react";
import { useHistory } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import Chip from "@material-ui/core/Chip";
import { deleteImage } from "../api/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateImg = () => {
  const image = JSON.parse(localStorage.getItem("image"));

  const trys = image.link;
  const history = useHistory();
  const del = (id) => {
    deleteImage(id).then((response) => console.log(response));
    toast.error("Image successfully deleted !", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      onClose: () => history.push("/myimages"),
    });
  };
  const test = [
    {
      original: trys,
    },
  ];
  return (
    <div className="galeryImage">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <div className="col-md-2">
        <a
          href
          type="button"
          className="btn btn-dark btn-sm btn-block btn-back"
          onClick={() => history.push("/")}
        >
          <i class="far fa-long-arrow-left"></i> Retour
        </a>
      </div>
      <div className="img">
        <ImageGallery
          items={test}
          showPlayButton={false}
          showBullets={false}
          showThumbnails={false}
          showFullscreenButton={false}
          showNav={false}
        />
      </div>
      <div className="row">
        <div className="col-md-2">
          <h5>Créateur : {image.users.identifier}</h5>
        </div>

        {image.categoriesImg.length !== 0 && (
          <div className="col-md-6" style={{ paddingLeft: 50 }}>
            <div className="row">
              <h5 className="col-md-3">Catégories :</h5>
              <div className="col-md-9">
                {image.categoriesImg.map((response) => (
                  // <h5>
                  //   <>{response.name} </>
                  // </h5>

                  <Chip
                    className="test"
                    style={{ marginRight: 8 }}
                    label={response.name}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div style={{ paddingTop: 40 }}>
          <h5>Nom : {image.namews}</h5>
          <h5>Descriptions : {image.description}</h5>
        </div>
        <div className="mot">
          <div className="col-md-6" style={{ paddingBottom: 20 }}>
            <div className="row">
              <h5 className="col-md-3">Keywords :</h5>
              <div className="col-md-9">
                {image.keywordsImg.map((response) => (
                  <Chip
                    className="test"
                    style={{ marginRight: 8 }}
                    label={response.libelle}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="download">
        <a
          href
          type="button"
          className="btn btn-dark btn-sm btn-block btn-del"
          onClick={() => {
            del(image.id);
          }}
        >
          Delete <i class="fal fa-trash-alt"></i>
        </a>
      </div>
    </div>
  );
};

export default UpdateImg;
