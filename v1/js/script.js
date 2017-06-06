//================================================================================================================================================//
//création des variables

var tabPosition = [];
var perso1_sur_la_map = false;
var perso2_sur_la_map = false;
var nb_arme_sur_la_map = 0;
var nombreCaseX = 10;
var nombreCaseY = 10;
var p = 50; //largeur en pixels d'une case


//================================================================================================================================================//

// fonction qui retourne un entier aléatoire entre 1 et max
function generate_random(max) {
  return Math.floor((Math.random() * max) + 1);
}


//================================================================================================================================================//

// fonction qui permet la création de la map
function generate_map() {
  for (var i = 0; i < nombreCaseX; i++) {
    for (var j = 0; j < nombreCaseY; j++) {
      var map = Object.create(Map); // création de la map
      var random = generate_random(20); // fonction generate_random avec en paramètre 20 pour que le rendu soit plus aléatoire
      //TODO : gestion cas particulier si jamais random == 1
      if (random == 1 && perso1_sur_la_map == false) { // si random est égal à 1 et que le perso1 n'est pas encore sur la map
        $("#map").append("<img src='../img/perso1_alien.png' class='persoClass' id='perso1' style='left:" + p * j + "px; top:" + p * i + "px'>");
        $("#map").append("<img src='../img/casevide.png' class='casevideClass' id='casevide'>");
        perso1_sur_la_map = true;
        tabPosition.push(3); // id du perso1
      } else if (random == 12 && perso2_sur_la_map == false) { // si random est égal à 12 et que le perso2 n'est pas encore sur la map
        $("#map").append("<img src='../img/perso2_predator.png' class='persoClass' id='perso2' style='left:" + p * j + "px; top:" + p * i + "px'>");
        $("#map").append("<img src='../img/casevide.png' class='casevideClass' id='casevide'>");
        perso2_sur_la_map = true;
        tabPosition.push(4); // id du perso2
      } else if (random == 3 && nb_arme_sur_la_map < 1) { // si random est égal à 3 et que l' arme1 n'est pas encore sur la map
        $("#map").append("<img src='../img/arme1.png' class='armeClass' id='arme1'>");
        nb_arme_sur_la_map++;
        tabPosition.push(2); // id de l'arme 1
      } else if (random == 3 && nb_arme_sur_la_map < 2) { // si random est égal à 3 et que l' arme2 n'est pas encore sur la map
        $("#map").append("<img src='../img/arme2.png' class='armeClass' id='arme2'>");
        nb_arme_sur_la_map++;
        tabPosition.push(2); // id de l'arme 1
      } else if (random == 3 && nb_arme_sur_la_map < 3) { // si random est égal à 3 et que l' arme3 n'est pas encore sur la map
        $("#map").append("<img src='../img/arme3.png' class='armeClass' id='arme3'>");
        nb_arme_sur_la_map++;
        tabPosition.push(2); // id de l'arme 1
      } else if (random == 3 && nb_arme_sur_la_map < 4) { // si random est égal à 3 et que l' arme4 n'est pas encore sur la map
        $("#map").append("<img src='../img/arme4.png' class='armeClass' id='arme4'>");
        nb_arme_sur_la_map++;
        tabPosition.push(2); // id de l'arme 1
      } else if ((random == 7 || random == 13 || random == 9 || random == 15)) { // si random est égal à 7 ou si random est égal à 13 on insert un bloc
        $("#map").append("<img src='../img/bloc.png' class='blocClass' id='bloc'>");
        tabPosition.push(1); // id du bloc
      } else { // pour tout autre valeur de random on insert systématiquement une case vide
        $("#map").append("<img src='../img/casevide.png' class='casevideClass' id='casevide'>");
        tabPosition.push(0); // id de la case vide
      }
      console.log("case" + " " + i + j);
    }
  }
}


generate_map(nombreCaseX * nombreCaseY);


//================================================================================================================================================//

//fonction qui permet de gérer les déplacements du personnage
function deplace() {

  $(document).keydown(function(e) { // la fonction se déclenche dès que l'utilisateur prèse une touche

    var ligne = parseInt($('#perso1').css('top')) / p; // position en x
    var colonne = parseInt($('#perso1').css('left')) / p; // position en Y
    var longueur = 10; //10 cases par lignes
    var index = ligne * colonne + longueur; // position actuelle du perso avant déplacement

    if (e.which == 37) { // Vers la gauche
      $('#rapport1').html("<img src='../img/pad_gauche.png' class='padClass' id='padGauche'>").fadeIn('slow').delay(1000).fadeOut('slow');
      colonne--; // on se dirige vers la colonne précedante
      if (colonne < 10) { // si nombreCaseX
        index = ligne * longueur + colonne; // l'index de la case suivant
        if (tabPosition[index] == 1) { // bloc
          $('#etat1').html('Vous faîtes face à un bloc').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        } else if ((tabPosition[index] == 0) || (tabPosition[index] == 2) || (tabPosition[index] == 4)) {
          $('#perso1').css('left', parseInt($('#perso1').css('left')) - p); // donc on se déplace
          console.log("après déplacement index " + " " + index);
          if (tabPosition[index] == 2) { // arme
            $('#etat1').html('Vous vous équipez d une arme').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow'); // ici fonction equipe()
          }
          if ((tabPosition[index] == 3) || (tabPosition[index] == 4)) { // personnage
            $('#etat1').html('FIGHT').fadeIn('slow').delay(1000).fadeOut('slow'); // ici fonction combat()
          }
        } else {
          $('#etat1').html('Vous faîtes face à un bord').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
      }
    }

    if (e.which == 38) { // Vers le haut
      $('#rapport1').html("<img src='../img/pad_haut.png' class='padClass' id='padHaut'>").fadeIn('slow').delay(1000).fadeOut('slow');
      ligne--; // on se dirige vers la ligne précédante
      index = ligne * longueur + colonne; // l'index de la case suivant
      if (tabPosition[index] == 1) {
        $('#etat1').html('Vous faîtes face à un bloc').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
      } else if ((tabPosition[index] == 0) || (tabPosition[index] == 2) || (tabPosition[index] == 4)) {
        $('#perso1').css('top', parseInt($('#perso1').css('top')) - p); // donc on se déplace
        console.log("après déplacement index " + " " + index);
        if (tabPosition[index] == 2) {
          $('#etat1').html('Vous vous équipez d une arme').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow'); // ici fonction equipe()
        }
        if ((tabPosition[index] == 3) || (tabPosition[index] == 4)) { // personnage
          $('#etat1').html('FIGHT').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow'); // ici fonction combat()
        }
      }
    }

    if (e.which == 39) { // Vers la droite
      $('#rapport1').html("<img src='../img/pad_droite.png' class='padClass' id='padDroite'>").fadeIn('slow').delay(1000).fadeOut('slow');
      colonne++; // on se dirige vers la colonne suivant
      if (colonne < 10) { // si nombreCaseX
        index = ligne * longueur + colonne; // l'index de la case suivant
        if (tabPosition[index] == 1) {
          $('#etat1').html('Vous faîtes face à un bloc').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        } else if ((tabPosition[index] == 0) || (tabPosition[index] == 2) || (tabPosition[index] == 4)) {
          $('#perso1').css('left', parseInt($('#perso1').css('left')) + p); // donc on se déplace
          console.log("après déplacement index " + " " + index);
          if (tabPosition[index] == 2) {
            $('#etat1').html('Vous vous équipez d une arme').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow'); // ici fonction equipe()
          }
          if ((tabPosition[index] == 3) || (tabPosition[index] == 4)) { // personnage
            $('#etat1').html('FIGHT').fadeIn('slow').delay(1000).fadeOut('slow'); // ici fonction combat()
          }
        } else {
          $('#etat1').html('Vous faîtes face à un bord').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
        }
      }
    }

    if (e.which == 40) { // Vers le bas
      $('#rapport1').html("<img src='../img/pad_bas.png' class='padClass' id='Bas'>").fadeIn('slow').delay(1000).fadeOut('slow');
      ligne++; // on se dirige vers la ligne suivante
      index = ligne * longueur + colonne; // l'index de la case suivant
      if (tabPosition[index] == 1) {
        $('#etat1').html('Vous faîtes face à un bloc').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow');
      } else if ((tabPosition[index] == 0) || (tabPosition[index] == 2) || (tabPosition[index] == 4)) {
        $('#perso1').css('top', parseInt($('#perso1').css('top')) + p); // donc on se déplace
        console.log("après déplacement index " + " " + index);
        if (tabPosition[index] == 2) {
          $('#etat1').html('Vous vous équipez d une arme').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow'); // ici fonction equipe()
        }
        if ((tabPosition[index] == 3) || (tabPosition[index] == 4)) { // personnage
          $('#etat1').html('FIGHT').css('color', 'red').fadeIn('slow').delay(1000).fadeOut('slow'); // ici fonction combat()
        }
      }
    }
  })
}

deplace();