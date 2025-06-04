import { Component } from "react";

class Button extends Component{
    state = {
        age : 0
    }

handleAgeChange = () => {
    this.setState({age: this.state.age + 1 })
}

    render(){
        return <div className="flex justify-center flex-col mt-4">
            <button onClick={this.handleAgeChange} className='text-4xl hover:text-blue-300' >
                Zmen vek
            </button>

            <h1 className='text-blue-200 text-1xl text-center'>
                {this.state.age}
            </h1>
            <p className='text-blue-500 text-lg hover:text-blue-900 text-center'>
                {process.env.REACT_APP_API_URL}
            </p>
        </div>;
    }
}
export default Button;
