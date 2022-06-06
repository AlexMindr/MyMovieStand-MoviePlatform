const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "genres", deps: []
 * createTable() => "movies", deps: []
 * createTable() => "users", deps: []
 * createTable() => "moviegenres", deps: [genres, movies]
 * createTable() => "notifications", deps: [users]
 * createTable() => "posts", deps: [movies, users]
 * createTable() => "reviews", deps: [movies, users]
 * createTable() => "usercomments", deps: [posts, users]
 * createTable() => "userlikes", deps: [reviews, users]
 * createTable() => "watchlists", deps: [movies, users]
 *
 */

const info = {
  revision: 1,
  name: "noname",
  created: "2022-06-05T21:36:54.823Z",
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
        language: { type: Sequelize.STRING(1000), field: "language" },
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
        firstName: { type: Sequelize.TEXT, field: "firstName" },
        lastName: { type: Sequelize.TEXT, field: "lastName" },
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
        gender: { type: Sequelize.STRING, field: "gender" },
        bio: { type: Sequelize.JSON, field: "bio" },
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
      "posts",
      {
        postid: {
          type: Sequelize.INTEGER,
          field: "postid",
          primaryKey: true,
          autoIncrement: true,
        },
        title: { type: Sequelize.STRING, field: "title", allowNull: false },
        content: { type: Sequelize.JSON, field: "content" },
        post_type: {
          type: Sequelize.STRING,
          field: "post_type",
          allowNull: false,
          defaultValue: "post",
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
        movieid: {
          type: Sequelize.INTEGER,
          field: "movieid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "movies", key: "movieid" },
          unique: "posts_userid_movieid_unique",
          allowNull: false,
          name: "movieid",
        },
        userid: {
          type: Sequelize.INTEGER,
          name: "userid",
          allowNull: false,
          field: "userid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "userid" },
          unique: "posts_userid_movieid_unique",
        },
      },
      { transaction },
    ],
  },
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
        movieid: {
          type: Sequelize.INTEGER,
          field: "movieid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "movies", key: "movieid" },
          unique: "reviews_userid_movieid_unique",
          allowNull: false,
          name: "movieid",
        },
        userid: {
          type: Sequelize.INTEGER,
          name: "userid",
          allowNull: false,
          field: "userid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "userid" },
          unique: "reviews_userid_movieid_unique",
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "usercomments",
      {
        ucid: {
          type: Sequelize.INTEGER,
          field: "ucid",
          autoIncrement: true,
          primaryKey: true,
        },
        comment_content: { type: Sequelize.JSON, field: "comment_content" },
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
        postid: {
          type: Sequelize.INTEGER,
          field: "postid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "posts", key: "postid" },
          unique: "usercomments_userid_postid_unique",
          allowNull: false,
          name: "postid",
        },
        userid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          name: "userid",
          field: "userid",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "users", key: "userid" },
          unique: "usercomments_userid_postid_unique",
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
        favourite: {
          type: Sequelize.BOOLEAN,
          field: "favourite",
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
    params: ["posts", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["reviews", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["usercomments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["userlikes", { transaction }],
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
