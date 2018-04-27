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
  }
};
