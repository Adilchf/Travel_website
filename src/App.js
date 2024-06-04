import React, { useState, useEffect } from 'react';
import { getPlacesData  } from './api/index.js';
import { CssBaseline , Grid } from '@material-ui/core';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'


function App() {

  const [places , setPlaces]= useState([]);
  const [coordinates , setCoordinates]= useState({});
  const [bounds , setBounds]= useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (bounds) {  // Check if bounds is not null
      getPlacesData(bounds.sw, bounds.ne)
      .then((data) => {
        console.log(data)
        setPlaces(data);
        setIsLoading(false);
      });
    }
  }, [coordinates, bounds]);
  



    return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width :'100%'}}>
      <Grid item xs={12} md={4}>
        <List 
          isLoading={isLoading}
          places={places}
          childClicked={childClicked}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Map 
          setChildClicked={setChildClicked}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={places}
        />
      </Grid>

      </Grid>
    
    </>
  );
}

export default App;
