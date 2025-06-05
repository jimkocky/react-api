import image from "../assets/image.png"
import Button from "../components/button"
import Corenavbar from "../components/navbar"
export default function About(){
    return(
    <>
    <Corenavbar></Corenavbar>
    <div class="about">
        <h1>Ahoj, já jsem Ondra a jsem z Baltaci.</h1>
        <p>...</p>
        <img className src= {image}></img>
        <Button name="jim"></Button>
    </div>
    </>
    )
}