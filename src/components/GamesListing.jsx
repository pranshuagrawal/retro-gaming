import { useEffect, useState } from 'react';
import InnerHTML from 'dangerously-set-html-content'
import ee from '../events';
import {
    GAME_DETAILS
} from '../games-detail'
import {
    useEventListener
} from '../methods';
const GamesListing = () => {

    const [selected, setSelected] = useState(0);
    const [currentGame, setCurrentGame] = useState(-1);

    const handler = ({key}) => {
        if(key === "ArrowDown") {
            setSelected(d => Math.min(d+1, GAME_DETAILS.length-1))
            return;
        }
        if(key === "ArrowUp") {
            setSelected(d => Math.max(d-1, 0))
            return;
        } 
        if(key === "Enter") {
            setCurrentGame(selected)
            return;
        } 
        if(key === "Escape") {
            window.location.reload();
            setCurrentGame(-1); 
            return;
        }        
        console.log("Key pressed", key)
    }
    useEventListener('keydown', handler);

    // ee.on('gamepadButtonPressed', function (buttonIndex) {
    //     console.log(buttonIndex, "pressed")
    // })
    ee.removeAllListeners("gamepadButtonPressed");
    ee.addListener("gamepadButtonPressed", (buttonIndex) => {
        console.log("buttonIndex:", buttonIndex);

        if(currentGame === -1) {
            if(buttonIndex === "0") {
                setSelected(d => Math.min(d+1, GAME_DETAILS.length-1))
                return;
            }
            if(buttonIndex === "3") {
                setSelected(d => Math.max(d-1, 0))
                return;
            }
            if(buttonIndex === "1") {
                setCurrentGame(selected)
                return;
            } 
            if(buttonIndex === "2") {
                 window.location.reload();
                setCurrentGame(-1); 
                return;
            } 
        }
    })

    useEffect(() => {
        if(currentGame === -1) {
            return;
        }
        window.EJS_player = "#running_game";
        window.EJS_core = "nes";
        window.EJS_color = "#0064ff";
        window.EJS_pathtodata = "https://rawcdn.githack.com/EmulatorJS/EmulatorJS/main/data/";
        window.EJS_gameUrl = GAME_DETAILS[currentGame].rom;
        window.EJS_startOnLoaded = true;
        window.EJS_Buttons = {
            playPause: false,
            restart: false,
            mute: false,
            settings: true,
            fullscreen: true,
            saveState: false,
            loadState: false,
            screenRecord: false,
            gamepad: true,
            cheat: false,
            volume: true,
            quickSave: false,
            quickLoad: false,
            screenshot: false,
            cacheManager: false
        }
    }, [currentGame]);

    // const data = '<script src="https://rawcdn.githack.com/EmulatorJS/EmulatorJS/main/data/loader.js"></script>'
    const html = `
    <script src="https://rawcdn.githack.com/EmulatorJS/EmulatorJS/main/data/loader.js"></script>
    <div style={{width: "90vw", height: "90vh"}}>
        <div id="running_game" dangerouslySetInnerHTML={{__html: data}}></div>
    </div>`
    return (
        <>
        {currentGame === -1 && 
        <div className="game-listing-container">
            <div className="game-heading-container">
                <h1 className="game-heading">400 IN 1</h1>
                <h1 className="game-sub-heading">Real Games</h1>
            </div>

            <div>
                {GAME_DETAILS.map((game, index) => {
                    return (
                        <p onClick={() => {setCurrentGame(index)}} className={`singlegame-title ${selected === index ? "selected" : ""}`}>{index+1}. {game.name}</p>
                    )
                })}
            </div>
        </div>
        }

        {
            currentGame !== -1 && (
                <InnerHTML html={html} />
            )
        }
        </>
        
    )
};

export default GamesListing;