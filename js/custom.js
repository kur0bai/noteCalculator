$(document).ready(function () {

    //Validations

    //Mouse Validation (Es opcional / Is Optional)
    $(document).on({
        "contextmenu": function(e) {
            e.preventDefault();
        },
        "mousedown": function(e) { 
        },
        "mouseup": function(e) { 
        }
    });

    //Max Range inputs 

    //Notes
    $(this).on('keypress keyup change', '.note', function()
    {
        var item = $(this); //input Identifier
        var max = parseFloat(item.attr('max'));
        var min = parseFloat(item.attr('min'));

        if (item.val() > max)
        {
          $(this).val(max);
        }
        else if (item.val() < min)
        {
          item.val(min);
        }

    });

    //Percent
    $(this).on('keypress keyup change', '.percent', function()
    {
        var item = $(this); //input Identifier
        var max = parseFloat(item.attr('max'));
        var min = parseFloat(item.attr('min'));

        if (item.val() > max)
        {
          $(this).val(max);
        }
        else if (item.val() < min)
        {
          item.val(min);
        }

    });



    //Custom Modal Dialogs
    $( function() {

        //Result Box
        $( '#done-box' ).dialog({
          autoOpen: false,
          show: {
            effect: "fold",
            direction: "up",
            duration: 200
          },
          hide: {
            effect: "fold",
            duration: 200
          },
          modal: true,
          buttons: {
            Ok: function() {
              $( this ).dialog( "close" );
            }
          }
        });

        //Settings
        $( '#settings-box' ).dialog({
            autoOpen: false,
            show: {
              effect: "fold",
              direction: "up",
              duration: 200
            },
            hide: {
              effect: "fold",
              duration: 200
            },
            modal: true,
            buttons: {
              Ok: function() {
                $( this ).dialog( "close" );
              }
            }
          });




      } );




    var nextInput = 0;

    //Add Row
    $('.add-row').click(function()
    { 
        if (nextInput < 2)
        {
            nextInput ++;
            note = '<td><input type="number" id="note' + nextInput + '" name="note" class="note" max="10.0" min="0.0" placeholder="Note"></td>';
            percent = '<td><input type="number" id="percent' + nextInput + '" name="percent" class="percent" max="90" min="0" placeholder="%"></td>';
            col = '<td><a class="btn-floating btn-small waves-effect waves-light red delete-row"><i class="material-icons">delete</i></a></td>';
            row = '<tr> '+ note + ' ' + percent + ' ' + col + ' ' + '</tr>'
            $("#main-table tbody").append(row);
        }
        else
        {
            //console.log('Excedido');
        }
    });



    //Delete Row cambiando la function para un elemento dinámico creado
    $(this).on('click', '.delete-row', function()
    {
        nextInput --;
        if($(this).click){
            $(this).parents("tr").remove();
        }
    });


    //Magic is here
    $('#calculate').click(function()
    {
        var minNote = $('#minNote').val();
        var maxNote = $('#maxNote').val();

        if (minNote == 0 || minNote == null)
        {
            minNote = 3.0;
        }

        if (maxNote == 0 || maxNote == null)
        {
            maxNote = 5.0;
        }

        var topPercent = 100;
        var sum = 0;
        //var existSum = 0;
        var resMissing = 0;
        var contNote = 1.0;

        //Calculamos por Filas // Each Row
        $("#main-table tr").each(function()
        {
            if (topPercent > 0)
            {
                var item = $(this); //Row Identifier
                var note = item.find('input[name=note]').val();
                var percent = item.find('input[name=percent').val();
    
                //Se reduce el tope
                topPercent = topPercent - percent;
                //Se convierte el valor porcentual
                percent = parseFloat(percent);
                //Se estima la partial note
                var parcialNote = parseFloat(note * percent) / 100;
                sum += parseFloat(parcialNote);

                //Se busca el porcentaje de las cifras ya sumadas
                existSum = parseFloat(sum * (100 - topPercent) / 100);

                for (contNote; contNote <= maxNote; contNote+= 0.01)
                {
                    //console.log('Contador', financial(contNote));
                    lastPercent = topPercent / 100;
                    resMissing = parseFloat(contNote * lastPercent);
                    //console.log('Missing ', financial(resMissing));
                    finalSum = sum + resMissing;
                    //console.log('finalmente ', finalSum);

                    if (finalSum >= minNote)
                    {
                        break;
                    }
                }

                $('#done-box').dialog('open');
                //console.log('You need a ', Math.round(contNote) , ' to gain with ', minNote, 'In the next ', topPercent, '%');
                $('#outputNote').text(Math.round(contNote));
                $('#outputMinNote').text(minNote);
                $('#outputPercent').text(topPercent);

            }

        })

    });

    //Open settings
    $('#settings-text').click(function()
    {
        $('#settings-box').dialog('open');
    });


    //output
    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
      }
      


});