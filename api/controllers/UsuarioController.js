module.exports = {

	findSupervisores: function(req, res, next) {
		if ( req.Rol =='1' ) {

			Usuario.find({
				where:{ Rol: 1 }
			}).then(function(Supervisores) {

				if (Supervisores) {
					var SupervisoresJSON = [];
					Supervisores.forEach(function(Supervisor) {
						SupervisorJSON = {
							"ID":Supervisor.id,
							"Nombre":Supervisor.Nombre,
							"Apellidos":Supervisor.Apellidos
						}
						SupervisoresJSON.push(SupervisorJSON);
					});

					res.json(200, { Supervisores: SupervisoresJSON });
				}
				else { 
					return null;
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}
				

			}).catch(function(error) { next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	},

	findOperadores: function(req, res, next) { 

		if ( req.Rol =='1' ) {

			Usuario.find({
				where:{ Rol: 2 }
			}).then(function(Operadores) {

				if (Operadores) {
					var OperadoresJSON = [];
					Operadores.forEach(function(Operador) {
						OperadorJSON = {
							"ID":Operador.id,
							"Nombre":Operador.Nombre,
							"Apellidos":Operador.Apellidos
						}
						OperadoresJSON.push(OperadorJSON);
					});

					res.json(200, { Operadores: OperadoresJSON });
				}
				else { 
					return null;
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}
				

			}).catch(function(error) { next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	},

	findColaboradores: function(req, res, next) { 

		if ( req.Rol =='1' ) {

			Usuario.find({
				where:{ Rol: 3 }
			}).then(function(Colaboradores) {

				if (Colaboradores) {
					var ColaboradoresJSON = [];
					Colaboradores.forEach(function(Colaborador) {
						ColaboradorJSON = {
							"ID":Colaborador.id,
							"Nombre":Colaborador.Nombre,
							"Apellidos":Colaborador.Apellidos
						}
						ColaboradoresJSON.push(ColaboradorJSON);
					});

					res.json(200, { Colaboradores: ColaboradoresJSON });
				}
				else { 
					return null;
					res.json(404, {err: 'No se han encontrado Incidencias.'});
				}
				

			}).catch(function(error) { next(error); });

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}
	},

	create: function (req, res) {

		if ( req.Rol == '1' ) {

			if ( req.body.Rol == '1' && req.body.tipoOperador == null ) {
				//SUPERVISOR CREA A UN SUPERVISOR
				Usuario.create({

					NickName: 		req.body.NickName,
					Password: 		req.body.Password,
					Rol: 			req.body.Rol,
					Nombre: 		req.body.Nombre,
					Apellidos: 		req.body.Apellidos,
					Email: 		req.body.Email


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
			else if ( req.body.Rol == '2' && req.body.tipoOperador != null ) {
				//SUPERVISOR CREA A UN OPERADOR
				Usuario.create({

					NickName: 		req.body.NickName,
					Password: 		req.body.Password,
					tipoOperador: 	req.body.tipoOperador,
					Rol: 			req.body.Rol,
					Nombre: 		req.body.Nombre,
					Apellidos: 		req.body.Apellidos,
					Email: 		req.body.Email


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
			else if ( req.body.Rol == '3' && req.body.tipoOperador == null ) {
				//SUPERVISOR CREA A UN COLABORADOR
				Usuario.create({

					NickName: 		req.body.NickName,
					Password: 		req.body.Password,
					Rol: 			req.body.Rol,
					Nombre: 		req.body.Nombre,
					Apellidos: 		req.body.Apellidos,
					Email: 		req.body.Email


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

				return res.json(403, {err: 'Error al crear un Usuairo. Esto es posible por haber introducido un atributo invalido.'});
		
			}

		}
		else {

			return res.json(403, {err: 'Permiso denegado.'});
		
		}	

	},

	currentUser: function(req, res) {

		Usuario.findOne(Number(req.Usuario.id)).then(function(Usuario) {
	
			if (Usuario) {

				delete Usuario.Password;
				delete Usuario.createdAt;
				delete Usuario.updatedAt;

				res.json(Usuario);
	
			}
	
		}).catch(function(error) { next(error); });

	},

	updateUsuario: function (req, res) {

		if ( req.Rol == '1' ) {

			if ( req.body.Rol == '1' && req.body.tipoOperador == null && req.body.Usuario == null ) {
				//SUPERVISOR ACTUALIZA SUS DATOS
				console.log("Super actualiza sus datos");
				Usuario.update(
							{ id: req.Usuario.id },
							{ 
								NickName: 		req.body.NickName,
								Password: 		req.body.Password,
								Rol: 			req.body.Rol,
								Nombre: 		req.body.Nombre,
								Apellidos: 		req.body.Apellidos,
								Email: 		req.body.Email
							 }

				).exec(function(err,updated) {

					if (err) {
						return err;
					}
					else {
						res.json(200, {msg: 'Sus datos han sido actualizados satisfactoriamente.'});
					}

				});

			}
			else if ( req.body.Rol == '2' && req.body.tipoOperador != null ) {
				//SUPERVISOR ACTUALIZA DATOS DE UN OPERADOR
				console.log("Super actualiza el dato de un Operador");
				Usuario.update(
							{ id: req.body.Usuario },
							{ 
								NickName: 		req.body.NickName,
								Password: 		req.body.Password,
								tipoOperador: 	req.body.tipoOperador,
								Rol: 			req.body.Rol,
								Nombre: 		req.body.Nombre,
								Apellidos: 		req.body.Apellidos,
								Email: 		req.body.Email

							}
				).exec(function(err, updated) {
					if (err) {
						return err;
					}
					else {
						res.json(200, {msg: 'Los datos del Usuario han sido actualizados satisfactoriamente.'});
					}
				});

			}
			else if ( req.body.Rol == '3' && req.body.tipoOperador == null ) {
				//SUPERVISOR ACTUALIZA DATOS DE UN COLABORADOR
				console.log("Super actualiza el dato de un Colaborador");
				Usuario.update(
							{ id: req.body.Usuario },
							{ 
								NickName: 		req.body.NickName,
								Password: 		req.body.Password,
								Rol: 			req.body.Rol,
								Nombre: 		req.body.Nombre,
								Apellidos: 		req.body.Apellidos,
								Email: 		req.body.Email

							}
				).exec(function(err, updated) {
					if (err) {
						return err;
					}
					else {
						res.json(200, {msg: 'Los datos del Usuario han sido actualizados satisfactoriamente.'});
					}
				});

			}

		}
		else if ( req.Rol == '2' || req.Rol == '3' ) {
			//OPERADOR O COLABORADOR ACTUALIZA SUS PROPIOS DATOS
			console.log("el rol "+req.Rol+" actualiza sus datos");
			Usuario.update(
						{ id: req.Usuario.id },
						{ 
							NickName: 	req.body.NickName,
							Password: 	req.body.Password,
							Nombre: 	req.body.Nombre,
							Apellidos: 	req.body.Apellidos,
							Email: 	req.body.Email
						 }

			).exec(function(err,updated) {

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

		if ( req.Rol == '1' ) {

			Usuario.destroy({ id:Number(req.params.id) }).exec(function(deleted) {
				if (deleted) {
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
	}

}