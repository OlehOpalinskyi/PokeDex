/**
 * Created by Oleh on 22.11.2016.
 */
$(function () {
    var url  = "http://pokeapi.co/";
    var url_image = url + 'media/img/';
    var start = 0;
    $('.pokemon_info').hide();
    $('.btn-success, .btn-danger').hide();
    //$('#pokedex').hide();
    $.ajax({
        url:"http://pokeapi.co/api/v1/pokedex/1/",
        type: "GET",
        beforeSend: loading,
        success: GetPokedex
    });
    function loading() {
        $('.btn-success').click();
    }
    function GetPokemon(pokemon) {
        var types = '';

        for (var i=0; i<pokemon.types.length; i++) {
            types+= pokemon.types[i].name + ' ';
        }
        $('.title_name').text(pokemon.name);
        $('#type').text(types);
        $('#attack').text(pokemon.attack);
        $('#defence').text(pokemon.defense);
        $('#hp').text(pokemon.hp);
        $('#sp_attack').text(pokemon.sp_atk);
        $('#sp_defence').text(pokemon.sp_def);
        $('#speed').text(pokemon.speed);
        $('#weight').text(pokemon.weight);
        $('#total_moves').text(pokemon.moves.length);
        $('.pokemon_info').show();
    }
    function reverse(s) {
        var o = '';
        for (var i = s.length - 1; i >= 0; i--)
            o += s[i];
        return o;
    }

    function getIdFromUri(uri) {
        var id = '';
        for (var i = uri.length-2; i > 0; i--) {

            if (uri[i] !== '/') {
                id += uri[i];
            }
            else break;
        }
        if(id.length ==1)
            return id;
        else
            return reverse(id)
    }
    function checkingType() {
        $('.types').map(function (i, t) {
            switch ($(t).text()) {
                case "poison":
                    $(t).addClass('poison');
                    break;
                case 'bug':
                    $(t).addClass('bug');
                    break;
                case 'water':
                    $(t).addClass('water');
                    break;
                case 'flying':
                    $(t).addClass('flying');
                    break;
                case 'normal':
                    $(t).addClass('normal');
                    break;
                case 'fire':
                    $(t).addClass('fire');
                    break;
                case 'electric':
                    $(t).addClass('electric');
                    break;
                case 'ground':
                    $(t).addClass('ground');
                    break;
                case 'fairy':
                    $(t).addClass('fairy');
                    break;
                case 'fighting':
                    $(t).addClass('fighting');
                    break
            }
        })
    }

    function GetPokedex (data) {

        $('.pokemon .name').map(function (i, el) {
            var id = data.pokemon[i+start].resource_uri;
            var index = url + id;
            //console.log(data);
            $.ajax({
                url: index,
                type: "GET",
                success: function GetImage(base) {
                  var id_img = getIdFromUri(id);
                   var image = url_image + id_img + '.png';
                    $(el).text(base.name);
                    $(el).attr('data-id', id);
                    $(el).prev().attr('src', image);

                    if ((base.types.length == 1)) {
                        $(el).next().text(base.types[0].name);
                        $(el).next().next().remove();
                    }

                    else  {
                        $(el).next().text(base.types[0].name);
                        $(el).next().next().text(base.types[1].name);
                    }
                    checkingType();
                    $('.btn-danger').click();
                    // $('#pokedex').show();
                }
            });

        });
        var elementsOnPage = $('.pokemon').length;
        var next = start + elementsOnPage;
        if(next < data.pokemon.length)
            start+=elementsOnPage;
        else {
            var next_add = data.pokemon.length - Math.floor(data.pokemon.length/elementsOnPage)*elementsOnPage;
            start+= next_add;
            $('#load_more').attr('disabled', 'disabled');
        }

        // console.log(start);

    }

    $('#load_more').click(function () {
        $.ajax({
            url:"http://pokeapi.co/api/v1/pokedex/1/",
            type: "GET",
            beforeSend: loading,
            success: GetPokedex
        });


    });

    $('.pokemon .name').click(function () {
        var id = $(this).attr('data-id');
        var id_image = $(this).prev().attr('src');
        var uri = url + id;
        $('.pokemon_info img').attr('src', id_image);
        $.ajax({
            url: uri,
            type: "GET",
            success: GetPokemon
        })
    });

});
