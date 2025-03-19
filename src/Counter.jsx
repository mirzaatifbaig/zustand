import useCounterStore from "@/CounterStore.jsx";

const Counter = () => {
  const { decrement, increment, reset } = useCounterStore()
  const count = useCounterStore((state) => state.count)
  const history = useCounterStore((state) => state.history)
  return (
    <div className="p-4 text-center ">
      <h1 className="text-3xl text-black font-bold">{count}</h1>
      <div className="mt-4 space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={increment}>
          ➕ Increment
        </button>

        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={decrement}>
          ➖ Decrement
        </button>

        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={reset}>
          🔄 Reset
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">History:</h2>
        <ul className="list-disc">
          {history.map((value, index) => (
            <li key={index} className="text-gray-700">
              Previous Count: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Counter;
