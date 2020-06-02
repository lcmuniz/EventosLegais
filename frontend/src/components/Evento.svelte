<script>
  export let evento;
</script>

<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src={evento.imagem} alt="Imagem do Evento" />
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{evento.nome}</p>
        <p class="subtitle is-6">{evento.cidade} / {evento.estado}</p>
      </div>
    </div>

    <div class="content">
      {evento.descricao}
      <br />
      <br />
      <div>{evento.dataHora}</div>
    </div>
  </div>
  <div class="card-footer">

    <button class="button is-danger is-fullwidth">
      <span class="icon">
        <i class="far fa-heart" />
      </span>
      <span>Eu Vou!</span>
    </button>

    <button class="button is-primary is-fullwidth">
      <span class="icon">
        <i class="fas fa-user-friends" />
      </span>
      <span>Quem Vai?</span>
    </button>
  </div>
</div>
