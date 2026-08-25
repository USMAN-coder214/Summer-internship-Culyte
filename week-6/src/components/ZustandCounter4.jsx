import { useCounter } from "../store/useCounter";

function Counter4() {
  const count = useCounter((state) => state.count);

  return <h1>{count}</h1>;
}
export default Counter4
