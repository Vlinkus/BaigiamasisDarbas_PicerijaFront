import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import "./Home.css";

export default function Home() {
  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth)
  },[])

  return (<>
    <h1>
      Authentic Italian cuisine. Creative dishes to choose from. All from our
      stone oven, all organic, all delicious.
    </h1>
    {/* <p>{auth?.user}</p> */}
    </>
  );
}
