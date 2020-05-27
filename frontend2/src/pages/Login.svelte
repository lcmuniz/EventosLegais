<script>
  import { navigate } from "svelte-routing";
  import Index from "./Index.svelte";

  function submit() {
    navigate("/success");
    console.log("ola");
  }
</script>

<style>
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1em;
  }
  .form {
    width: 300px;
  }
</style>

<div class="main">
  <h1>Eventos Legais</h1>

  <div class="card">
    <div class="card-body">
      <form class="form">
        <div class="form-group">
          <input
            type="email"
            placeholder="Email"
            id="email"
            class="form-control" />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Senha"
            id="password"
            class="form-control" />
        </div>
        <input
          type="button"
          class="btn btn-primary"
          on:click={submit}
          value="Entrar" />
      </form>
    </div>
  </div>
</div>
