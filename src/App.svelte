<script lang="ts">
  const COLORS = {
    light: {
      bg: '#d3d4d6',
      text: '#808080',
      btn: '#aaaaaa',
    },
    dark: {
      bg: '#485461',
      text: '#bfc2c7',
      btn: '#4d88bb',
    },
  }

  let styles = {
    'text-color': COLORS.light.text,
    'btn-color': COLORS.light.btn,
  }

  const setColors = (c) => {
    document.body.style.backgroundColor = c.bg // eslint-disable-line
    styles['text-color'] = c.text // eslint-disable-line
    styles['btn-color'] = c.btn // eslint-disable-line
  }

  $: cssVarStyles = Object.entries(styles)
    .map(([key, value]) => `--${key}:${value}`)
    .join(';')

  enum Mode {
    Light,
    Dark,
    Rand,
  }

  let mode = Mode.Light

  const setLight = () => {
    mode = Mode.Light
    setColors(COLORS.light)
  }

  const setDark = () => {
    mode = Mode.Dark
    setColors(COLORS.dark)
  }

  const setRand = () => {
    mode = Mode.Rand
    const rand = () => '#' + Math.floor(Math.random() * 16777215).toString(16)
    setColors({
      bg: rand(),
      text: rand(),
      btn: rand(),
    })
  }

  const services = [
    'Product/Architecture/DevOps Consulation',
    'Rapid Software Prototyping',
    'Custom Software Development',
  ]

  const tech: { [s: string]: string[] } = {
    'Desktop Software': ['Rust', 'Go', 'C#'],
    'Embedded Firmware': ['Rust', 'C/C++'],
    'Web Backend': ['Rust', 'Go', 'C#', 'Node.js'],
    'Web Frontend': ['Svelte', 'React'],
  }
</script>

<div id="main" style={cssVarStyles}>
  <div class="header">
    <button on:click={setLight}>
      {mode === Mode.Light ? '*' : ''} LIGHT
    </button>

    <button on:click={setDark}> {mode === Mode.Dark ? '*' : ''} DARK </button>

    <button on:click={setRand}> {mode === Mode.Rand ? '*' : ''} rand() </button>
  </div>

  <h1>11 Bit Software</h1>

  <h2>Services</h2>

  <div class="list services">
    <ul>
      {#each services as item}
        <li>{item}</li>
      {/each}
    </ul>
  </div>

  <h2>Technologies</h2>

  <div class="list">
    <ul>
      {#each Object.entries(tech) as [category, list]}
        <li>{category}</li>
        <ul class="circle">
          {#each list as item}
            <li>{item}</li>
          {/each}
        </ul>
      {/each}
    </ul>
  </div>

  <h2>Contact</h2>
  <p class="email">cameron@11bitsoftware.com</p>

  <div class="footer" />
</div>

<style>
  :global(body) {
    background-color: #d3d4d6;
    transition: background-color 1.5s;
  }

  #main {
    color: var(--text-color);
    transition: color 1.5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .list {
    display: inline-block;
    margin: 0 auto;
  }

  .header {
    position: fixed;
    width: 100%;
    top: 0.5rem;
    right: 0.5rem;
    text-align: right;
  }

  .footer {
    height: 50px;
  }

  button {
    background-color: var(--btn-color);
    transition: background-color 1.5s;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem;
  }

  h1 {
    text-align: center;
    font-family: monospace;
    font-size: 5em;
    font-weight: 100;
  }

  h2 {
    text-align: center;
    font-family: monospace;
    font-size: 3em;
    font-weight: 100;
  }

  p {
    text-align: center;
    font-family: monospace;
    font-size: 1em;
    font-weight: 100;
  }

  p.email {
    font-size: 1.5em;
  }

  ul {
    display: table;
    text-align: left;
    list-style-type: disc;
  }

  li {
    font-family: monospace;
    font-size: 1em;
    font-weight: 100;
    padding: 0.25em;
  }

  .services > ul > li {
    font-size: 1.25em;
    padding: 0.5em;
  }
</style>
