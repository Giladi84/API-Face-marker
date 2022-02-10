const handleImage = (req,res,knex) => {
	const { id } = req.body;
	knex('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then (data => {
		res.json(data[0].entries)
	})
	.catch(err => {res.status(400).json(`can't get entries...`)})


}

const handleClarifaiCall = (req,res,fetch) => {
	const { url } = req.body;

	let raw = JSON.stringify({
        "user_app_id": {
          "user_id": "giladi84",
          "app_id": "faceRec"
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": url
              }
            }
          }
        ]
      });

  let requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key 10ebf6683cde40a6a4f666d6f60e0315'
        },
        body: raw
  };

  fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
  .then(response => response.json())
  .then(result => {
  	if (result.status.code === 10000) {
  		return res.json(result)
  	}
	})
  .catch(err => res.status(400).json('there was an error'))
}



module.exports = {
	handleImage: handleImage,
	handleClarifaiCall: handleClarifaiCall
}