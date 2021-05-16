import React from "react";
import { useHistory } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import Chip from "@material-ui/core/Chip";

const SelectedImage = () => {
  const image = JSON.parse(localStorage.getItem("image"));

  const trys = image.link;
  const history = useHistory();

  const getExtention = image.name.substr(36);

  const namefile = image.namews + getExtention;

  const fileDownloadHandler = async (pictureUrl) => {
    const response = await fetch(pictureUrl);
    response.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = namefile;
      a.click();
    });
  };

  const test = [
    {
      original: trys,
    },
  ];
  return (
    <div className="galeryImage">
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
        {image.keywordsImg.length !== 0 && (
          <div className="mot">
            <div className="col-md-6" style={{ paddingBottom: 20 }}>
              <div className="row">
                <h5 className="col-md-3">Keywords :</h5>
                <div className="col-md-9">
                  {image.keywordsImg.map((response) => (
                    // <h5>
                    //   <>{response.name} </>
                    // </h5>

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
        )}
      </div>

      <div className="download">
        <a
          href
          type="button"
          className="btn btn-dark btn-sm btn-block btn-back"
          onClick={() => fileDownloadHandler(image.link)}
        >
          Download <i class="fal fa-download"></i>
        </a>
      </div>
    </div>
  );
};

export default SelectedImage;
