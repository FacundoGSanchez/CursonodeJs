const customHeader = (req, res, next) => {
   try {
        const apiKey = req.headers.api_key
        if(apiKey === 'fsanchez'){
            
            next()
        }else{
            res.status(403)
            res.send({error:"API KEY NO ES CORRECTA"})
        }

   } catch (e) {
        res.status(403)
        res.send({error: "OCURRIO ERROR EN CUSTOMHEADER"})
   }
}

module.exports = customHeader