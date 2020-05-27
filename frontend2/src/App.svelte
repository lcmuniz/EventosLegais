<script>
  import { Router, Route } from "svelte-routing";
  import Index from "./pages/Index.svelte";
  import Login from "./pages/Login.svelte";
</script>

<Router url="">
  <Route path="/" component={Login} />
  <Route path="/success" component={Index} />
</Router>
