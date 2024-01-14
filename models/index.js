const { sequelize } = require('./utils');
const { User } = require('./User');
const { Comment } = require('./Comment');
const { Emotion } = require('./Emotion');
const { Post } = require('./Post');
const { Music } = require('./Music');
const { Tag } = require('./Tag');
const { TagMapping } = require('./TagMapping');
const { RefreshToken } = require('./RefreshToken');

Post.belongsTo(User, { foreignKey: 'user_nickname', targetKey: 'nickname' });
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });
Comment.belongsTo(User, { foreignKey: 'user_nickname' });
Comment.belongsTo(Music, { foreignKey: 'music_id' });
Emotion.belongsTo(User, { foreignKey: 'user_nickname' });
Emotion.belongsTo(Comment, { foreignKey: 'comment_id' });
TagMapping.belongsTo(Post, { foreignKey: 'post_id' });
TagMapping.belongsTo(Tag, { foreignKey: 'tag_id' });
RefreshToken.belongsTo(User, { foreignKey: 'user_nickname' });

module.exports = {
  User,
  Post,
  Music,
  Comment,
  Emotion,
  Tag,
  TagMapping,
  RefreshToken,
  sequelize,
};
