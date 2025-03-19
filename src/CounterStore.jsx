import {store} from "@davstack/store";

const counterStore = store(0);

export default function Counter() {

    const count = counterStore.use();

    return (
        <div>Count: {count}</div>
    )
}
export function Controls () {
    return(
        <button className="mt-2 p-1 bg-gray-500 text-white"  onClick={() =>
        counterStore.set(counterStore.get() + 1)}>
            Increment
        </button>
    )
}
