const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "reviews", deps: []
 * createTable() => "userlikes", deps: [reviews, users]
 * createTable() => "userreviews", deps: [reviews, users, users, reviews]
 *
 */

const info = {
  revision: 4,
  name: "noname",
  created: "2022-05-20T19:20:21.213Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "reviews",
      {
        reviewid: {
          type: Sequelize.INTEGER,
          field: "reviewid",
          primaryKey: true,
          autoIncrement: true,
        },
        content: { type: Sequelize.JSON, field: "content" },
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
      "userlikes",
      {
        ulid: {
          type: Sequelize.INTEGER,
          field: "ulid",
          autoIncrement: true,
          primaryKey: true,
        },
        liked: { type: Sequelize.BOOLEAN, field: "liked", defaultValue: true },
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
          unique: "userlikes_userid_reviewid_unique",
          allowNull: false,
          name: "reviewid",
        },
        userid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          name: "userid",
          field: "userid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "userid" },
          unique: "userlikes_userid_reviewid_unique",
        },
      },
      { transaction },
    ],
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
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["reviews", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["userlikes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["userreviews", { transaction }],
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
