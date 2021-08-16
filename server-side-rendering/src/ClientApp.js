import { hydrate } from "react-dom"; //Me dice que estoy esperando el markup completo
import { BrowserRouter } from "react-router-dom";
import App from './App';

//Other stuff tha should happen in the browser link analytics

hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
)