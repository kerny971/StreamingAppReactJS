import React from "react"
import "../css/root.css"
import ReactHlsPlayer from "react-hls-player"
import { Link } from "react-router-dom"

export default class Stream extends React.Component {


    constructor (props) 
    {
        super (props)
        console.log(this.props)
        this.ShowFullScreen = this.ShowFullScreen.bind(this)
        //this.exitFullscreen = this.exitFullscreen.bind(this)
        this.launchIntoFullscreen = this.launchIntoFullscreen.bind(this)
        this.LoadComponent = this.LoadComponent.bind(this)
        this.myRef = React.createRef()
        this.datasRef = React.createRef()
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }



    
    launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
        element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        } else {
        element.classList.toggle('fullscreen');
        }
    }



    
    // exitFullscreen() {
    //     if (document.exitFullscreen) {
    //       document.exitFullscreen();
    //     } else if (document.mozCancelFullScreen) {
    //       document.mozCancelFullScreen();
    //     } else if (document.webkitExitFullscreen) {
    //       document.webkitExitFullscreen();
    //     }
    // }



    ShowFullScreen ()
    {


        const video = this.myRef.current.children[0]
        const datas = this.datasRef.current



        const fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
        
        if (!fullscreenElement) {
            this.launchIntoFullscreen(video);
            video.muted = false
            video.setAttribute('controls', 'controls')
            video.style.zIndex = 0
            video.style.objectFit = "contain"
            video.style.minHeight = "auto"
            video.style.height = "auto"
            datas.style.transform = "translateY(0%)"

            
        }
    }



    LoadComponent ()
    {
        return (
            <div className="load">
                <div class="lds-ripple"><div></div><div></div></div>
            </div>
        )
    }




    componentDidUpdate ()
    {

    }


    componentDidMount ()
    {
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then(res => res.json())
      .then(
        (result) => {
          window.setTimeout(() => {
            this.setState({
                isLoaded: true,
                items: result
            });
          }, 1000)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }




    render ()

    {

        const { error, isLoaded, items } = this.state
        console.log(items)


        return (

            <>

                { isLoaded ? 
                 ( 
                    error ? 
                        "Une erreur est survenue..." 
                    :
                        <div className="container-stream">

                            <button class="btn-close-player-stream" onClick={this.props.context}>
                                <span class="material-icons-outlined">
                                    close
                                </span>
                            </button>

                            
                            <div className="player-stream" onClick={this.ShowFullScreen} ref={this.myRef}>
                                <ReactHlsPlayer
                                    src="https://cdn.jwplayer.com/manifests/KomRcrTK.m3u8"
                                    autoPlay={true}
                                    controls={false}
                                    muted={true}
                                    data-fs={false}
                                    className="video-bg-stream"
                                />
                                {/* <video className="video-bg-stream" autoPlay muted>
                                    <source src='http://media.test:8080/jw4_trailer/jw4.mp4' />
                                </video> */}
                            </div>


                    

                            <div className="datas-stream" ref={this.datasRef}>
                                <h3 className="title-datas-stream"><span>John Wick : Chapter 4 the Dies</span></h3>
                                <div className="stats-2-action-datas-stream">
                                        Produced: &nbsp; 2021 / 18+ / 3 saison &nbsp; &nbsp;  
                                        <span className="o-no-break">
                                            <span className="material-icons">4k</span><span className="material-icons">explicit</span> <span className="material-icons">hdr_on</span>
                                        </span>
                                    </div>
                                <div className="action-datas-stream">
                                    <div className="stats-action-datas-stream">
                                    </div>
                                    <div className="desc-datas-stream">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed error doloremque sit odio aliquam perferendis sapiente saepe quis minus, facilis obcaecati itaque quidem dolorem voluptatibus illo, ratione iusto incidunt adipisci.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet atque voluptates fugiat asperiores deserunt nostrum ducimus omnis, iure placeat repellat velit, earum quasi hic dolorem assumenda ullam quisquam neque magnam!
                                    </p>

                                </div>
                                    <div className="btn-action-datas-stream">
                                        <Link  className="link-stream-2" to={'/stream/:id'} ><span>SHARE</span></Link>
                                        <Link  className="link-stream-2" to={'/stream/:id'} >JUST WATCH</Link>
                                    </div>
                
                                </div>
                            </div>
                        </div>
                 )
                : 
                    <div className="load">
                        <div class="lds-ripple"><div></div><div></div></div>
                    </div>
                }

            </>
        )
    }


}