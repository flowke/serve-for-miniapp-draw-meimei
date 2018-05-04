module.exports = {
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

};
