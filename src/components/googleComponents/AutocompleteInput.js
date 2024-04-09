import { Loader } from "@googlemaps/js-api-loader";
import { useEffect,useRef} from "react";
import './AutocompleteInput.scss'
const AutocompleteInput = ({value='',onChange,...props}) =>{
const autoCompleteRef = useRef(null)

useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
      libraries: ["places"]
    });

    loader.load().then(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
        types: ["address"], 
      })

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace()
        if(place.formatted_address){
          onChange(place.formatted_address)
        }else if (place.name){
          onChange(place.name)
        }
      })
    })
  }, [onChange])

  return(
    <input
        className="autoCompleteInput"
        ref={autoCompleteRef}
        type="text"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        {...props}
        ></input>
  )
}

export default AutocompleteInput