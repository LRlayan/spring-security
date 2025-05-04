import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import SignInAndSignUp from "./view/SignInAndSignUp.tsx";
import RootLayout from "./component/RootLayout.tsx";

function App() {

  const routes = createBrowserRouter([
    {path: "/", element: <SignInAndSignUp/>},
    {path: "/home", element: <RootLayout/>}
  ]);

  return (
    <>
        <RouterProvider router={routes}/>
    </>
  )
}

export default App
