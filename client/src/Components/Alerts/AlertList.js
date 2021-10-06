import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

import webHost from '../../config/web';
import api from '../../config/web';
import CreateAlert from './CreateAlert';
import LOCAL_STORAGE_KEYS from '../../constants/localStorageKeys';

const AlertList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const creatorId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE)).result._id;

  const creatorsList = list.filter(alert => alert.creator == creatorId);

  let alertsByCreator = (
    list.filter(alert => alert.creator == creatorId).map(alert => (
      <div className="card card-primary card-outline" key={alert._id}>
        <div className="card-body">
          <h5 className="class-title">Symbol: {alert.symbol}</h5>
          <p className="card-text">
            Send me a email if price if {alert.condition === 1 ? 'more than' : 'less than'} {alert.value}.
          </p>
          <button onClick={() => update(alert._id)}>Edit</button>
          &nbsp;
          <button onClick={() => deleteHandler(alert._id)}>Delete</button>
        </div>
      </div>
    ))
  );

  const deleteHandler = (id) => {
    //delete alert using the id
    axios.delete(`${api.URI}/${id}`)
      .then((response) => {
        //reload page after deleting alert
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const update = (id) => {
    history.push(`/alerts/update/${id}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      //calling the API to get all alerts from database ( locally)
      await axios.get(webHost.URI + "/getAllAlerts")
        .then((res) => {
          setList(res.data.alertList)
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchData();
  }, [])

  if (loading) {
    return (
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body row">
            <h2>Loading....</h2>
          </div>
        </div>
      </div>
    );
  }
  if (creatorsList.length === 0) {
    return (
      <div className="content-wrapper">
        <div className="container-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>List of Alerts</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body row">
            <h4>No alerts found.</h4>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="content-wrapper">
        <div className="container-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>List of Alerts</h1>
              </div>
            </div>
          </div>
        </div>
        {alertsByCreator}
      </div>
    )
  };
}

export default AlertList;