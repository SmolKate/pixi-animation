import * as PIXI from 'pixi.js'
import { FC, useEffect, useRef } from 'react'
import ballImg from '@/public/Ball2.png'
import fieldImg from '@/public/Field.png'
import { gsap } from 'gsap'
import { useAppDispatch } from '@/shared/hooks/reduxHooks'
import { deleteIsLoading, setIsLoading } from '@/modules/todo/store/todoSlice'

interface IPicture {
  clickHandler: () => void   // обработчик, выполняемый при клике на мяч
}
const Picture: FC<IPicture> = ({ clickHandler } ) => {

  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  // Обработчик для отображения процесса загрузки изображений
  const loadingHandler = (index: number) => {
    if(index == 1) {
      dispatch(deleteIsLoading()) // окончание процесса загрузки
    }
  }

  // Начало процесса загрузки
  useEffect(() => {
    dispatch(setIsLoading())
  }, [])

  // Создание сцены с платформой и прыгающим по клику мячом
  useEffect(() => {
    
    const app = new PIXI.Application<HTMLCanvasElement>({
      width: 500,
      height: 250,
      backgroundAlpha: 0,
    })

    // globalThis.__PIXI_APP__ = app;   // для тестирования в браузере 

    ref.current?.appendChild(app.view)
    app.start()

    // Создание контейнера и добавление на сцену
    const container = new PIXI.Container()
    app.stage.addChild(container as PIXI.DisplayObject)

    // Инициализация загрузки изображений, добавление объектов в контейнер и наложение анимации
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

    // Добавление объектов в контейнер
    async function makeLoadScreen() {
      const loadFieldAssets = await PIXI.Assets.loadBundle('load-screen', loadingHandler)

      // Добавление поля
      const field = new PIXI.Sprite(loadFieldAssets.field)
      field.anchor.set(0.5)
      field.width = 500
      field.height = 80
      container.addChild(field as PIXI.DisplayObject)

      // Добавление тени
      const shadow = new PIXI.Graphics()
      shadow.beginFill('rgba(41, 49, 51, 0.5)')
      shadow.drawEllipse(0, 0, 40, 10)
      shadow.y = -10
      container.addChild(shadow as PIXI.DisplayObject)

      // Добавление мяча
      const ball = new PIXI.Sprite(loadFieldAssets.ball)
      ball.anchor.set(0.5, 1)
      ball.width = 100
      ball.height = 100
      ball.y = -10
      container.addChild(ball as PIXI.DisplayObject)

      ball.eventMode = 'static'
      ball.cursor = 'pointer'
      ball.on('click', gsapFn)

      // Добавление анимации с помощью GSAP
      function gsapFn() {

        ball.eventMode = 'none'      // мяч недоступен для каких-либо событий

        let tlBall = gsap.timeline()
        let tlShadow = gsap.timeline()

        // движение мяча
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
            ball.eventMode = 'static'  // мяч доступен для событий
          })

        // движение тени
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
      // При выгрузке компоненты приложение pixi и все объекты удаляются
      app.destroy(true, true)
    }
  }, [])
  return <div ref={ref} />
}

export default Picture
