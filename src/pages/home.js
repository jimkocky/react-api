import image from "../assets/image.png"
import Button from "../components/button"
import Corenavbar from "../components/navbar"
export default function Home(){
    return(
    <>
    <Corenavbar></Corenavbar>
    <div class="home">
        <h1 class="h1-react">JimKocky's React</h1>
        <img className src= {image}></img>
        <Button name="jim"></Button>
    </div>
    </>
    )
}