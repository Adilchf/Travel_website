import React, { useState, useEffect } from 'react';
import { getPlacesData  } from './api/index.js';
import { CssBaseline , Grid } from '@material-ui/core';
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'


function App() {

  const [places , setPlaces]= useState([]);
  const [coordinates , setCoordinates]= useState({});
  const [type , setType]= useState('restaurants');
  const [rating, setRating]= useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [bounds , setBounds]= useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    if (bounds) {  // Check if bounds is not null
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setFilteredPlaces([]);
          setRating('');
          setIsLoading(false);
        });
      
    }
  }, [ type, bounds]);
  
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };



    return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{width :'100%'}}>
      <Grid item xs={12} md={4}>
        <List 
          isLoading={isLoading}
          places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
        />
      </Grid>
      <Grid item xs={12} md={8}  >
        <Map 
          setChildClicked={setChildClicked}
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
        />
      </Grid>

      </Grid>
    
    </>
  );
}

export default App;
