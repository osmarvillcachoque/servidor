angular.module("AppIncidencias")

	.controller('AdminController', function ($scope, $filter, $http, $route, $uibModalInstance, SupervisorService) {
		$scope.NombreDepartamento = "";
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

		$scope.setUbicacion = function() {
			$scope.UbicacionSeleccionada = $scope.Departamentos[$scope.DepartamentoSeleccionado.id - 1].Ubicaciones[0];
			$scope.setInstalacion();

			$scope.filtro = '';

			$scope.getData = function () {
			return $filter('filter')($scope.data, $scope.filtro)
			}


		};

		$scope.setInstalacion = function() {
			$scope.InstalacionSeleccionada =$scope.UbicacionSeleccionada.Instalaciones[0];		
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

		/*SET*/
		$scope.setDepartamentoSeleccionado = function(Departamento) {
			var cont = 0 ; var index = 0;
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				if ( $scope.Departamentos[i].id == Departamento ) {
						cont++;
						index = i;
				}
			}
			if(cont == 1) {
				$scope.DepartamentoSeleccionado = $scope.Departamentos[index].id;
			}
			else {
				$scope.DepartamentoSeleccionado = null;
			}
			console.log($scope.DepartamentoSeleccionado);
		};
		$scope.setUbicacionSeleccionada = function(Ubicacion) {
			var cont = 0 ; var index = 0; var index2 = 0;
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					if ( $scope.Departamentos[i].Ubicaciones[n].id == Ubicacion ) {
						cont++;
						index = i;
						index2 = n;
					}						
				}
			}
			if(cont == 1) {
				$scope.UbicacionSeleccionada = $scope.Departamentos[index].Ubicaciones[index2].id;
			}
			else {
				$scope.DepartamentoSeleccionado = null;
			}
			console.log($scope.UbicacionSeleccionada);
		};
		$scope.setInstalacionSeleccionada = function(Instalacion) {
			var cont = 0 ; var index = 0; var index2 = 0; var index3 = 0;
			for ( var i = 0 ; i < $scope.Departamentos.length ; i++ ) {
				for ( var n = 0 ; n < $scope.Departamentos[i].Ubicaciones.length ; n++ ) {
					for ( var m = 0 ; m < $scope.Departamentos[i].Ubicaciones[n].Instalaciones.length ; m++ ){
						console.log($scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == Instalacion);
						if ( $scope.Departamentos[i].Ubicaciones[n].Instalaciones[m].id == Instalacion ) {
							cont++;
							index = i;
							index2 = n;
							index3 = m;
						}
					}						
				}
			}
			if(cont == 1) {
				$scope.InstalacionSeleccionada = $scope.Departamentos[index].Ubicaciones[index2].Instalaciones[index3].id;
			}
			else {
				$scope.InstalacionSeleccionada = null;
			}
		};
		/*ADMIN CREAR*/
		$scope.Admin = function () {
			$scope.items = ['Crear', 'Editar','Eliminar'];
  			$scope.selection = $scope.items[0];
		};

		
		$scope.CrearDepartamento = function () {
			console.log($scope.NombreDepartamento);
			SupervisorService.CrearDepartamento($scope)

				.success(function(data) {
					$uibModalInstance.close();
					$route.reload();
			          })
			          .error(function(error) {
       					$uibModalInstance.close();
			          	$route.reload();
			          });
		};

		$scope.CrearUbicacion = function () {

		};

		$scope.CrearInstalacion = function () {
			
		};

		/*EDITAR */
		$scope.EditarDepartamento = function (Estado) {
			
		};
		
		/*ELIMINAR*/
		$scope.EliminarUsuario = function () {

		};



	});



var app=angular.module('AppIncidencias');
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});