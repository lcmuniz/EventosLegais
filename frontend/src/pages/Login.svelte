<script>
  import axios from "axios";
  import sha256 from "js-sha256";
  import { navigate } from "svelte-routing";

  let email = "";
  let senha = "";
  let erro = "";

  async function logar() {
    const senha_criptografada = sha256(senha);

    const dados = {
      email,
      senha: senha_criptografada
    };

    console.log(dados);

    try {
      const { data } = await axios.post("http://localhost:3333/login", dados);
      const { token } = data;

      navigate("/eventos");
    } catch (error) {
      erro = "Usuário ou senha inválidos";
    }
  }
</script>

<style>
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .card {
    width: 320px;
  }
  .erro {
    margin-top: 20px;
  }
</style>

<div class="container main">

  <h1>Eventos Legais</h1>

  <div class="card">
    <div class="card-body">
      <form>
        <div class="form-group">
          <input
            bind:value={email}
            type="email"
            placeholder="Email"
            class="form-control" />
        </div>
        <div class="form-group">
          <input
            bind:value={senha}
            type="password"
            placeholder="Senha"
            class="form-control" />
        </div>
        <input
          on:click={logar}
          type="button"
          value="Entrar"
          class="btn btn-primary" />
      </form>
    </div>
  </div>

  {#if erro}
    <div class="alert alert-danger erro">{erro}</div>
  {/if}
</div>
