angular.module("AppIncidencias")

	.controller('AdminController', function ($scope, $filter, $http, $route, $timeout, $rootScope, $window, $uibModal, SupervisorService) {

		$scope.cargarDatos = function() {

			SupervisorService.getDepartamentos()

				.success(function(data) {

					$scope.Departamentos = data.DepartamentosJSON;
					$scope.DepartamentoSeleccionado = $scope.Departamentos[0];
					$scope.UbicacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0];
					$scope.InstalacionSeleccionada = $scope.Departamentos[0].Ubicaciones[0].Instalaciones[0];

					SupervisorService.getSupervisores()

						.success(function(data) {

							$scope.Supervisores = data.Supervisores;
							$scope.SupervisorSeleccionado = $scope.Supervisores[0];

							SupervisorService.getTiposOperador()

							.success(function(data) {

								$scope.tiposOperador = data.Tipos;
								$scope.tipoOperadorSeleccionado = $scope.tiposOperador[0];

								SupervisorService.getOperadores()

								.success(function(data) {

									$scope.Operadores = data.Operadores;
									$scope.OperadorSeleccionado = $scope.Operadores[0];
									
									SupervisorService.getColaboradores()

									.success(function(data) {

										$scope.Colaboradores = data.Colaboradores;
										$scope.ColaboradorSeleccionado = $scope.Colaboradores[0];
										$scope.DatosCargados = true;

									})

									.error(function(error) {
										console.log(error);
									})
									

								})

								.error(function(error) {
									console.log(error);
								})

							})
							.error(function(error) {
								console.log(error);
							})	

						})

						.error(function(error) {
							console.log(error);
						})

				})

				.error(function(error) {
					console.log(error);
				})

		};
		$scope.getDatosAdminCrear = function() {
			SupervisorService.getDepartamentos()
				.success(function(data) {
				
					$scope.Departamentos = data.DepartamentosJSON;

					$scope.newUbicacion.Departamento = $scope.Departamentos[0];

					$scope.newInstalacion.Departamento = $scope.Departamentos[0];
					$scope.newInstalacion.Ubicacion = $scope.Departamentos[$scope.newInstalacion.Departamento.id-1].Ubicaciones[0];

					SupervisorService.getTiposOperador()

						.success(function(data) {

							$scope.tiposOperador = data.Tipos;
							$scope.newUsuario.tipoOperador = $scope.tiposOperador[0];
						
							$scope.DatosCargados = true
					})

					.error(function(error) {
						console.log(error);
					})

				})

				.error(function(error) {
					console.log(error);
				})

		};

		$scope.setUbicacion = function() {
			if ( $scope.DepartamentoSeleccionado != null ) {
				$scope.UbicacionSeleccionada = $scope.Departamentos[$scope.DepartamentoSeleccionado.id - 1].Ubicaciones[0];
			}	

			if ( $scope.newInstalacion.Departamento != null ) {
				$scope.newInstalacion.Ubicacion = $scope.Departamentos[$scope.newInstalacion.Departamento.id - 1].Ubicaciones[0];
			}

			$scope.setInstalacion();

			$scope.filtro = '';
			$scope.getData = function () {
			return $filter('filter')($scope.data, $scope.filtro)
			}


		};

		$scope.setInstalacion = function() {
			if (  $scope.UbicacionSeleccionada != null ) {
				$scope.InstalacionSeleccionada = $scope.UbicacionSeleccionada.Instalaciones[0];
			}		
		};

		$scope.setDepartamento = function(InstalacionID) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					for ( var m = 0 ; m < $scope.Departamentos[i].Ubicaciones[n].Instalaciones.length ; m++ ){
						if ( $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == InstalacionID ) {
							$scope.DepartamentoSeleccionado = $scope.Departamentos[i];	
							$scope.UbicacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n];
							$scope.InstalacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m];
						}
					}						
				}
			}
		}


		$scope.Cancelar = function () {
			$uibModalInstance.dismiss('cancel');
		};

		/*SET ADMIN*/
		$scope.setDepartamentoSeleccionado = function(Departamento) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				if ( $scope.Departamentos[i].id == Departamento ) {
					$scope.DepartamentoSeleccionado = $scope.Departamentos[i].id;	
				}
			}
			
		};
		$scope.setUbicacionSeleccionada = function(Ubicacion) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					if ( $scope.Departamentos[i].Ubicaciones[n].id == Ubicacion ) {
						$scope.UbicacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n].id
					}						
				}
			}
			
		};
		$scope.setInstalacionSeleccionada = function(Instalacion) {
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					for ( var m = 0 ; m < $scope.Departamentos[i].Ubicaciones[n].Instalaciones.length ; m++ ){
						if ( $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == Instalacion ) {
							$scope.InstalacionSeleccionada = $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id;
						}
					}						
				}
			}

		};

		$scope.setSupervisorSeleccionado = function(Supervisor) {
				if($scope.Supervisores.length == 1) {
					$scope.SupervisorSeleccionado = $scope.Supervisores[0].ID;
				}
				else {	
					for ( var i = 0 ; i < $scope.Supervisores.length ; i++ ) {
						if ( $scope.Supervisores[i].ID == Supervisor ) {
							$scope.SupervisorSeleccionado = $scope.Supervisores[i].ID;
							console.log($scope.SupervisorSeleccionado);
						}
					}
				}
		};
		$scope.setOperadorSeleccionado = function(Operador) {
			console.log($scope.Operadores);
			console.log(Operador);
			for ( var i = 0 ; i < $scope.Operadores.length ; i++ ) {
				if ( $scope.Operadores[i].ID == Operador ) {
					$scope.OperadorSeleccionado = $scope.Operadores[i].ID;
					console.log($scope.OperadorSeleccionado);
				}
			}
		};
		$scope.setColaboradorSeleccionado = function(Colaborador) {
			for ( var i = 0 ; i < $scope.Colaboradores.length ; i++ ) {
				if ( $scope.Colaboradores[i].ID == Colaborador ) {
					$scope.ColaboradorSeleccionado = $scope.Colaboradores[i].ID;
					console.log($scope.ColaboradorSeleccionado);
				}
			}
		};

		/*ADMIN*/
		$scope.newDepartamento={ Nombre: "" };	
		$scope.newUbicacion={ Nombre: "", Departamento: "" };
		$scope.newInstalacion={ Nombre: "", Ubicacion: "", Departamento: "" };
		$scope.newUsuario={ NickName: "", Password: "", tipoOperador: "", Nombre: "", Apellidos: "", Email: "" };

		$scope.CrearDepartamento = function () {

			if ( $rootScope.Rol == '1' ) {
				$http.post('/Departamento', { 
								Nombre: $scope.newDepartamento.Nombre,
								Ubicaciones: []
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}

		};
		$scope.EditarDepartamento = function () {
			if ( $scope.DepartamentoSeleccionado != null ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Departamento.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'lg',
					resolve: {
						DepartamentoID: $scope.DepartamentoSeleccionado,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: null,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};
		$scope.EliminarDepartamento = function () {
			console.log($scope.DepartamentoSeleccionado);
			if( $scope.DepartamentoSeleccionado != null && $rootScope.Rol == '1' ) {
				$http.delete('/Departamento/' + $scope.DepartamentoSeleccionado)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};

		$scope.CrearUbicacion = function () {
			console.log($scope.newUbicacion);
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Ubicacion', { 
								Nombre: $scope.newUbicacion.Nombre,
								Departamento: $scope.newUbicacion.Departamento.id,
								Instalaciones: []
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarUbicacion = function () {
			if ( $scope.UbicacionSeleccionada != null ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Ubicacion.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'lg',
					resolve: {
						DepartamentoID: null,
						UbicacionID: $scope.UbicacionSeleccionada,
						InstalacionID: null,
						UsuarioID: null,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};
		$scope.EliminarUbicacion = function () {
			console.log($scope.UbicacionSeleccionada);
			if( $scope.UbicacionSeleccionada != null && $rootScope.Rol == '1' ) {
				$http.delete('/Ubicacion/' + $scope.UbicacionSeleccionada)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};

		$scope.CrearInstalacion = function () {
			console.log($scope.newInstalacion);
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Instalacion', { 
								Nombre: $scope.newInstalacion.Nombre,
								Ubicacion: $scope.newInstalacion.Ubicacion.id,
								Incidencias: []
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarInstalacion = function () {
			if ( $scope.InstalacionSeleccionada != null ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Instalacion.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'lg',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: $scope.InstalacionSeleccionada,
						UsuarioID: null,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};
		$scope.EliminarInstalacion = function () {
			console.log($scope.InstalacionSeleccionada);
			if( $scope.InstalacionSeleccionada != null && $rootScope.Rol == '1' ) {
				$http.delete('/Instalacion/' + $scope.InstalacionSeleccionada)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};


		/*USUARIOS*/
		$scope.CrearSupervisor = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Usuario', { 
								NickName: $scope.newUsuario.NickName,
								Password: $scope.newUsuario.Password,
								Rol: 1,
								Nombre: $scope.newUsuario.Nombre,
								Apellidos: $scope.newUsuario.Apellidos,
								Email: $scope.newUsuario.Email
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarSupervisor = function () {
			if ( $scope.SupervisorSeleccionado != null ) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Usuario.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'lg',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: $scope.SupervisorSeleccionado,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};

		$scope.CrearOperador = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Usuario', { 
								NickName: $scope.newUsuario.NickName,
								Password: $scope.newUsuario.Password,
								Rol: 2,
								tipoOperador: $scope.newUsuario.tipoOperador,
								Nombre: $scope.newUsuario.Nombre,
								Apellidos: $scope.newUsuario.Apellidos,
								Email: $scope.newUsuario.Email
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarOperador = function () {
			if ( $scope.OperadorSeleccionado != null) {
				$uibModal.open({
						templateUrl: "Vistas/Formularios/Supervisor/Editar Usuario.html",
						controller: 'SupervisorController',
						scope: $scope,
						size: 'lg',
						resolve: {
							DepartamentoID: null,
							UbicacionID: null,
							InstalacionID: null,
							UsuarioID: $scope.OperadorSeleccionado,
							IncidenciaID: null
						}
					});
			}
			else {
				$window.alert('No se ha seleccionado ninguna incidencia.');
			}
		};

		$scope.CrearColaborador = function () {
			if ( $rootScope.Rol == '1' ) {
				$http.post('/Usuario', { 
								NickName: $scope.newUsuario.NickName,
								Password: $scope.newUsuario.Password,
								Rol: 3,
								Nombre: $scope.newUsuario.Nombre,
								Apellidos: $scope.newUsuario.Apellidos,
								Email: $scope.newUsuario.Email
			    		})

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});
			}
		};
		$scope.EditarColaborador = function () {
			if ( $scope.ColaboradorSeleccionado != null) {
				$uibModal.open({
					templateUrl: "Vistas/Formularios/Supervisor/Editar Usuario.html",
					controller: 'SupervisorController',
					scope: $scope,
					size: 'lg',
					resolve: {
						DepartamentoID: null,
						UbicacionID: null,
						InstalacionID: null,
						UsuarioID: $scope.ColaboradorSeleccionado,
						IncidenciaID: null
					}
				});
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};
		$scope.BorrarSupervisor = function () {
			console.log("BorrarSupervisor");
			console.log($scope.SupervisorSeleccionado);
			if( $scope.SupervisorSeleccionado != null && $rootScope.Rol == '1' ) {
				//console.log($scope.SupervisorSeleccionado);
				$http.delete('/Usuario/' + $scope.SupervisorSeleccionado)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}

		};
		$scope.BorrarOperador = function () {
			console.log("BorrarOperador");
			console.log($scope.OperadorSeleccionado);
			if( $scope.OperadorSeleccionado != null && $rootScope.Rol == '1' ) {
				//console.log($scope.OperadorSeleccionado);
				$http.delete('/Usuario/' + $scope.OperadorSeleccionado)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};
		$scope.BorrarColaborador = function () {
			console.log("BorrarColaborador");
			console.log($scope.ColaboradorSeleccionado);
			if( $scope.ColaboradorSeleccionado != null && $rootScope.Rol == '1' ) {
				//console.log($scope.ColaboradorSeleccionado);
				$http.delete('/Usuario/' + $scope.ColaboradorSeleccionado)

					.success(function(data) {
							$route.reload();
					})
					.error(function(error) {
						console.log(error);
					});	

				$timeout(function() {
					$route.reload();
				}, 10 );
			}
			else {
				$window.alert('No se ha seleccionado a ningun Colaborador.');
			}
		};


	});