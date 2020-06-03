<script>
  import { navigate } from "svelte-routing";

  export let email;
  export let token;
  export let id_pessoa;

  function irParaEventos() {
    navigate("/eventos", { state: { id_pessoa, email, token } });
  }

  function irParaNovoEvento() {
    navigate("/novo-evento", { state: { id_pessoa, email, token } });
  }

  function logout() {
    navigate("/");
  }
</script>

<section class="hero is-primary">
  <div class="hero-body">
    <h1 class="title">Eventos Legais</h1>
  </div>
  <div class="hero-foot" />

</section>

<div id="navbarMenuHeroC" class="navbar-menu has-background-light">
  <div class="navbar-start">
    <a on:click={irParaEventos} class="navbar-item is-active">Início</a>
    <a on:click={irParaNovoEvento} class="navbar-item">Novo Evento</a>
    <a on:click={logout} class="navbar-item">Logout</a>
  </div>
  <div class="navbar-end is-vcentered">
    <span class="navbar-item">{email}</span>
  </div>
</div>
