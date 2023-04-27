import React, { useState, useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { createBrowserHistory } from "history";


import "../css/root.css"
import 'material-icons/iconfont/material-icons.css';
import { useMatch } from "react-router-dom";
import Stream from "./Stream";







function LoadComponent ()
{
  return (
    <div className="load">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
  )
}






function H () {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);



    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/photos?_limit=10")
      .then(res => res.json())
      .then(
        (result) => {
          window.setTimeout(() => {
            setIsLoaded(true)
            setItems(result)
          }, 1000)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
    }, []);




    const history = createBrowserHistory()
    const location = useLocation()
    const navigate = useNavigate()
    console.log(navigate)



    const match = useMatch("/stream/:id")


    const disHandleclick = function (e) {
      history.back()
    }



    return (
      <>


        <div className="home">

          <header>
            <div>
              <nav>
                <h1>Teddy Trailer</h1>
              </nav>

              <p>
                Latest Movie Trailer is here !
              </p>
            </div>
          </header>
          {
            isLoaded ?
                
              (error  ? "Une erreur a eu lieu" : 
                items.map(item => (
                  <div className="container">
                    <div>
                      <div className="bg-movie-home">

                        <img src={"https://picsum.photos/" + (Math.floor(Math.random() * (700 - 500 + 1)) + 500).toString()} className="img-bg-movie-home" alt="background" />

                        <div className="blck-bg-movie-home">
                          <div>

                            <div className="title-blck-bg-movie-home">
                              <p>Action - Drama - Emotional</p>
                              <h2>
                                <span>{item.title}</span>
                              </h2>
                            </div>

                            <div className="btn-blck-bg-movie-home">
                              <Link  className="link-stream" to={'/stream/' + item.id + '_' + item.title} ><span>TRAILER</span></Link>
                              <Link  className="link-stream" to={'/stream/:id'} >JUST WATCH</Link>
                            </div>

                            <div id="o-border-effect"></div>

                          </div>
                        </div>


                      </div>

                    </div>
                  </div>
                ))
              )
              
              : <LoadComponent />
          }


          { match ?
            <div className="stream">
              <Stream context={disHandleclick} />
            </div> : null
          }





        </div>


      </>
    );

}



export default function Root () {
 
    return (
        <H />
    )

}