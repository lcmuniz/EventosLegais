<script>
  import { Router, Route } from "svelte-routing";

  import Login from "./pages/Login.svelte";
  import Eventos from "./pages/Eventos.svelte";
</script>

<Router>
  <Route path="/" component={Login} />
  <Route path="/eventos" component={Eventos} />
</Router>
