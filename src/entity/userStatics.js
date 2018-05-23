const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
module.exports = {
  // 添加一个用户
  addUser(openid){
    return this.create({openid});
  },
  // 通过 openid查询用户信息
  findUserByOpenid(openid){
    return this.findOne({openid}, '_id' );
  },
  getUsers(){
    return this.aggregate([
      { $project : {
          _id : 1 ,
          sizeOfMarkers: {$size: "$markers"} ,
          userInfo: 1
        }
      },
    ])
  },
  getFriends(userID){
    let that = this;
    return this.aggregate([
      {$match: {_id: ObjectId(userID)}},
      {$unwind: '$friends'},
      {$lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'friends',
        as: "friend"
      }},
      {$replaceRoot: {
        newRoot: {
          $arrayElemAt: [ '$friend', 0 ]
        }
      }},
      {$project: {
        userInfo: 1,
        sizeOfMarkers: {$size: '$markers'}
      }}

    ])
  },
  collect(userID, personID){
    return this.updateOne({_id:userID},{
      $addToSet: {friends: personID}
    })
  },
  checkCollect(userID, personID){
    return this.findOne({_id:userID,friends: personID});
  },
  delCollect(userID, personID){
    return this.updateOne({_id:userID},{
      $pull: {friends: personID}
    })
  },
  getProfile(id){
    return this.findById(id, 'markers userInfo')
  },
  saveUserInfo(userID,userInfo){
    return this.updateOne({_id:userID},{userInfo});
  },
  addMark(id, data){

    return this.findById(id)
    .then(user=>{
      user.markers.push(data);
      return user.save();
    })
    .then(user=>{

      return user.markers;
    });
  },
  deleteMarkers(userID, markerIds){

    return this.findByIdAndUpdate(userID, {
      $pull:{
      markers: {_id:{$in: markerIds}}
    }},{
      new:true
    })
    .then(res=>res.markers);
  },

  getMarkers(id){
    return this.findById(id, 'markers');
  },

  editAddress({
    markerID,
    title,
    address,
    latitude,
    longitude,
    userID
  }){
    return this.findById(userID, 'markers')
    .then(user=>{
      user.markers.id(markerID)
      .set({
        title,
        address,
        latitude,
        longitude,
      });

      return user.save();
    })
    .then(res=>res.markers);
  },

  editEvent({
    markerID,
    eventID,
    incidentTime,
    incidentDesc,
    userID,
  }){
    return this.findById(userID, 'markers')
      .then(user=>{
        user.markers.id(markerID).events.id(eventID)
        .set({
          time: incidentTime,
          content: incidentDesc
        });
        return user.save();
      })
      .then(res=>res.markers);
  },

  addEvent({
    markerID,
    incidentTime,
    incidentDesc,
    userID,
  }){
    return this.findById(userID, 'markers')
      .then(user=>{
        user.markers.id(markerID).events.push({
          time: incidentTime,
          content: incidentDesc
        })
        return user.save();
      })
      .then(res=>res.markers);
  },

  deleteEvent(userID, markerID, eventID){
    return this.findById(userID)
    .then(user=>{
      user.markers.id(markerID).events.id(eventID)
      .remove();
      return user.save();
    })
    .then(user=>user.markers)
  }
};
