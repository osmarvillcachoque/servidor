module.exports = {

	create: function (req, res, next){

		if( req.Rol == '1' ){

			Instalacion.create({
							Nombre: req.body.Nombre,
							Ubicacion: req.body.Ubicacion,
							Incidencias: []
						       }
			).exec(function (err, Instalacion) {

				if (err) {
					return res.json(err.status, {err: err});
				}

				if (Instalacion) {
					res.json(200, { msg: 'Instalacion creada satisfactoriamente.' });
				}
			
			});
		}

	}	
};

