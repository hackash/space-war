export const config = {
    app: {
        antialias: true,
        transparent: false,
        resolution: 1
    },
    window: {
        height: `${window.innerHeight}px`,
        width: `${window.innerWidth}px`,
        position: 'absolute',
        display: 'block'
    },
    resources: {
        rocket: {
            path: '/src/assets/images/rocket.png',
            style: {
                width: 50,
                height: 100,
                x: 0,
                y: 10
            },
            actions: {
                moveLeft: 'moveLeft',
                moveRight: 'moveRight',
                shot: 'shot'
            }
        },
        asteroid: {
            path: '/src/assets/images/asteroid.png',
            style: {
                width: 50,
                height: 50,
                x: 100,
                y: 10
            }
        },
        bullet: {
            path: '/src/assets/images/bullet.png',
            style: {
                width: 20,
                height: 30,
                x: 100,
                y: 10
            }
        }
    },
    loading: {
        width: 200,
        height: 15,
        border: {
            color: 0xffffff,
            width: 1,
            alpha: 1

        },
        color: 0X000000
    },
    container: '#main-container'
};
