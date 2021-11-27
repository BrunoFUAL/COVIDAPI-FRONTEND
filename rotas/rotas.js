module.exports = app => {
    const controlador = require("../controladores/controller.js");
  
    var router = require("express").Router();

    // Cria um novo utilizador
    router.post("/registar", controlador.registar);
  
    // Rota para login - tem de ser POST para não vir user e pass na URL


    router.post("/registar", controlador.registar);
  
    router.post("/login", controlador.login);

    router.get("/en", controlador.getEn);

    router.get("/pt", controlador.getPt);

    router.get("/es", controlador.getEs);

    router.get("/it", controlador.getIt);

    app.use('/news', router);
   
  };