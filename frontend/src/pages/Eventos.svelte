<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import { link, navigate } from "svelte-routing";
  import Evento from "../components/Evento.svelte";
  import Header from "../components/Header.svelte";

  let textoPesquisa = "";

  let eventos = [];

  async function pesquisar() {
    const response = await axios.post("http://localhost:3333/eventos/search", {
      texto: textoPesquisa
    });
    eventos = response.data;
  }

  const { id_pessoa, email, token } = history.state;

  onMount(async () => {
    const response = await axios.get("http://localhost:3333/eventos");
    eventos = response.data;
  });
</script>

<Header {id_pessoa} {email} {token} />

<div class="section">
  <div class="container">

    <div class="field has-addons">
      <div class="control">
        <input
          class="input is-fullwidth"
          type="text"
          bind:value={textoPesquisa} />
      </div>
      <div class="control">
        <a class="button is-info" on:click={pesquisar}>Pesquisar</a>
      </div>
    </div>

    <br />
    <br />

    <div class="columns is-multiline">

      {#each eventos as evento}
        <div class="column is-4">

          <Evento {evento} {id_pessoa} />

        </div>
      {/each}

    </div>
  </div>
</div>
