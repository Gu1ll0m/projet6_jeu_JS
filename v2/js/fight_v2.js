//================================================================================================================================================//
//============================================================== Fonctions attaque ===============================================================//
//================================================================================================================================================//

// attaque un personnage cible
function fight(perso1, perso2, perso_actuel) {

// déclaration des perso
    if (perso_actuel == perso1) {
      this.cible = perso2;
    }
    else if (perso_actuel == perso2) {
      this.cible = perso1;
    }
    console.log(this.cible); // retourne la valeur de this.cible
  

  var choix; // variable choix => 2 choix possibles = attaquer ou défendre
  while (choix !== "0") {

    alert("Presser 1 pour attaquer");
    alert("Presser 2 pour vous défendre");

    //TODO : insérer une boucle tant que this.cible.sante > o  

    var choix = prompt("Choisissez une option : ");

    if (choix == 1) {attaquer();}
    if (choix == 2) {defendre();}
    else {console.log("Vous avez saisi un autre chiffre que 1 ou 2, le programme ne comprend pas votre choix !");};



    // déroulement de l' attaque
    function attaquer() {


      if (this.cible.sante > 0) { // la cible à des points de vie

        var degats = this.game.perso_actuel.degat;
        alert(this.game.perso_actuel.nom + " attaque " + this.cible.nom + " et lui fait " + degats + " points de dégâts");
        this.cible.sante == this.cible.sante - this.game.perso_actuel.degat; // les points de vie de la cible sont diminué de la valeur des dégâts de l'arme
        if (this.cible.sante >= 0) {
          // gérer ici le changement de perso
          alert(this.cible.nom + " a encore " + this.cible.sante + " points de vie");
        }
        else {
          this.cible.sante = 0; // si la cible n'a plus de point de vie
          alert(this.cible.nom + " est mort !");
        }
      }
      if (this.cible.sante <= 0){ // permet de recommencer la partie
        alert(this.game.perso_actuel.nom + " ne peut pas attaquer : il est mort! La partie est terminé.");
        alert("Pour rejouer appuyer sur F5");
      }
    };

    // fonctionnement de la défense : division des dégats subies par 2
    function defendre() {

      console.log(this.cible);

      var def = (this.cible.degat / 2);
      console.log(this.game.perso_actuel.nom + " divise les dégats de " + this.cible.nom +" par 2, ces dégâts actuels sont de " + def);
      return def;
    }

    break;
  };

}

