<template>
  <section>

    <a v-if="section.anchor" :id="section.anchor.id" :title="section.anchor.title" class="section-anchor"/>

    <BackgroundMediaCarousel :backgrounds="section.backgrounds"/>

    <div class="about-content">
      <h1 v-if="section.aboutText.h1">{{ section.aboutText.h1 }}</h1>
      <h2 v-if="section.aboutText.h2">{{ section.aboutText.h2 }}</h2>
      <h3 v-if="section.aboutText.h3">{{ section.aboutText.h3 }}</h3>

      <!-- Only display the nav in the first section, list subsequent sections via anchors -->
      <nav v-if="!section.anchor">
        <ul>
          <li v-for="(section, i) in navItems" :key="i">
            <a :href="`#${section.anchor.id}`" v-scroll-to="`#${section.anchor.id}`">{{ section.anchor.title }}</a>
          </li>
        </ul>
      </nav>
    </div>

  </section>
</template>

<script>
import BackgroundMediaCarousel from '@/components/BackgroundMediaCarousel'

export default {
  props: ['section'],

  components: {
    BackgroundMediaCarousel
  },

  computed: {
    navItems () {
      return this.$parent.sections.filter(section => section.anchor)
    }
  }
}
</script>

<style scoped>
  section {
    color: #fff;
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  h1, h2, h3 {
    font-weight: 300;
  }
  h1 {
    font-size: 3rem;
    margin: 0 1rem 1.5rem;
  }
  h2 {
    font-size: 2.25rem;
  }
  h3 {
    font-size: 1.125rem;
  }

  .section-anchor {
    position: absolute;
    top: 0;
    left: 0;
  }

  .about-content {
    z-index: 100;
    max-width: 60vw;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
  }

  nav {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 14px;
    font-weight: 400;
  }
  nav ul {
    margin-top: 1.5rem;
  }
  nav li {
    list-style: none;
    display: inline;
  }
  nav li a {
    padding: 1.5rem 3rem;
  }
</style>
