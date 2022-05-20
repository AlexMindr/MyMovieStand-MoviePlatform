const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * dropTable() => "userreviews", deps: []
 * addColumn(movieid) => "reviews"
 * addColumn(userid) => "reviews"
 * addColumn(UserUserid) => "watchlists"
 * addColumn(MovieMovieid) => "watchlists"
 * changeColumn(movieid) => "watchlists"
 * changeColumn(userid) => "watchlists"
 *
 */

const info = {
  revision: 10,
  name: "noname",
  created: "2022-05-20T22:04:06.145Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["userreviews", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "reviews",
      "movieid",
      {
        type: Sequelize.INTEGER,
        field: "movieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "reviews_userid_movieid_unique",
        allowNull: false,
        name: "movieid",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "reviews",
      "userid",
      {
        type: Sequelize.INTEGER,
        unique: "reviews_userid_movieid_unique",
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
        references: { model: "users", key: "userid" },
        name: "userid",
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "watchlists",
      "UserUserid",
      {
        type: Sequelize.INTEGER,
        field: "UserUserid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "watchlists_movieid_UserUserid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "watchlists",
      "MovieMovieid",
      {
        type: Sequelize.INTEGER,
        field: "MovieMovieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "watchlists_userid_MovieMovieid_unique",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "watchlists",
      "movieid",
      {
        type: Sequelize.INTEGER,
        field: "movieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "watchlists_movieid_UserUserid_unique",
        allowNull: false,
        name: "movieid",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "watchlists",
      "userid",
      {
        type: Sequelize.INTEGER,
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "watchlists_userid_MovieMovieid_unique",
        allowNull: false,
        name: "userid",
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["reviews", "movieid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["reviews", "userid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["watchlists", "UserUserid", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["watchlists", "MovieMovieid", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "userreviews",
      {
        urid: {
          type: Sequelize.INTEGER,
          field: "urid",
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
        reviewid: {
          type: Sequelize.INTEGER,
          field: "reviewid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "reviews", key: "reviewid" },
          unique: "userreviews_reviewid_UserUserid_unique",
          allowNull: false,
          name: "reviewid",
        },
        UserUserid: {
          type: Sequelize.INTEGER,
          field: "UserUserid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "userid" },
          unique: "userreviews_reviewid_UserUserid_unique",
        },
        userid: {
          type: Sequelize.INTEGER,
          field: "userid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "userid" },
          unique: "userreviews_userid_ReviewReviewid_unique",
          allowNull: false,
          name: "userid",
        },
        ReviewReviewid: {
          type: Sequelize.INTEGER,
          field: "ReviewReviewid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "reviews", key: "reviewid" },
          unique: "userreviews_userid_ReviewReviewid_unique",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "watchlists",
      "movieid",
      {
        type: Sequelize.INTEGER,
        field: "movieid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "movies", key: "movieid" },
        unique: "watchlists_userid_movieid_unique",
        allowNull: false,
        name: "movieid",
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "watchlists",
      "userid",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        name: "userid",
        field: "userid",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "users", key: "userid" },
        unique: "watchlists_userid_movieid_unique",
      },
      { transaction },
    ],
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
