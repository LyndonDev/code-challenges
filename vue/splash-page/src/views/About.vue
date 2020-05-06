<template>
  <div>
    <AboutSection v-for="(section, i) in sections" :key="i" :section="section"/>
  </div>
</template>

<script>
import AboutSection from '@/components/AboutSection'

export default {
  data () {
    return {
      sections: [
        {
          backgrounds: [
            {
              type: 'youtube',
              videoId: '5GBVMGXXFMw'
            }
          ],
          aboutText: {
            h1: 'Play great PC games and connect with your friends, all in one place'
          }
        },
        {
          anchor: {
            title: 'Great PC games',
            id: 'greatpcgames'
          },
          backgrounds: [
            {
              type: 'youtube',
              videoId: 'yYjD78X1d9Q',
              gameIcon: {
                src: 'https://Eaassets-a.akamaihd.net/origin-com-store-final-assets-prod/182633/231.0x326.0/1038862_LB_231x326_en_US_^_2016-07-21-10-11-54_1b27093a8723b707c8433a4aafc9203fd660d669.jpg',
                label: 'FIFA 17'
              }
            },
            {
              type: 'youtube',
              videoId: 'QpnY1G3vt_0',
              gameIcon: {
                src: 'https://eaassets-a.akamaihd.net/origin-com-store-final-assets-prod/194331/231.0x326.0/1031469_LB_231x326_en_US_%5E_2015-06-08-12-38-28_34137b019ffbf482edfea4910a792707153fea75.jpg',
                label: 'Unravel'
              }
            },
            {
              type: 'image',
              src: 'https://data1.origin.com/content/dam/originx/web/app/programs/About/aboutorigin_3840x2160_SWB.jpg',
              gameIcon: {
                src: 'https://eaassets-a.akamaihd.net/origin-com-store-final-assets-prod/192140/231.0x326.0/1030897_LB_231x326_en_US_%5E_2015-04-28-11-47-22_d5e1ae356894059158059186d1a1aa842cae8563.jpg',
                label: 'Star Wars Battlefront'
              }
            }
          ],
          aboutText: {
            h2: 'Great PC games',
            h3: "Epic RPGs, action-packed shooters, simulation hits - no matter your tastes, Origin's got you covered."
          }
        },
        {
          anchor: {
            title: 'Download now',
            id: 'downloadnow'
          },
          backgrounds: [
            {
              type: 'image',
              src: 'https://data1.origin.com/content/dam/originx/web/app/games/titanfall/titanfall/titanfall-deluxe-edition_pdp_3840x2160_en_WW.jpg',
              gameIcon: {
                src: 'https://eaassets-a.akamaihd.net/origin-com-store-final-assets-prod/192492/231.0x326.0/1039096_LB_231x326_en_US_%5E_2016-05-06-05-17-52_63c62ad76b294c6dc44ea97fc0561b22fdc7c1c1.jpg',
                label: 'Titanfall 2'
              }
            }
          ],
          aboutText: {
            h2: 'What are you waiting for?',
            h3: "Download the Origin client, grab a soda (or tea, if that's your thing), and dig into that game you've been obsessing over. Sounds like a perfect day to us."
          }
        }
      ]
    }
  },

  components: {
    AboutSection
  }
}
</script>
