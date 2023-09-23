import { Application, Container, Loader, Sprite, Texture } from "pixi.js"
import * as PIXI from "pixi.js"
import { useEffect, useRef } from "react";
import ballImg from "@/public/Ball.png";
import fieldImg from "@/public/Field.png";
import { gsap } from 'gsap'

interface IPicture {
    clickHandler: () => void
}
const Picture = ({clickHandler}: IPicture) => {
    const ref = useRef<HTMLDivElement>(null)

    const handleLoader = (progress: number) => {
        console.log(progress * 100)
    }

    useEffect(() => {

        // On first render create our application
        const app = new Application<HTMLCanvasElement>({
            width: 800,
            height: 600,
            backgroundColor: 0x5BBA6F,
        });
  
        globalThis.__PIXI_APP__ = app;

        // Add app to DOM
        ref.current?.appendChild(app.view);

        // Start the PixiJS app
        app.start();

        // create a container
        const container = new Container()
        // container.width = app.screen.width;
        // container.height = app.screen.height;
        app.stage.addChild(container)

        async function init () {
            const pictureLoader = {
                bundles: [{
                    name: 'load-screen',
                    assets: [
                        {
                            name: 'field',
                            srcs: fieldImg
                        },
                        {
                            name: 'ball',
                            srcs: ballImg
                        },
                    ],
                }]
            }

            await PIXI.Assets.init({manifest: pictureLoader})
            PIXI.Assets.backgroundLoadBundle(['load-screen'])

            makeLoadScreen()
        }
     
        async function makeLoadScreen () {
            const loadFieldAssets = await PIXI.Assets.loadBundle('load-screen', handleLoader )

            const field = new PIXI.Sprite(loadFieldAssets.field)
            const ball = new PIXI.Sprite(loadFieldAssets.ball)

            field.anchor.set(0.5)
            field.width = 500;
            field.height = 80;
            container.addChild(field)

            field.eventMode = 'static'
            field.cursor = 'pointer'

            let shadow = new PIXI.Graphics();
            shadow.beginFill('rgba(41, 49, 51, 0.5)');
            shadow.drawEllipse(0, 0, 40, 10);
            shadow.y = -10
            container.addChild(shadow)


            ball.anchor.set(0.5, 1)
            ball.width = 100;
            ball.height = 100;
            ball.y = -10
            container.addChild(ball)

            ball.eventMode = 'static'
            ball.cursor = 'pointer'
            ball.on('click', gsapFn)

            // Animating using GSAP

            function gsapFn () {
       
              gsap.timeline().to(ball, {duration: 0.3, height: 70, width:120})
                .to(ball, {duration: 0.1, height: 100, width: 100})
                .to(ball, {duration: 0.5, ease: 'power2.out', y: -150})
                .to(shadow, {duration: 0.5, height: 5, width: 20}, '<')
                .to(ball, {duration: 0.5, ease: 'power2.in', y: -10})
                .to(shadow, {duration: 0.5, height: 20, width: 80}, '<')
                .to(ball, {duration: 0.1, height: 90, width: 105})
                .to(ball, {duration: 0.1, height: 100, width: 100})
                .play()
                .then(() => {
                    clickHandler()
                })

            }
            // gsap.fromTo(ball, {duration: 1, y: -50}, {duration: 1, y: -150})
            // gsap.fromTo(ball, {duration: 1, y: -150}, {duration: 1, y: -50})
            // gsap.to(ball, 1, {x: 100
                // pixi: {
                // x: 200,
                // scaleX: 15
                // },
                // yoyo: true,
                // repeat: -1
            // });

            // let elapsed = 0.0
            // app.ticker?.add((delta) => {
            //     // Add the time to our total elapsed time
            //     elapsed += delta;
            //     // Update the sprite's X position based on the cosine of our elapsed time.  We divide
            //     // by 50 to slow the animation down a bit...
            //     ball.x = Math.cos(elapsed/50.0) * 100.0;
            //   });

            // app.ticker.add((delta) => {
            //     ball.rotation -= 0.01 * delta
            // })
        }

        init()

        container.x = app.screen.width / 2
        container.y = app.screen.height / 2
        
       
    
        return () => {
          // On unload completely destroy the application and all of it's children
          app.destroy(true, true);
        };
      }, []);
    return (
        <div ref={ref} />
    )
}

export default Picture