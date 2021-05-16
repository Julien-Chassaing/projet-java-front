import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { analyseImage, setKeywords } from "../api/Api";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import { useHistory } from "react-router-dom";
registerLocale("fr", fr);

const FormKeyword = (props) => {
  const [dataAnalyse, setDataAnalyse] = useState([]);
  const [listChoice, setListChoice] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleSubmit } = useForm();
  const [motcle, setMotCle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      analyseImage(props.dataImage.id).then((response) => {
        setDataAnalyse(response.Labels);
        setLoading(false);
      });
    }
  }, [loading]);

  const searchPersonImg = () => {
    let result = false;
    dataAnalyse.map((response) => {
      if (response.Name === "Person" || response.Name === "Human") {
        result = true;
      }
    });
    return result;
  };

  const getCurrentDate = (date1, separator = "-") => {
    let newDate = date1;
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  };

  const onSubmit = async () => {
    const formDataMotsCle = new FormData();
    formDataMotsCle.append("keywords", listChoice);
    formDataMotsCle.append("date", getCurrentDate(startDate));
    formDataMotsCle.append("idImg", props.dataImage.id);
    console.log(listChoice);
    setKeywords(formDataMotsCle).then((response) => response);
    history.push("/");
  };

  const addListChoice = (data) => {
    setListChoice(listChoice.concat(data));
    document.getElementById(data).hidden = true;
  };

  const addChoiceList = (data) => {
    setListChoice(listChoice.concat(data));
  };

  const removeListChoice = (data) => {
    setListChoice(listChoice.filter((item) => item !== data));
    if (document.getElementById(data)) {
      document.getElementById(data).hidden = false;
    }
  };

  return (
    <div className="container">
      <img
        src={props.dataImage.link}
        class="img-fluid col-md-5"
        height="30%"
        width="30%"
        alt="imgs"
        style={{ paddingBottom: 30, paddingRight: 30 }}
      />
      {loading && (
        <div
          class="spinner-border"
          style={{ width: 48, height: 48 }}
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {dataAnalyse.length !== 0 && (
            <div className="row">
              <div className="col-md-4">
                <h5>Liste des choses détectés sur l'image :</h5>
                {dataAnalyse.map((response) => (
                  <p id={response.Name} key={response.Name}>
                    {response.Name} {response.Confidence.toFixed(2)}%
                    {!listChoice.includes(response.Name) && (
                      <button
                        className="btn btn-light btn-circle btn-sm"
                        onClick={() => addListChoice(response.Name)}
                        style={{
                          borderColor: "transparent",
                          backgroundColor: "transparent",
                        }}
                      >
                        <i class="fal fa-plus"></i>
                      </button>
                    )}
                  </p>
                ))}
              </div>
              <div class="form-group col-md-4">
                {searchPersonImg() && (
                  <div class="form-group">
                    <h5>Date d'accord de la personne présente</h5>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="P"
                      locale="fr"
                      required
                    />
                  </div>
                )}
                <h5>Ajouter dans la liste un autre mot clé</h5>
                <input
                  type="text"
                  class="form-control"
                  name="input_motcle"
                  id="input_motcle"
                  value={motcle}
                  onChange={(e) => setMotCle(e.target.value)}
                />
                <div>
                  <a
                    href
                    type="button"
                    className="btn btn-dark btn-sm btn-block btn-push"
                    onClick={() => {
                      addChoiceList(motcle);
                      setMotCle("");
                    }}
                  >
                    Ajouter <i class="fal fa-arrow-to-right"></i>
                  </a>
                </div>
              </div>
              <div className="col-md-4">
                <h5>Liste des mots clés pour votre image :</h5>
                {listChoice.map((response) => (
                  <p key={response}>
                    {response}

                    <button
                      className="btn btn-light btn-circle btn-sm"
                      onClick={() => removeListChoice(response)}
                      style={{
                        borderColor: "transparent",
                        backgroundColor: "transparent",
                      }}
                    >
                      <i class="fal fa-trash"></i>
                    </button>
                  </p>
                ))}
              </div>
              <button
                type="submit"
                className="btnupload btn btn-dark btn-lg btn-block"
              >
                <span>
                  Envoyer <i class="fal fa-paper-plane"></i>
                </span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormKeyword;
