<template>
  <div class="background-media-carousel">

    <div :id="`background-wallpaper-${_uid}`" class="background-wallpaper"/>

    <div class="background-gradient-cover"/>

    <div :id="`game-icon-${_uid}`" class="game-icon" v-if="gameIcon">
      <span>{{ gameIcon.label }}</span>
      <img :src="gameIcon.src">
    </div>

  </div>
</template>

<script>
import YouTubePlayer from 'youtube-player'

export default {
  props: ['backgrounds'],

  data () {
    return {
      gameIcon: {
        src: '',
        label: ''
      }
    }
  },

  mounted () {
    window.addEventListener('resize', this.resizeBackgroundWallpaper)

    this.loadBackgroundMedia(0)
  },

  methods: {
    loadBackgroundMedia (num) {
      this.resizeBackgroundWallpaper()

      const backgroundMedia = this.backgrounds[num]

      if (backgroundMedia.type === 'image') {
        this.gameIcon = backgroundMedia.gameIcon

        document.getElementById(`background-wallpaper-${this._uid}`).style.backgroundImage = `url(${backgroundMedia.src})`

        if (this.backgrounds.length > 1) {
          // If there are multiple backgrounds, load next one after 10s
          setTimeout(() => {
            this.loadNextBackgroundMedia(num)
          }, 10000)
        }
      } else if (backgroundMedia.type === 'youtube') {
        const player = YouTubePlayer(`background-wallpaper-${this._uid}`, {
          videoId: backgroundMedia.videoId,
          playerVars: {
            autoplay: 1,
            cc_load_policy: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            showinfo: 0,
            mute: 1
          }
        })

        // TODO: REMOVE
        if (backgroundMedia.start) {
          player.seekTo(backgroundMedia.start)
        }

        player.addEventListener('onStateChange', (playerState) => {
          // Player stopped
          if (playerState.data === 0) {
            if (this.backgrounds.length > 1) {
              // If there are multiple backgrounds, load next one
              player.destroy()
              this.resetBackgroundDiv()
              this.loadNextBackgroundMedia(num)
            } else {
              // No other backgrounds; loop the video
              player.playVideo()
            }
          }
        })

        player.playVideo()
          .then(() => {
            this.gameIcon = backgroundMedia.gameIcon
          })
      }
    },

    resetBackgroundDiv () {
      // Reset the iframe from the youtube api back to a div
      const div = document.createElement('div')
      document.getElementById(`background-wallpaper-${this._uid}`).replaceWith(div)
      div.id = `background-wallpaper-${this._uid}`
      div.className = 'background-wallpaper'
    },

    loadNextBackgroundMedia (num) {
      // Increment/reset background number
      num + 1 === this.backgrounds.length ? num = 0 : num++

      this.loadBackgroundMedia(num)
    },

    resizeBackgroundWallpaper () {
      const w = window.innerWidth
      const h = window.innerHeight

      if (w / h > 16 / 9) {
        // landscape orientation
        const playerHeight = Math.ceil(w * (9 / 16))
        document.getElementById(`background-wallpaper-${this._uid}`).style.width = `${w}px`
        document.getElementById(`background-wallpaper-${this._uid}`).style.height = `${playerHeight}px`
        document.getElementById(`background-wallpaper-${this._uid}`).style.top = `${0 - Math.ceil((playerHeight - h) / 2)}px`
        document.getElementById(`background-wallpaper-${this._uid}`).style.left = `0px`
      } else {
        // portrait orientation
        const playerWidth = Math.ceil(h * (16 / 9))
        document.getElementById(`background-wallpaper-${this._uid}`).style.width = `${playerWidth}px`
        document.getElementById(`background-wallpaper-${this._uid}`).style.height = `${h}px`
        document.getElementById(`background-wallpaper-${this._uid}`).style.top = `0px`
        document.getElementById(`background-wallpaper-${this._uid}`).style.left = `${0 - Math.ceil((playerWidth - w) / 2)}px`
      }
    }
  }
}
</script>

<style>
  .background-media-carousel {
    background-color: #000;
    z-index: -100;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .background-wallpaper {
    position: absolute;
    z-index: -100;
    background-position: center;
    background-size: cover;
  }

  .background-gradient-cover {
    z-index: -90;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 25%, rgba(0, 0, 0, 0.5) 90%);
  }

  .game-icon {
    position: absolute;
    top: 0;
    right: 0;
    padding: 3rem;
    font-size: 1rem;
    font-weight: 300;
  }
  .game-icon span {
    padding-right: 1rem;
  }

  .game-icon img {
    height: 5rem;
    vertical-align: top;
  }
</style>
