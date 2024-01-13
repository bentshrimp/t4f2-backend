const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/config.json');

const db = dbConfig.test;

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
});

// User 모델 정의
const User = sequelize.define(
  'User',
  {
    index: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR(88),
      allowNull: false,
    },
    salt: {
      type: DataTypes.CHAR(88),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: 'user',
    timestamps: true,
    createdAt: 'signedupAt',
    updatedAt: 'changedPwdAt',
  }
);

// Post 모델 정의
const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'post',
    timestamps: true,
    updatedAt: 'modifiedAt',
  }
);

// Comment 모델 정의
const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'comment',
    timestamps: true,
    updatedAt: 'modifiedAt',
  }
);

// Emotion 모델 정의
const Emotion = sequelize.define(
  'Emotion',
  {
    user_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'emotion',
    timestamps: true,
    updatedAt: false,
  }
);

// Music 모델 정의
const Music = sequelize.define(
  'Music',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    user_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'music',
    timestamps: false,
  }
);

// Tag 모델 정의
const Tag = sequelize.define(
  'Tag',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: 'tag',
    timestamps: false,
  }
);

// TagMapping 모델 정의
const TagMapping = sequelize.define(
  'TagMapping',
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'tag_mapping',
    timestamps: false,
  }
);

// 모델 간의 관계 설정
Post.hasMany(Comment, { foreignKey: 'post_id', sourceKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' });

Post.hasMany(TagMapping, { foreignKey: 'post_id', sourceKey: 'id' });
TagMapping.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' });

Tag.hasMany(TagMapping, { foreignKey: 'tag_id', sourceKey: 'id' });
TagMapping.belongsTo(Tag, { foreignKey: 'tag_id', targetKey: 'id' });

// 모델을 외부에서 사용할 수 있도록 export
module.exports = {
  sequelize,
  User,
  Post,
  Comment,
  Emotion,
  Music,
  Tag,
  TagMapping,
};
