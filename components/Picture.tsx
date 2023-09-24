import { Application, Container, Loader, Sprite, Texture } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { useEffect, useRef } from 'react'
import ballImg from '@/public/Ball2.png'
import fieldImg from '@/public/Field.png'
import { gsap } from 'gsap'

interface IPicture {
  clickHandler: () => void
}
const Picture = ({ clickHandler }: IPicture) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // On first render create our application
    const app = new Application<HTMLCanvasElement>({
      width: 500,
      height: 250,
      backgroundAlpha: 0,
    })

    // globalThis.__PIXI_APP__ = app;

    // Add app to DOM
    ref.current?.appendChild(app.view)

    // Start the PixiJS app
    app.start()

    // create a container
    const container = new Container()
    app.stage.addChild(container)

    async function init() {
      const pictureLoader = {
        bundles: [
          {
            name: 'load-screen',
            assets: [
              {
                name: 'field',
                srcs: fieldImg,
              },
              {
                name: 'ball',
                srcs: ballImg,
              },
            ],
          },
        ],
      }

      await PIXI.Assets.init({ manifest: pictureLoader })
      PIXI.Assets.backgroundLoadBundle(['load-screen'])

      makeLoadScreen()
    }

    async function makeLoadScreen() {
      const loadFieldAssets = await PIXI.Assets.loadBundle('load-screen')

      const field = new PIXI.Sprite(loadFieldAssets.field)
      field.anchor.set(0.5)
      field.width = 500
      field.height = 80
      container.addChild(field)

      const shadow = new PIXI.Graphics()
      shadow.beginFill('rgba(41, 49, 51, 0.5)')
      shadow.drawEllipse(0, 0, 40, 10)
      shadow.y = -10
      container.addChild(shadow)

      const ball = new PIXI.Sprite(loadFieldAssets.ball)
      ball.anchor.set(0.5, 1)
      ball.width = 100
      ball.height = 100
      ball.y = -10
      container.addChild(ball)

      ball.eventMode = 'static'
      ball.cursor = 'pointer'
      ball.on('click', gsapFn)

      // Animating using GSAP

      function gsapFn() {
        ball.eventMode = 'none'

        let tlBall = gsap.timeline()
        let tlShadow = gsap.timeline()

        tlBall
          .to(ball, {
            keyframes: {
              '10%': { height: '-=30', width: '+=20', ease: 'power0.easeNone', y: '-=0' },
              '15%': { height: '+=30', width: '-=20', ease: 'power0.easeNone', y: '-=0' },
              '55%': { ease: 'power2.out', y: '-=100' },
              '90%': { ease: 'power2.in', y: '+=100' },
              '95%': { height: '-=10', width: '+=5' },
              '100%': { height: '+=10', width: '-=5' },
            },
            duration: 1.5,
          })
          .play()
          .then(() => {
            clickHandler()
            ball.eventMode = 'static'
          })

        tlShadow
          .to(shadow, {
            keyframes: {
              '10%': {},
              '15%': {},
              '55%': { height: '-=15', width: '-=60' },
              '90%': { height: '+=15', width: '+=60' },
              '95%': {},
              '100%': {},
            },
            duration: 1.5,
          })
          .play()
      }
    }

    init()

    container.x = app.screen.width / 2
    container.y = app.screen.height - 40

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true)
    }
  }, [])
  return <div ref={ref} />
}

export default Picture
