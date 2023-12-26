const { Sequelize, DataTypes } = require('sequelize');

// Sequelize 연결 설정
const sequelize = new Sequelize('mydb', 'root', 'IsDead1!', {
  host: 'localhost',
  dialect: 'mysql',
});

// User 모델 정의
const User = sequelize.define('User', {
  mail: {
    type: DataTypes.STRING(45),
    primaryKey: true,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  pwd: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

// Topic 모델 정의
const Topic = sequelize.define('Topic', {
  title: {
    type: DataTypes.STRING(45),
    primaryKey: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'topic',
  timestamps: false,
});

// Post 모델 정의
const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  topic_title: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  created_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  edited: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  user_mail: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'post',
  timestamps: false,
});

// Emotion 모델 정의
const Emotion = sequelize.define('Emotion', {
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_mail: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  post_id: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'emotion',
  timestamps: false,
});

// Music 모델 정의
const Music = sequelize.define('Music', {
  title: {
    type: DataTypes.STRING(45),
    primaryKey: true,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  user_mail: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  post_id: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  tableName: 'music',
  timestamps: false,
});

// 모델 간의 관계 설정
User.hasMany(Post, { foreignKey: 'user_mail', sourceKey: 'mail' });
Post.belongsTo(User, { foreignKey: 'user_mail', targetKey: 'mail' });

Topic.hasMany(Post, { foreignKey: 'topic_title', sourceKey: 'title' });
Post.belongsTo(Topic, { foreignKey: 'topic_title', targetKey: 'title' });

User.hasMany(Emotion, { foreignKey: 'user_mail', sourceKey: 'mail' });
Emotion.belongsTo(User, { foreignKey: 'user_mail', targetKey: 'mail' });

Post.hasMany(Emotion, { foreignKey: 'post_id', sourceKey: 'id' });
Emotion.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' });

User.hasMany(Music, { foreignKey: 'user_mail', sourceKey: 'mail' });
Music.belongsTo(User, { foreignKey: 'user_mail', targetKey: 'mail' });

Post.hasMany(Music, { foreignKey: 'post_id', sourceKey: 'id' });
Music.belongsTo(Post, { foreignKey: 'post_id', targetKey: 'id' });

// 모델을 외부에서 사용할 수 있도록 export
module.exports = {
  sequelize,
  User,
  Topic,
  Post,
  Emotion,
  Music,
};
