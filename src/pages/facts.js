import { useState, useEffect } from "react";
import Corenavbar from "../components/navbar"

export default function Facts() {
    // Define state
    const [facts, setFacts] = useState([]);

    // Perform fetch and update state
    useEffect(() => {
        // API URL 
        const apiURL = "https://meowfacts.herokuapp.com/";
        console.log(apiURL);

        // API call - then convert to json - then log it to console and set state
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFacts(data.data); 
            })
            .catch(error => console.error("Error fetching data:", error)); // Handle errors
    }, []);

    return (
        <>
        <Corenavbar></Corenavbar>
            <div class="facts">
            <h1 class="title-cat">Here are some CAT FACTS:</h1>
            <p class="fact">{facts.map((fact, index) => <div key={index}>{JSON.stringify(fact)}</div>)}</p>
                <img src="https://http.cat/200.jpg" alt="Success Cat" />
            </div>
        </>
    );
}