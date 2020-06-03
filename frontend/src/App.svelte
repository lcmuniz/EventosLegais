<script>
  import { Router, Route } from "svelte-routing";

  import Login from "./pages/Login.svelte";
  import Eventos from "./pages/Eventos.svelte";
  import NovoEvento from "./pages/NovoEvento.svelte";
</script>

<Router>
  <Route path="/" component={Login} />
  <Route path="/eventos" component={Eventos} />
  <Route path="/novo-evento" component={NovoEvento} />
</Router>
