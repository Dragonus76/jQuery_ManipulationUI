$('#images img').draggable({

	revert : 'invalid' , // On renvoie les images a leur place si elles ne sont pas déposées au bon endroit
	cursor : 'move', // on défénit un nouveaux curseur pour aider le visiteur a comprendre l'action
	stack : '#image img'// option dont je n'ai pas parlé, elle permet de mettre au premier plan l'image déplacée(cela empéche les autres de passer au desssus)

});

$('.preferance').droppable({
    accept : '#images img',
    activeClass: 'hover',
    hoverClass: 'active',

    drop : function(event, ui){
	var current = ui.draggable; // on récupère l'élément étant déplacé
        var path = current.attr('src'); // récupération du chemin de l'image déplacée
        var list = $('#liste'); // on stock l'identifiant de la liste qui contiendra nos images

        current.fadeOut(function(){ // nouvelles fonction de callback, qui s'exécutera une fois l'effet terminé
            current.parent().remove(); // élimination de l'élément courant
            list.append('<li><img src="' + path + '" /></li>'); // et enfin, ajout de l'image dans la liste des images préférées
        });
    }
});

$('.ui-icon-trash').click(function(){ // utilisation de l'évènement click sur l'icône
    var current = $(this); // on récupère l'élément courant
    var li = current.parent(); // on va chercher le parent de ce dernier, c'est-à-dire l'élément de liste contenant l'image
    var image = li.find('img'); // on récupère celle-ci grâce à la fonction find de jQuery
    var path = image.attr('src'); // et enfin, on stock le chemin menant à l'image
			
    li.fadeOut(function(){ // même chose que précédemment
	$('#listeSuppr').append('<li><img src="' + path + '" /></li>');
    });
});




$('#liste').sortable({

	revert : true // les images sortie lors du rangement sont remises automatiquement a la bonne place

});

$('#listeSuppr').selectable({
    stop : function(){
        $('.ui-selected', this).each(function(){ // tous les éléments sélectionnés sont traités
	    $(this).remove(); // puis supprimés
	});
    }
});
