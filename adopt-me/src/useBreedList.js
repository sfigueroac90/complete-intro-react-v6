import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal){
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus ] = useState("unload");

    useEffect(()=> {
        if(!animal){
            setBreedList([])
        } else if ( localCache[animal]){
            setBreedList(localCache[animal])
        } else {
            requestBreedList();
        }
    } , [animal]
    )

    async function requestBreedList(){
        setBreedList([]);
        setStatus("loading");
        const dir = `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
        console.log(dir)
        const res = await fetch(
            dir
        )
      
        const json = await res.json();
        console.log(json)
        localCache[animal] = json.breeds || [];
        setBreedList(localCache[animal]);
        setStatus("loaded")
    }

    return [breedList, status]

}