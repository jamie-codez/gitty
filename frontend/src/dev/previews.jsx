import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/RegisterPage">
                <RegisterPage/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews