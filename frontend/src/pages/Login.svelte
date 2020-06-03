<script>
  import axios from "axios";
  import md5 from "md5";

  import { fade } from "svelte/transition";
  import { navigate } from "svelte-routing";

  const logo = "/assets/celebracao.svg";

  let email = "";
  let senha = "";
  let erro = "";

  async function logar() {
    const senha_criptografada = md5(senha);

    const dados = {
      email,
      senha: senha_criptografada
    };

    try {
      const { data } = await axios.post("http://localhost:3333/login", dados);
      const { id_pessoa, token } = data;

      navigate("/eventos", { state: { id_pessoa, email, token } });
    } catch (error) {
      erro = "Usuário ou senha inválidos";
    }
  }

  function hide() {
    erro = "";
  }
</script>

<style>
  .logo {
    margin-top: 30px;
    margin-bottom: 10px;
  }
</style>

<div class="section">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4 has-text-centered">
        <div>
          <img class="logo" src={logo} alt="Logo" width="100" />
        </div>
        <div class="is-size-3 has-text-weight-bold">Eventos Legais</div>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-4 has-text-centered">
        <div class="field">
          <input
            bind:value={email}
            type="email"
            class="input"
            placeholder="Email" />
        </div>
        <div class="field">
          <input
            bind:value={senha}
            type="password"
            class="input"
            placeholder="Senha" />
        </div>
        <button on:click={logar} class="button is-primary is-fullwidth">
          Entrar
        </button>
      </div>
    </div>

    <div class="container">
      <div class="columns is-centered">
        <div class="column is-4 has-text-centered">
          {#if erro}
            <div
              class="notification is-warning"
              transition:fade={{ duration: 300 }}>
              <button on:click={hide} class="delete" />
              {erro}
            </div>
          {/if}
        </div>
      </div>
    </div>

  </div>
</div>
