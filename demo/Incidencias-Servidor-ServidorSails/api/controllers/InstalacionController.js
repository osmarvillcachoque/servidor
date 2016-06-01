module.exports = {

	create: function (req, res, next){

		if( req.Rol == '1' ){
			var id = 0;
			Instalacion.count().exec(function(err, cont){
				id = cont + 1;
				Instalacion.create({
								id: id,
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
			});
			
		}

	},

	update: function (req, res) {

		Instalacion.findOne(req.params.id).then(function(Instalacion) {	

		if ( Instalacion ) {	

			if ( req.Rol == '1' ) {

				var UbicacionID = Number(Instalacion.Ubicacion.id);
				
				if( UbicacionID != req.body.Ubicacion ){

					UbicacionID = req.body.Ubicacion;
				}

				Instalacion.update(
							{ id: Number(req.params.id) }, 		
							{
								Nombre: req.body.Nombre,
								Ubicacion: UbicacionID
							}
				).exec(function (err, updated){

					if (err) {
						return err;
					}

					if (updated) {
						res.json(200, { msg: 'El nombre de la Instalacion "'+ Instalacion.Nombre +'" ha sido actualizada satisfactoriamente por : "'+updated.Nombre+'"' });
					}

				});

			}
			else {
				return res.json(403, {err: 'No tiene Permiso.'});
			}

		}

		}).catch(function(error){ next(error); });

	},

	delete: function (req, res, next) {

		if( req.Rol == '1' ) {

			Instalacion.destroy({ id:Number(req.params.id) }).exec(function(deleted){
				if(deleted){
					return res.negotiate(deleted);
				}
				else{
					res.json(200,{deleted});
				}
			});

		}
	}	
};

