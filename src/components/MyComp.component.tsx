import { useEffect, useState } from "react"

export const MyComponent = () => {
  const [data, setData] = useState<any>(null)
  
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("game-storage") as any) );
  }, [data])
  return <div className="text-red-500">{JSON.stringify(data.state.answer)}</div>
}