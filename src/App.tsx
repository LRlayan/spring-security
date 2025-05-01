import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import SignInAndSignUp from "./view/SignInAndSignUp.tsx";

function App() {

  const routes = createBrowserRouter([
    {path: "/", element: <SignInAndSignUp/>}
  ]);

  return (
    <>
        <RouterProvider router={routes}/>
    </>
  )
}

export default App
