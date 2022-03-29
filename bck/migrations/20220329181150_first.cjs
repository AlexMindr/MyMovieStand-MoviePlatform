const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "genres", deps: []
 * createTable() => "movies", deps: []
 * createTable() => "users", deps: []
 * createTable() => "moviegenres", deps: [genres, movies]
 * createTable() => "notifications", deps: [users]
 * createTable() => "watchlists", deps: [movies, users]
 *
 */

const info = {
  revision: 1,
  name: "first",
  created: "2022-03-29T18:11:50.005Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "genres",
      {
        genreid: {
          type: Sequelize.INTEGER,
          field: "genreid",
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          field: "name",
          allowNull: false,
          unique: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "movies",
      {
        movieid: {
          type: Sequelize.INTEGER,
          field: "movieid",
          primaryKey: true,
          autoIncrement: true,
        },
        adult: { type: Sequelize.BOOLEAN, field: "adult", defaultValue: false },
        backdrop_path: { type: Sequelize.STRING, field: "backdrop_path" },
        budget: { type: Sequelize.BIGINT(16).UNSIGNED, field: "budget" },
        homepage: { type: Sequelize.STRING, field: "homepage" },
        imdb_id: { type: Sequelize.STRING, field: "imdb_id" },
        tmdb_id: { type: Sequelize.INTEGER, field: "tmdb_id" },
        language: { type: Sequelize.STRING(1234), field: "language" },
        original_title: { type: Sequelize.STRING, field: "original_title" },
        overview: { type: Sequelize.TEXT, field: "overview" },
        poster_path: { type: Sequelize.STRING, field: "poster_path" },
        release_date: { type: Sequelize.DATE, field: "release_date" },
        revenue: { type: Sequelize.BIGINT(16).UNSIGNED, field: "revenue" },
        duration: { type: Sequelize.STRING, field: "duration" },
        status: { type: Sequelize.STRING, field: "status" },
        title: { type: Sequelize.STRING, field: "title" },
        trailer: { type: Sequelize.STRING, field: "trailer" },
        keywords: { type: Sequelize.STRING(5000), field: "keywords" },
        popularity: { type: Sequelize.INTEGER.UNSIGNED, field: "popularity" },
        uscertification: { type: Sequelize.STRING, field: "uscertification" },
        rating: { type: Sequelize.DECIMAL(10, 1), field: "rating" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        userid: {
          type: Sequelize.INTEGER,
          field: "userid",
          primaryKey: true,
          autoIncrement: true,
        },
        useruuid: {
          type: Sequelize.UUID,
          field: "useruuid",
          allowNull: false,
          unique: true,
          defaultValue: Sequelize.UUIDV4,
        },
        username: {
          type: Sequelize.STRING,
          field: "username",
          allowNull: false,
          unique: true,
        },
        fullname: { type: Sequelize.STRING, field: "fullname" },
        dateofbirth: { type: Sequelize.DATE, field: "dateofbirth" },
        role: { type: Sequelize.STRING, field: "role", allowNull: false },
        email: {
          type: Sequelize.STRING,
          field: "email",
          isEmail: true,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          field: "location",
          allowNull: true,
        },
        changecode: { type: Sequelize.STRING, field: "changecode" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "moviegenres",
      {
        mgid: {
          type: Sequelize.INTEGER,
          field: "mgid",
          autoIncrement: true,
          primaryKey: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        genreid: {
          type: Sequelize.INTEGER,
          field: "genreid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "genres", key: "genreid" },
          unique: "moviegenres_movieid_genreid_unique",
          allowNull: false,
          name: "genreid",
        },
        movieid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          name: "movieid",
          field: "movieid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "movies", key: "movieid" },
          unique: "moviegenres_movieid_genreid_unique",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "notifications",
      {
        notificationid: {
          type: Sequelize.INTEGER,
          field: "notificationid",
          autoIncrement: true,
          primaryKey: true,
        },
        userid: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          references: { model: "users", key: "userid" },
          field: "userid",
          onDelete: "CASCADE",
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(1000),
          field: "content",
          allowNull: false,
        },
        read: {
          type: Sequelize.BOOLEAN,
          field: "read",
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "watchlists",
      {
        wlid: {
          type: Sequelize.INTEGER,
          field: "wlid",
          autoIncrement: true,
          primaryKey: true,
        },
        rating: { type: Sequelize.INTEGER, field: "rating" },
        status: { type: Sequelize.STRING, field: "status" },
        episodes: { type: Sequelize.INTEGER.UNSIGNED, field: "episodes" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        movieid: {
          type: Sequelize.INTEGER,
          field: "movieid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "movies", key: "movieid" },
          unique: "watchlists_userid_movieid_unique",
          allowNull: false,
          name: "movieid",
        },
        userid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          name: "userid",
          field: "userid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "userid" },
          unique: "watchlists_userid_movieid_unique",
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["genres", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["movies", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["moviegenres", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["notifications", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["watchlists", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
