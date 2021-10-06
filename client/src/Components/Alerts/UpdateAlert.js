import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { updateAlert } from "../../actions/alerts";
import { useDispatch, useSelector } from "react-redux";
import webHost from '../../config/web';

import api from "../../config/web";
import { BINANCE_URL } from "../../constants/constants";

const UpdateAlert = () => {
  const [alertData, setAlertData] = useState({});
  const [symbols, setSymbols] = useState([]);

  const dispatch = useDispatch();
  const {id} = useParams();

  const history = useHistory();

  useEffect(() => {
    const fetchSymbolsList = () => {
      axios
        .get(`${BINANCE_URL}/exchangeInfo`)
        .then((res) => {
          let symbolList = [];
          res.data.symbols.forEach(function (item) {
            symbolList.push({ value: item.symbol, label: item.symbol });
          });
          setSymbols(symbolList);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchData = async () => {
        //calling the API to get all alerts from database ( locally)
        await axios.get(webHost.URI + `/updateAlert/${id}`)
          .then(async (res) => {
            setSymbol(res.data.alert.symbol);
            setCondition(res.data.alert.condition);
            setValue(res.data.alert.value);
            await console.log(value);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      fetchData();
    fetchSymbolsList();
  }, []);

  const [symbol, setSymbol] = useState(alertData.symbol);
  const [condition, setCondition] = useState(alertData.condition);
  const [value, setValue] = useState(alertData.value);

  const onChangeSymbol = (value, { action }) => {
    switch (action) {
      case "clear":
        if (value === null) {
          setSymbol("");
        }
        break;
      case "select-option":
        setSymbol(value.value);
        break;
      default:
        break;
    }
  };

  const onChangeValue = (event) => {
    setValue(event.target.value);
  };

  const onChangeCondition = (event) => {
    setCondition(parseInt(event.target.value));
  };

  const onUpdateAlert = (event) => {
    event.preventDefault();
    dispatch(updateAlert(id, {symbol, condition, value}));
    history.push("/alerts");
  };

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <form onSubmit={onUpdateAlert}>
          <div className="card-Header">
            <h4>
              <i className="fa fa-bell"></i>Update Alert 
            </h4>
          </div>
          <div className="card-body">
            <div className="form-group">
              <Select
                name="symbol"
                isClearable={true}
                options={symbols}
                onChange={onChangeSymbol}
                placeholder={symbol}
                isSearchable
                noOptionsMessage={() => "No symbol found."}
              />
            </div>
            <div className="form-group">
              <label>Condition</label>
              <select
                className="form-control"
                name="condition"
                value={condition}
                onChange={onChangeCondition}
              >
                <option>Select option</option>
                <option value="1"> More than </option>
                <option value="2"> Less than</option>
              </select>
            </div>
            <div className="form-group">
              <label>Target Value</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Value"
                name="value"
                value={value}
                onChange={onChangeValue}
              />
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            &nbsp;
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UpdateAlert;
