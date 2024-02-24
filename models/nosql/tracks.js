const mongoose = require("mongoose");
const  mongooseDelete  = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
    {
        name:{
            type:String
        },
        albun:{
            type:String
        },
        cover:{
            type:String,
            validate:{
                validator: (req) => {
                    return true;
                },
                message: "ERROR URL",
            },
        },
        artist:{
            name:{
                type:String,
            },
            nikname:{
                type:String,
            },
            nationality: {
                type:String
            }
        },
        duration:{
            start:{
                type:Number,
            },
            end:{
                type:Number,
            }
        },
        mediaId:{
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps:true, //TODO CreatedAT, updateAT
        versionKey:false
    }
);

/** 
 * Implementar metodo propio con relacion a storage
 */
TracksScheme.statics.findAllData = function() {
    const joinData = this.aggregate([
        {
            $lookup:
              {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio"
              },
         },
         {
            $unwind:"$audio"
         }  
    ])
    return joinData
  };

  TracksScheme.statics.findOneData = function (id) {
    const joinData = this.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "storages", //TODO Tracks --> storages
          localField: "mediaId", //TODO Tracks.mediaId
          foreignField: "_id", //TODO Straoges._id
          as: "audio", //TODO Alias!
        },
      },
      {
        $unwind: "$audio",
      }
    ]);
    return joinData;
  };


TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksScheme)