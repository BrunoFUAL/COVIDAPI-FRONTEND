const Datastore = require("nedb");
let db = {}
db.users = new Datastore("users.db");
db.disciplinas = new Datastore("disciplinas.db");
db.users.loadDatabase();
db.disciplinas.loadDatabase();

exports.Crud = (data) => {
  // insere um registo
  db.disciplinas.insert(data);
  console.log(JSON.stringify(data));
};

exports.cRud_all = () => {
  return new Promise((resolve, reject) => {
    // lê todos os registos
    db.disciplinas.find({}, (err, dados) => {
      if (err) {
        reject("Não há disciplinas para mostrar!");
      } else {
        resolve(dados);
      }
    });
  });
};

exports.cRud_id = (id) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    db.disciplinas.find(
      {
        _id: id,
      },
      (err, dados) => {
        if (err) {
          reject("Disciplina com o id " + id + " não encontrada!");
        } else {
          resolve(dados);
        }
      }
    );
  });
};

exports.cRud_key = (criteria) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    db.disciplinas.find(
      {
        $or: [
          {
            disciplina: new RegExp(criteria), // RegExp é para usar como expressão regular /criterio/
          },
          {
            docente: new RegExp(criteria),
          },
          {
            curso: new RegExp(criteria),
          },
          {
            ano: Number(criteria),
          },
        ],
      },
      (err, dados) => {
        if ( err || Object.keys(dados).length == 0 ) {
          reject("Não posso mostrar disciplinas!");
        } else {
          resolve(dados);
        }
      }
    );
  });
};

exports.Crud_registar = (email, password) => {
  // insere um novo utilizador
  return new Promise((resolve, reject) => {
    data = { email: email, password: password };
    db.users.insert(data, (err, dados) => {
      if (err) {
        reject(null);
      } else {
        resolve(dados);
      }
    });
  });
};

// Retorna o utilizador e sua password encriptada
exports.cRud_login = (email) => {
  return new Promise((resolve, reject) => {
    // busca os registos que contêm a chave
    db.users.findOne(
      {
        email: email,
      },
      (err, dados) => {
        if (err) {
          reject("Utilizador não encontrado!");
        } else {
          resolve(dados);
        }
      }
    );
  });
};
