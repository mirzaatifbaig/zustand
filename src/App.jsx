import Counter from "./Counter.jsx"
import {Controls} from "@/CounterStore.jsx";

export default function App(){
    return (
        <div>
            <Counter/>
            <Controls />
        </div>
    )
}