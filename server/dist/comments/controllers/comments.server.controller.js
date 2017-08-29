'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _commentsServer=require('../models/comments.server.model'),_commentsServer2=_interopRequireDefault(_commentsServer);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var commentControls={list:function list(a,b){_commentsServer2.default.find(function(c,d){c&&console.log(c),b.send({comments:d})})},listByReferredPost:function listByReferredPost(a,b){var c=a.params.referredPost;_commentsServer2.default.find({referredPost:c},function(d,e){d&&console.log(d),b.send({comments:e})})},listLengthByGroupBelonged:function listLengthByGroupBelonged(a,b){var c=a.params.groupBelonged;_commentsServer2.default.find({groupBelonged:c}).count(function(d,e){return d?d:void b.send({commentsLength:e})})},listByUserComments:function listByUserComments(a,b){var c=a.params.referredPost,d=a.params.commentedBy;_commentsServer2.default.find({referredPost:c,"commentedBy._id":d},function(e,f){if(e)return e;return null===f?b.status(404).send('Comments not found!'):void b.send({comments:f})})},listLengthByOneUser:function listLengthByOneUser(a,b){var c=a.params.commentedBy;_commentsServer2.default.find({"commentedBy._id":c}).count(function(d,e){return d?d:void b.send({commentsLength:e})})},listOne:function listOne(a,b){var c=a.params.id;_commentsServer2.default.findById(c,function(d,e){if(d)return d;return null===e?b.status(404).send('Comment not found!'):void b.send({comment:e})})},post:function post(a,b){var c=new _commentsServer2.default(a.body);c.save(function(d){d&&console.log(d),b.send('Comment saved.')})},updateReactions:function updateReactions(a,b){var c=a.params.id;_commentsServer2.default.findByIdAndUpdate(c,{reactions:a.body.reactions},function(d){d&&console.log(d);b.send('Comment updated')})},removeOne:function removeOne(a,b){var c=a.params.id;_commentsServer2.default.findByIdAndRemove(c,function(d,e){if(d)return d;return null===e?b.status(404).send('Comment not found!'):void b.send('Comment deleted.')})},removeByReferredPost:function removeByReferredPost(a,b){var c=a.params.referredPost;_commentsServer2.default.remove({referredPost:c},function(d){return d?d:void b.send('Comments deleted.')})}};exports.default=commentControls;
//# sourceMappingURL=comments.server.controller.js.map