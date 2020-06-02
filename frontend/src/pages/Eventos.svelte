<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { link, navigate } from "svelte-routing";

  import Evento from "../components/Evento.svelte";

  const { email, token } = history.state;

  let eventos = [];

  onMount(async () => {
    const response = await axios.get("http://localhost:3333/eventos");
    eventos = response.data;
  });
</script>

<section class="hero is-primary">
  <div class="hero-body">
    <h1 class="title">Eventos Legais</h1>
  </div>
  <div class="hero-foot" />

</section>
<div id="navbarMenuHeroC" class="navbar-menu has-background-light">
  <div class="navbar-start">
    <a href="/eventos" use:link class="navbar-item is-active">Início</a>
    <a class="navbar-item">Novo Evento</a>
    <a class="navbar-item">Logout</a>
  </div>
  <div class="navbar-end is-vcentered">
    <span class="navbar-item">{email}</span>
  </div>
</div>

<div class="section">
  <div class="container">

    <div class="columns is-multiline">

      {#each eventos as evento}
        <div class="column is-4">

          <Evento {evento} />

        </div>
      {/each}

    </div>
  </div>
</div>
