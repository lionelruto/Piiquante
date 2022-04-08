const Sauce = require('../models/sauce')

exports.likedSauce = (req, res, next) => {

    Sauce.findOne({_id: req.params.id})
        .then(sauce => {

            const resultLike = sauce.usersLiked.some(element => element === req.body.userId)
            const resultDislike = sauce.usersDisliked.some(element => element === req.body.userId)

            const filterUserLike = sauce.usersLiked.filter(element => element !== req.body.userId)
            const filterUserDislike = sauce.usersDisliked.filter(element => element !== req.body.userId)

            if(req.body.like === 1 && resultLike === false) {
                sauce.usersLiked.push(req.body.userId)
                sauce.likes += 1
            }else if(req.body.like === -1 && resultDislike === false) {
                sauce.usersDisliked.push(req.body.userId)
                sauce.dislikes += 1
            }else if(req.body.like === 0 && resultLike === true) {
                sauce.usersLiked = filterUserLike
                sauce.likes -= 1
            }else if(req.body.like === 0 && resultDislike === true) {
                sauce.usersDisliked = filterUserDislike
                sauce.dislikes -= 1
            }else{
                console.log('erreur')
            }
            Sauce.updateOne({_id: req.params.id}, {usersLiked: sauce.usersLiked, likes: sauce.likes, usersDisliked: sauce.usersDisliked, dislikes: sauce.dislikes})
                .then(() => res.status(200).json({message: 'Objet modifié !'}))
                .catch(error => res.status(500).json({message : 'bad request'}))
        })
        .catch(error => res.status(404).json({error}))
}