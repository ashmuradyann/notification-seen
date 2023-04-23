import { useEffect, useRef, useState } from "react"

import AppContainer from "./components/app-container/AppContainer";
import Form from "./components/form/Form";

const App = () => {

  const [loged, setLoged] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setLoged(true)
    }
  }, [loged])

  return (
    <div className="app flex-center">
      {loged ? <AppContainer setLoged={setLoged} /> : <Form setLoged={setLoged} />}
    </div>
  )
}

export default App
