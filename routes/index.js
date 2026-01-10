const router = require("express").Router();

router.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to the API</h1>
    <p>Use the endpoints provided in the documentation to interact with the API.</p>
    <ul>
      <li><a href="/api-docs">API Documentation</a></li>
      <li><a href="/professional">Professionals</a></li>
      <li><a href="/contacts">Contacts</a></li>
    </ul>
  `);
});
router.use("/professional", require("./professionalsRouter"));
router.use("/contacts", require("./contactsRouter"));

module.exports = router;
