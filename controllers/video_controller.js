const Video  = require('../models/video_model.js');


//Create new video and insert in the database
exports.create = (req, res) => {
  var video = new Video();
  video.name = req.body.name;
  video.type = req.body.type;
  video.url = req.body.url;
  video.category = req.body.category;
  video.save(function(err){
      if(err) {
          res.send(err);
      }
      res.status(201);
      res.json(video);
  });
};
//Search all videos in database
exports.getVideos = (req, res) => {
  Video.find()
    .then(videos => {
        res.send(videos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving videos."
        });
    });
};
//Search video with id
exports.getVideo = (req, res) => {
  Video.findById(req.params.id)
      .then(video => {
          if(!video) {
              return res.status(404).send({
                  message: "Video not found"
              });
          }
          res.send(video);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Video not found"
              });
          }
          return res.status(500).send({
              message: "Video not found"
          });
      });
  };
//Update a video identified by id
exports.update = (req, res) => {
  const id = req.params.id;
  var update = req.body;

  Video.findByIdAndUpdate(id, update, {new:true}, (err, video) => {
    if(err) return res.status(500).send({message: 'Error Server'});
        if(video){
            return res.status(200).send({
              video
            });
        }else{
            return res.status(404).send({
                message: 'Not found video'
            });
        }
  });
};
