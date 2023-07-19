use yew::prelude::*;
use wasm_bindgen::prelude::*;

#[function_component(App)]
fn app() -> Html {
    #[wasm_bindgen]
    extern "C" {
    
        // Use `js_namespace` here to bind `console.log(..)` instead of just
        // `log(..)`
        #[wasm_bindgen(js_namespace = console)]
        fn log(s: &str);
    }
    #[wasm_bindgen(module = "/src/spectrum.js")]
    extern "C" {
        fn chart();
    }
    chart();
    html! {
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}