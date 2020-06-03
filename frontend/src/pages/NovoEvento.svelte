<script>
  import axios from "axios";
  import { navigate } from "svelte-routing";
  import Header from "../components/Header.svelte";

  let nome;
  let descricao;

  const { id_pessoa, email, token } = history.state;

  async function adicionar() {
    const evento = {
      nome,
      descricao,
      dataHora: new Date(),
      endereco: "Arrail da Cidade, 123",
      cidade: "São Luís",
      estado: "MA",
      imagem:
        "https://images.freeimages.com/images/large-previews/617/festa-junina-1422789.jpg",
      id_pessoa
    };

    const response = await axios.post("http://localhost:3333/eventos", evento, {
      headers: {
        "X-Token": token
      }
    });

    navigate("/eventos", { state: { id_pessoa, email, token } });
  }
</script>

<Header {email} {token} />

<div class="sectio">
  <div class="container">
    <br />
    <br />

    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input bind:value={nome} class="input" type="text" />
      </div>
    </div>
    <div class="field">
      <label class="label">Descrição</label>
      <div class="control">
        <input bind:value={descricao} class="input" type="text" />
      </div>
    </div>
    <button class="button is-primary" on:click={adicionar}>Adicionar</button>

  </div>

</div>
