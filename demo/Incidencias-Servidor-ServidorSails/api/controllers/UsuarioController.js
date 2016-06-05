module.exports = {

	findOperadores: function(req, res, next) { 

		if( req.Rol =='1' ){

			Usuario.find({
				where:{ Rol:2 }
			}).then(function(Operadores){

				if(Operadores){
					var Operadores = [];
					Operadores.forEach(function(Operador){
						OperadorJSON = {
							"id":Operador.id,
							"Nombre":Operador.Nombre,
							"Apellidos":Operador.Apellidos
						}
						Operadores.push(OperadorJSON);
					});

					res.json(Operadores);
				}
				else { 
					return null;
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}
				

			}).catch(function(error){ next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	},
	create: function (req, res) {

		/*Usuario.create(req.body).exec(function (err, user) {
			if (err) {
				console.log(err);
				return res.json(err.status, {err: err});
			}

			// Si el usuario se crea correctamente enviamos el usuario y un token.
			if (user) {
				res.json(200, { user: user, token: JWToken.issue({ id: Usuario.id }) });
			}
		});*/

		if( req.Rol == '1' ){

			Usuario.create({

						NickName: 	req.body.NickName,
						Password: 	req.body.Password,
						Rol: 		req.body.Rol,
						Nombre: 	req.body.Nombre,
						Apellidos: 	req.body.Apellidos,
						Email: 	req.body.Email


			}).exec(function (err, user) {
				if (err) {
					console.log(err);
					return res.json(err.status, {err: err});
				}

				// Si el usuario se crea correctamente enviamos el usuario y un token.
				if (user) {
					res.json(200, { user: user, token: JWToken.issue({ id: Usuario.id }) });
				}
			});

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}	

	},

	currentUser: function(req, res) {

		Usuario.findOne(Number(req.Usuario.id)).then(function(Usuario){
	
			if (Usuario) {

				delete Usuario.Password;
				delete Usuario.createdAt;
				delete Usuario.updatedAt;

				res.json(Usuario);
	
			}
	
		}).catch(function(error){ next(error); });

	},

	updateUsuario: function (req, res){

		if( req.Rol == '1' ){

			if( req.body.UsuarioID ){

				Usuario.update(
							{ id: req.body.UsuarioID },
							{ 
								NickName: 	req.body.NickName,
								Password: 	req.body.Password,
								Rol: 		req.body.Rol,
								Nombre: 	req.body.Nombre,
								Apellidos: 	req.body.Apellidos,
								Email: 	req.body.Email

							}
				).exec(function(err, updated){
					if (err) {
						return err;
					}
					else {
						res.json(200, {msg: 'Los datos del Usuario han sido actualizados satisfactoriamente.'});
					}
				});

			}
			else {

				Usuario.update(
							{ id: req.Usuario.id },
							{ 
								NickName: 	req.body.NickName,
								Password: 	req.body.Password,
								Rol: 		req.body.Rol,
								Nombre: 	req.body.Nombre,
								Apellidos: 	req.body.Apellidos,
								Email: 	req.body.Email
							 }

				).exec(function(err,updated){

					if (err) {
						return err;
					}
					else {
						res.json(200, {msg: 'Sus datos han sido actualizados satisfactoriamente.'});
					}

				});

			}

		}
		else if ( req.Rol == '2' || req.Rol == '3' ){

			Usuario.update(
						{ id: req.Usuario.id },
						{ 
							NickName: 	req.body.NickName,
							Password: 	req.body.Password,
							Nombre: 	req.body.Nombre,
							Apellidos: 	req.body.Apellidos,
							Email: 	req.body.Email
						 }

			).exec(function(err,updated){

				if (err) {
					return err;
				}
				else {
					res.json(200, {msg: 'Sus datos han sido actualizados satisfactoriamente.'});
				}

			});

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}


	},

	delete: function (req, res) {

		if( req.Rol == '1' ) {

			//Usuario.destroy({ id:Number(req.body.UsuarioID) }).exec(function(deleted){
			Usuario.destroy({ id:Number(req.params.id) }).exec(function(deleted){
				if(deleted){
					return res.negotiate(deleted);
				}
				else{
					res.json(200,{deleted});
				}
			});

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	}/*,

	updatePassword: function(req, res) {

		if ( req.Rol == '1' ){
			Usuario.update(
						{ id: req.body.UsuarioId },
						{ Password: req.body.newPassword }

			).exec(function(err,updated){

				if (err) {
					return err;
				}
				else {
					res.json(200, {msg: 'La contraseña se ha cambiado satisfactoriamente.'});
				}

			});

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}

	},

	updateOwnPassword: function(req, res) {

		Usuario.update(
					{ id: req.Usuario.id },
					{ Password: req.body.newPassword }

		).exec(function(err,updated){

			if (err) {
				return err;
			}
			else {
				res.json(200, {msg: 'La contraseña se ha cambiado satisfactoriamente.'});
			}

		});

	}*/

}