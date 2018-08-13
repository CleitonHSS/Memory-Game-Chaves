
$(function() {
	
	var c1 = app.getComponente('c1');
	let $ctrl = c1.$ctrl;
	
	c1.$ctrl.teste = function(){alert(1);};
	
     var viradas =[];
		var idPar = [];
		var pontos = 0;
		var erros = 0;
		var myLoop;
		var usuario = "";
		var dadosfinais="";
		var sn = 0;
		var mn = 0;
		var ss = "";
		var ms = "";

		//registrar();

	//Registrar usuário
	$ctrl.iniciar = function registrar(){
		$(document).ready(function(){
			$('#tabuleiro').append('<div id="registro"></div>');
			$('#registro').append('<h2>Bem Vindo!</h2><h2>Digite seu nome.</h2><input id="usuario" type="text"></input>');
			$('#registro').append('<div id="enviar"><h3>REGISTRAR</h3></div>');
			$('#enviar').click(function() {
				usuario = $('#usuario').val();
				if(usuario == ""){
					alert('Por favor, digite um nome');
				}else{
					$('#registro').fadeOut(1000,function(){
						iniciarJogo();
					});
				}
			});
		});	
	}
	
	// Gerar ambiente Iniciar jogo
	function iniciarJogo(){
		var i=0;
		var j=0;
		var embaralhado ="";
		var pares = [];
		
			$('#tabuleiro').append('<div id="tabua"></div>');
			$('#tabuleiro').append('<div id="lateral"></div>');
			$('#lateral').append('<div id="inicio"></div>');
			$("#inicio").append('<h3>INÍCIO</h3>');
			$('#lateral').append('<div id="painel"></div>')
			$("#painel").fadeOut(0);
			pares = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
			darCartas(pares);
			$("#inicio").fadeOut(0);
			$("#tabua").fadeIn(1000,function(){
				$(".face").addClass("virada");
				$("#inicio").fadeIn(1000);
			});
			
			//  iniciar jogo
			$("#inicio").click(function(){
				clearInterval(myLoop); sn=0; erros=0; pontos=0;
				$("#painel").empty();
				$("#figura").remove();
				$("#inicio").fadeOut("slow");
				$("#painel").slideUp("slow");
				$("#inicio").fadeIn("slow",function(){
					$("#inicio").empty();
					$("#inicio").append('<h3>REINICIAR</h3>');
					$("#painel").slideDown('slow');
					$("#painel").append('<div id="tempo"></div>');
					$("#painel").append('<div id="erro"></div>');
					$("#lateral").append('<div id="figura"></div>');
					$("#figura").fadeOut(0);
				});
				myLoop = setInterval(intervalo ,1000);
				$(".carta").fadeOut("slow",function(){
					$("#tabua").empty();
					embaralhado = embaralhar();
					darCartas(embaralhado);
					$(".carta").fadeOut(0);
					$(".carta").slideDown("slow",function(){
						$(".face").addClass("virada");
						$(".face").delay(1500).fadeIn(0);
						setTimeout(function(){
							$(".face").removeClass("virada");
							for (i=0;i<16;i++){
								this.document.querySelector("#carta"+i)
								.addEventListener("click",jogar,false);
							}
						}, 2000);
					});
				});
			});		
			
	}
	
	//criar cartas
	function darCartas(ordem){
			var i=0;
			var carta = "";
			var person = "";
			var divcarta = "";
			for (i=0;i<16;i++){
				divcarta = $('<div>',{
					class: 'carta',
					id: 'carta'+i	
				});
				$('#tabua').append(divcarta);
				carta = document.querySelector("#carta"+i);
				$("#carta"+i).append('<div class="clicavel face frente pai'+i+'"></div><div class="clicavel face verso pai'+i+'"></div>');
				carta.style.left = i % 4 === 0 ? 10 +"px" : i % 4 * 160+ 10+"px";
				carta.style.top = i>=12? 3 * 160 + 10 + "px" : i>=8? 2 * 160 + 10 + "px": i>=4 ? 170 + "px": 10 +"px";
				$("#carta"+i).addClass("par"+ordem[i]);
				person = document.getElementsByClassName("frente");
				person[i].style.background = "url('img/"+ordem[i]+".jpg')";
				person[i].setAttribute("id",ordem[i]);
				
			}
	}
	//Embaralhar cartas
	function embaralhar(){
		var numeros = [];
		var personagens = [];
		var numero=0;
		var unico=true;
		var j=0;
		
		numeros[0] = Math.floor(Math.random() *16);
		while ( numeros.length < 16) {
			numero = Math.floor(Math.random() *16);
			j = 0;
			while ( j <  numeros.length){
				if (numero != numeros[j]){
					j++;
					unico = true;
				}
				else if(numero == numeros[j]){
					unico = false;
					break;
				}
			}
			if(unico == true){
				numeros.push(numero);
			}
				continue;
		}
		
		for (i=0;i<16;i++){
		personagens.push(numeros[i]%8);
		}
		
		return personagens;
	}
	
	//Eventos ao clicar nas cartas
	function jogar(){
		var faces ="";
		var id="";

		if(viradas.length<1){
			faces = this.getElementsByClassName("clicavel");
			faces[0].classList.toggle("virada");
			faces[1].classList.toggle("virada");
			id= this.getAttribute("id").slice(5);
			$(".pai"+id).removeClass("clicavel");
			viradas.push(id);
			idPar.push($(".pai"+id).attr("id"));
			
		}else if(viradas.length==1){
			faces = this.getElementsByClassName("clicavel");
			faces[0].classList.toggle("virada");
			faces[1].classList.toggle("virada");
			id= this.getAttribute("id").slice(5);
			$(".pai"+id).removeClass("clicavel");
			viradas.push(id);
			idPar.push($(".pai"+id).attr("id"));
			
			if(idPar[0]==idPar[1]){	
				$("#carta"+viradas[0]).addClass("casada");
				$("#carta"+id).addClass("casada");
				pontos++
				if(pontos!=8){
					$("#figura").addClass("ponto");
					$("#figura").fadeIn(1000,function(){
						$("#figura").fadeOut(2000,function(){
							$("#figura").removeClass("ponto");
						});
					});
					viradas=[];
					idPar=[];
					
				}else{
					viradas=[];
					idPar=[];
					fimDeJogo();
				}
			}else{
				setTimeout(function(){
					$(".pai"+viradas[0]).addClass("clicavel");
					$(".pai"+viradas[0]).removeClass("virada");
					$(".pai"+id).addClass("clicavel");
					$(".pai"+id).removeClass("virada");
					erros++
					document.getElementById("erro").innerHTML = '<h3>Erros: '+erros+'</h3>';
					viradas=[];
					idPar=[];
				},1500);
			}
		}
	}
	//Eventos após o fim do jogo
	function fimDeJogo(){
		clearInterval(myLoop);
		$("#lateral").remove();
		$(".carta").fadeOut(1000,function(){
			$("#tabua").empty();
			$("#tabua").append('<div id="msgfinal"></div><div id="foto"></div>');
			$("#msgfinal").append('<h1>Parabéns! '+usuario+'</h1><h2>Você achou os pares em '+ms+'min e '+ss+'seg</h2><h2>Com '+erros+' erros</h2><h3>clique na foto para voltar à página inicial!</h3>');
			if (typeof(Storage) !== "undefined") {
					dadosfinais="Tempo: "+ms+":"+ss+"; Erros: "+erros+"";
				    localStorage.setItem(usuario,dadosfinais);
				$("#foto").click(function(){
					$("#tabua").fadeOut(1000,function(){
						pontos = 0;erros = 0;sn = 0;mn = 0;ss = "";ms = "";
						$("#tabuleiro").empty();
						iniciarJogo();
					});
				});	
			}else{
				$("#foto").click(function(){
					$("#tabua").fadeOut(1000,function(){
						pontos = 0;erros = 0;sn = 0;mn = 0;ss = "";ms = "";
						$("#tabuleiro").empty();
						iniciarJogo();
					});
				});	
			}
			
		});	
	}
	
	//cronômetro
	function intervalo(){
			if (sn==60){mn++; sn=0;} 
			if (sn<10){ss = "0"+sn+"";}else{ss = ""+sn+"";}
			if (mn<10){ms = "0"+mn+"";}else{ms = ""+mn+"";}
			//localStorage.setItem(sn,mn,erros);
			document.getElementById("tempo").innerHTML = "<h3>Tempo: "+ms+":"+ss+"</h3>";
			sn++;
	}
	
	app.c1.$ctrl.iniciar();


});

