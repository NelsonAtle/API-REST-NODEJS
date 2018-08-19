const Video  = require('../models/video_model.js');


//Create new video and insert in the database
exports.create = (req, res) => {
  var video = new Video();
  video.user = req.body.user;
  video.name = req.body.name;
  video.type = req.body.type;
  video.url = req.body.url;
  video.save(function(err){
      if(err) {
          res.send(err);
      }
      res.status(201);
      res.json(video);
  });
};

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
              message: "Error internal server"
          });
      });
  };
exports.getVideoUser = (req, res) => {
    Video.find({user:req.params.id})
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
                message: "Error internal server"
            });
        });
    };
//Update a video identified by id
exports.update = (req, res) => {
  const id = req.params.id;
  var update = req.body;

  Video.findByIdAndUpdate(id, update, {new:true}, (err, video) => {
    if(err) return res.status(500).send({message: 'Error internal server'});
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
//Delete a video identified by id
exports.delete = (req, res) => {
  
  Video.remove({
            _id: req.params.id
        }, function (err, video) {
            if(err) return res.status(500).send({message: 'Error internal server'});
            res.sendStatus(200);
        });
};
